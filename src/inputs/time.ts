import { ControlInterface } from '../compact';
import { InputTypes, TimeInput } from '../types';
import { buildBase } from './base';

/** @internal */
function isnotdefined(value: unknown): value is undefined {
  return typeof value === 'undefined' || value === null;
}

export function buildTimeInput(source: ControlInterface) {
  const { min, max, required } = source;
  const base = buildBase(source);
  return {
    ...base,
    // TODO: remove the rules constraint in version 0.3.x
    rules: {
      isRequired: Boolean(required),
      max: Boolean(max),
      min: Boolean(min),
    },
    min: isnotdefined(min) ? undefined : min,
    max: isnotdefined(max) ? undefined : max,
    type: InputTypes.TIME_INPUT,
    constraints: {
      ...(base.constraints ?? {}),
      min: isnotdefined(min) ? undefined : min,
      max: isnotdefined(max) ? undefined : max,
    },
  } as TimeInput;
}
