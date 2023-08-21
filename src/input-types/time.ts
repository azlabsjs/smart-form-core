import { ControlInterface } from '../compact';
import { InputTypes, TimeInput } from '../types';
import { buildBase } from './base';

/**
 * @internal
 */
function isNotDefined(value: unknown): value is undefined {
  return typeof value === 'undefined' || value === null;
}

export function buildTimeInput(source: ControlInterface) {
  const { min, max, required } = source;
  const _base = buildBase(source);
  return {
    ..._base,
    // TODO: Remove the rules constraint in version 0.3.x
    rules: {
      isRequired: Boolean(required),
      max: Boolean(max),
      min: Boolean(min),
    },
    min: isNotDefined(min) ? undefined : min,
    max: isNotDefined(max) ? undefined : max,
    type: InputTypes.TIME_INPUT,
    constraints: {
      ...(_base.constraints ?? {}),
      min: isNotDefined(min) ? undefined : min,
      max: isNotDefined(max) ? undefined : max,
    },
  } as TimeInput;
}
