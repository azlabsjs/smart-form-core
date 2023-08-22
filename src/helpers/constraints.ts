import { createLogicalAnd } from './eval';

/**
 * Checks if value equals `undefined` or null
 */
function isNotDefined(value: unknown) {
  return typeof value === 'undefined' || value === null;
}

type ConditionType = string[] | ((value: unknown) => boolean);

/**
 * Checks if a given value is a promise value
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

/**
 * Creates an exists result validator which calls a condition evaluation function
 */
export function createExistsConstraint(conditions?: ConditionType) {
  return async <T = Record<string, unknown>>(
    value: T | Promise<T> | (() => T) | (() => Promise<T>)
  ) => {
    const _fn = conditions
      ? typeof conditions === 'function'
        ? conditions
        : createLogicalAnd(conditions)
      : (_value: unknown) => typeof _value !== 'undefined' && _value !== null;

    // Evaluate the value resolver if it's a function
    const _result =
      typeof value === 'function'
        ? (value as (...args: any) => T | Promise<T>)()
        : (value as T | Promise<T>);

    // Await the the promise resolve
    const _value = isPromise(_result)
      ? _result
      : new Promise<T>((_resolve) => _resolve(_result));
    return _fn((await _value) as any);
  };
}

/**
 * Creates an unique result validator which calls a condition evaluation function
 */
export function createUniqueConstraint(conditions?: ConditionType) {
  return async <T = Record<string, unknown>>(
    value: T | Promise<T> | (() => T) | (() => Promise<T>)
  ) => {
    const _fn = conditions
      ? typeof conditions === 'function'
        ? conditions
        : createLogicalAnd(conditions)
      : (_value: unknown) => typeof _value !== 'undefined' && _value !== null;

    // Evaluate the value resolver if it's a function
    const _result =
      typeof value === 'function'
        ? (value as (...args: any) => T | Promise<T>)()
        : (value as T | Promise<T>);

    // Await the the promise resolve
    const _value = isPromise(_result)
      ? _result
      : new Promise<T>((_resolve) => _resolve(_result));
    return !_fn((await _value) as any);
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

/**
 * Equality constraint factory
 */
export function createEqualsConstraint() {
  return (a: unknown, b: unknown) => {
    if (isNotDefined(a) && isNotDefined(b)) {
      return true;
    }
    return JSON.stringify(a) === JSON.stringify(b);
  };
}
