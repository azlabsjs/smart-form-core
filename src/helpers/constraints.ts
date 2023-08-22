import { ExistsConstraint } from '../types';
import { createLogicalAnd } from './eval';

/**
 * Creates an exists result validator which calls a condition evaluation function
 */
export function createExistsQueryResultValidator<T = Record<string, unknown>>(
  value: T,
  constraints: ExistsConstraint
) {
  const _fn = constraints.conditions
    ? typeof constraints.conditions === 'function'
      ? constraints.conditions
      : createLogicalAnd(constraints.conditions)
    : (_value: unknown) => typeof _value !== 'undefined' && _value !== null;

  return _fn(value as Record<string, unknown>);
}

/**
 * Creates an unique result validator which calls a condition evaluation function
 */
export function createUniqueQueryResultValidator<T = Record<string, unknown>>(
  value: T,
  constraints: ExistsConstraint
) {
  const _fn = constraints.conditions
    ? typeof constraints.conditions === 'function'
      ? constraints.conditions
      : createLogicalAnd(constraints.conditions)
    : (_value: unknown) => typeof _value !== 'undefined' && _value !== null;

  return !_fn(value as Record<string, unknown>);
}
