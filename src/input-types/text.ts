import { ControlInterface } from '../compact/types';
import { InputTypes, TextInput } from '../types';
import { buildBase } from './base';

/** @internal */
function isNotDefined(value: unknown): value is undefined {
  return typeof value === 'undefined' || value === null;
}

/** creates an instance of {@see TextInput} interface */
export function buildTextInput(
  source: ControlInterface,
  _type?: 'text' | 'phone' | 'email' | 'password'
) {
  const { min: minimum, max: maximum, minLength, maxLength, pattern, required, unique, type } =
    source;
  const min = minimum ?? minLength;
  const max = maximum ?? maxLength;
  const base = buildBase(source);
  _type = _type ?? (type as 'text' | 'phone' | 'email' | 'password') ?? 'text';

  return {
    ...base,
    // TODO: remove the rules constraint in version 0.3.x
    rules: {
      isRequired: Boolean(required),
      maxLength: max ? true : false,
      minLength: min ? true : false,
      email: _type === InputTypes.EMAIL_INPUT,
      notUnique: Boolean(unique),
      pattern: !isNotDefined(pattern),
    },
    pattern: pattern,
    minLength: isNotDefined(min) ? undefined : +min,
    maxLength: isNotDefined(max) ? undefined : +max,
    type: _type,
    constraints: {
      ...(base.constraints ?? {}),
      pattern: pattern ? { fn: pattern } : undefined,
      email: _type === InputTypes.EMAIL_INPUT,
      min: isNotDefined(min) ? undefined : +min,
      max: isNotDefined(max) ? undefined : +max,
    },
  } as TextInput;
}
