import { ControlInterface } from '../compact';
import { buildRequiredIfConfig } from '../helpers/builders';
import { TimeInput } from '../types';
import { buildBase } from './base';

export function buildTimeInput(source: ControlInterface) {
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
    min: min,
    max: max,
  } as TimeInput;
}
