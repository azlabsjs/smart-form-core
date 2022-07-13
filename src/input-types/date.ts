import { ControlInterface } from '../compact/types';
import { buildRequiredIfConfig } from '../helpers/builders';
import { DateInput } from '../types';
import { buildBase } from './base';

/**
 * Creates an instance of the {@see DateInput} interface
 *
 * @param source
 */
export function buildDateInput(source: Partial<ControlInterface>) {
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
      maxDate: Boolean(source.maxDate),
      minDate: Boolean(source.minDate),
    },
    minDate:
      ['now', 'today', 'TODAY', 'NOW'].indexOf(source.minDate ?? '') !== -1
        ? today
        : source.minDate,
    maxDate:
      ['now', 'today', 'TODAY', 'NOW'].indexOf(source.maxDate ?? '') !== -1
        ? today
        : source.maxDate,
    currentDate: '',
    inputFormat: 'dd/mm/yyyy',
  } as DateInput;
}
