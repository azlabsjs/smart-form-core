import { ControlInterface } from '../compact/types';
import { InputTypes, NumberInput } from '../types';
import { buildBase } from './base';

/**
 * @internal
 */
function isNotDefined(value: unknown): value is undefined {
  return typeof value === 'undefined' || value === null;
}

/**
 * Creates an instance {@see NumberInput} interface
 */
export function buildNumberInput(source: ControlInterface) {
  const { min, max } = source;
  const _base = buildBase(source);
  return {
    ..._base,
    // TODO: Remove the rules constraint in version 0.3.x
    rules: {
      isRequired: Boolean(source.required),
      max: Boolean(max),
      min: Boolean(min),
    },
    min: isNotDefined(min) ? undefined : +min,
    max: isNotDefined(max) ? undefined : +max,
    type: InputTypes.NUMBER_INPUT,
    constraints: {
      ...(_base.constraints ?? {}),
      min: isNotDefined(min) ? undefined : +min,
      max: isNotDefined(max) ? undefined : +max,
    },
  } as NumberInput;
}
