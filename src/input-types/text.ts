import { ControlInterface } from '../compact/types';
import { buildRequiredIfConfig } from '../helpers/builders';
import { InputTypes, TextInput } from '../types';
import { buildBase } from './base';

/**
 * Creates an instance of {@see TextInput} interface
 *
 * @param source
 */
export function buildTextInput(source: ControlInterface) {
  const min = source?.min ?? source?.minLength;
  const max = source?.max ?? source?.maxLength;
  return {
    ...buildBase(source),
    requiredIf: buildRequiredIfConfig(source.requiredIf ?? ''),
    rules: {
      isRequired: Boolean(source.required),
      maxLength: max ? true : false,
      minLength: min ? true : false,
      email: Boolean(source.type === InputTypes.EMAIL_INPUT),
      notUnique: Boolean(source.unique),
      pattern: typeof source.pattern !== 'undefined' && source.pattern !== null,
    },
    pattern: source.pattern,
    minLength: typeof min === 'undefined' || min === null ? undefined : +min,
    maxLength: typeof max === 'undefined' || max === null ? undefined : +max,
  } as TextInput;
}
