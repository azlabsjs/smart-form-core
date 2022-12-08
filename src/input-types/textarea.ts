import { ControlInterface } from '../compact/types';
import { buildRequiredIfConfig } from '../helpers/builders';
import { TextAreaInput } from '../types';
import { buildBase } from './base';

/**
 * Creates an instance of the {@see TextAreaInput} interface
 *
 * @param source
 */
export function buildTextAreaInput(source: ControlInterface) {
  const max = source?.max ?? source.maxLength;
  return {
    ...buildBase(source),
    requiredIf: buildRequiredIfConfig(source.requiredIf ?? ''),
    rules: {
      isRequired: Boolean(source.required),
    },
    rows: source.rows,
    cols: source.columns,
    maxLength: typeof max === 'undefined' || max === null ? undefined : +max,
  } as TextAreaInput;
}
