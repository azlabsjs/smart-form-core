import { ControlInterface } from '../compact/types';
import { InputTypes, NumberInput } from '../types';
import { buildBase } from './base';

/** @internal */
function isNotDefined(value: unknown): value is undefined {
  return typeof value === 'undefined' || value === null;
}

/** creates an instance {@see NumberInput} interface */
export function buildNumberInput(source: ControlInterface) {
  const { min, max } = source;
  const base = buildBase(source);
  return {
    ...base,
    // TODO: remove the rules constraint in version 0.3.x
    rules: {
      isRequired: Boolean(source.required),
      max: Boolean(max),
      min: Boolean(min),
    },
    min: isNotDefined(min) ? undefined : +min,
    max: isNotDefined(max) ? undefined : +max,
    type: InputTypes.NUMBER_INPUT,
    constraints: {
      ...(base.constraints ?? {}),
      min: isNotDefined(min) ? undefined : +min,
      max: isNotDefined(max) ? undefined : +max,
    },
  } as NumberInput;
}
