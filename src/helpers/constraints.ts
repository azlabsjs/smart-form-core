import { createLogicalAnd } from './eval';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnknownType = any;

/**
 * checks if value equals `undefined` or null
 */
function isNotDefined(value: unknown) {
  return typeof value === 'undefined' || value === null;
}

type ConditionType = string[] | ((value: unknown) => boolean);

/**
 * checks if a given value is a promise value
 *
 * @internal
 */
function isPromise<T>(value: unknown): value is Promise<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Promise<unknown>).then === 'function'
  );
}

function mapInto<T = unknown>(
  value: T,
  _callback: (v: UnknownType) => boolean
) {
  if (!Array.isArray(value)) {
    return _callback(value);
  }
  let y = true;
  for (const _v of value) {
    if (false === _callback(_v)) {
      y = false;
      break;
    }
  }
  return y;
}

/**
 * Creates an exists result validator which calls a condition evaluation function
 */
export function createExistsConstraint(c?: ConditionType) {
  return async <T = Record<string, unknown>>(
    value: T | Promise<T> | (() => T) | (() => Promise<T>)
  ) => {
    const _fn = c
      ? typeof c === 'function'
        ? c
        : createLogicalAnd(c)
      : (v: unknown) => typeof v !== 'undefined' && v !== null;

    // evaluate the value resolver if it's a function
    const y =
      typeof value === 'function'
        ? (value as (...args: unknown[]) => T | Promise<T>)()
        : (value as T | Promise<T>);

    // Await the the promise resolve
    const v = isPromise(y) ? y : new Promise<T>((_resolve) => _resolve(y));
    //
    return mapInto(await v, _fn);
  };
}

/**
 * Creates an unique result validator which calls a condition evaluation function
 */
export function createUniqueConstraint(c?: ConditionType) {
  return async <T = Record<string, unknown>>(
    value: T | Promise<T> | (() => T) | (() => Promise<T>)
  ) => {
    const _fn = c
      ? typeof c === 'function'
        ? c
        : createLogicalAnd(c)
      : (v: unknown) => typeof v !== 'undefined' && v !== null;

    // evaluate the value resolver if it's a function
    const y =
      typeof value === 'function'
        ? (value as (...args: unknown[]) => T | Promise<T>)()
        : (value as T | Promise<T>);

    // Await the the promise resolve
    const v = isPromise(y) ? y : new Promise<T>((_resolve) => _resolve(y));
    //
    return !mapInto(await v, _fn);
  };
}

/**
 * Pattern constraint factory
 */
export function createPatternConstraint(pattern: string) {
  return <T = unknown>(value: T) => {
    return null !== String(value).match(new RegExp(pattern));
  };
}

/** equality constraint factory */
export function createEqualsConstraint(
  equals?: (a: unknown, b: unknown) => boolean
) {
  return (a: unknown, b: unknown) => {
    if (isNotDefined(a) && isNotDefined(b)) {
      return true;
    }

    if (typeof equals === 'undefined' || equals === null) {
      equals = (_a: unknown, _b: unknown) => {
        return _a === _b;
      };
    }

    return equals(a, b);
  };
}
