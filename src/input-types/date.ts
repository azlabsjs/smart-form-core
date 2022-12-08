import { ControlInterface } from '../compact/types';
import { buildRequiredIfConfig } from '../helpers/builders';
import { DateInput } from '../types';
import { buildBase } from './base';

/**
 * Creates an instance of the {@see DateInput} interface
 *
 * @param source
 */
export function buildDateInput(source: ControlInterface) {
  const max = source?.max ?? source.maxDate;
  const min = source?.min ?? source.minDate;
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return {
    ...buildBase(source),
    requiredIf: buildRequiredIfConfig(source.requiredIf ?? ''),
    rules: {
      isRequired: Boolean(source.required),
      maxDate: Boolean(max),
      minDate: Boolean(min),
    },
    minDate:
      ['now', 'today', 'TODAY', 'NOW'].indexOf(source.minDate ?? '') !== -1
        ? today
        : min,
    maxDate:
      ['now', 'today', 'TODAY', 'NOW'].indexOf(source.maxDate ?? '') !== -1
        ? today
        : max,
    currentDate: '',
    inputFormat: 'dd/mm/yyyy',
  } as DateInput;
}
