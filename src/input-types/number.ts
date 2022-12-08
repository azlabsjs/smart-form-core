import { ControlInterface } from '../compact/types';
import { buildRequiredIfConfig } from '../helpers/builders';
import { NumberInput } from '../types';
import { buildBase } from './base';


/**
 * Creates an instance {@see NumberInput} interface
 *
 * @param source
 */
export function buildNumberInput(source: ControlInterface) {
  const min = source?.min;
  const max = source?.max;
  return {
    ...buildBase(source),
    requiredIf: buildRequiredIfConfig(source.requiredIf ?? ''),
    rules: {
      isRequired: Boolean(source.required),
      max: Boolean(max),
      min: Boolean(min),
    },
    min: typeof min === 'undefined' || min === null ? undefined : +min,
    max: typeof max === 'undefined' || max === null ? undefined : +max,
  } as NumberInput;
}
