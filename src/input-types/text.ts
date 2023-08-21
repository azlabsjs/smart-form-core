import { ControlInterface } from '../compact/types';
import { InputTypes, TextInput } from '../types';
import { buildBase } from './base';
/**
 * @internal
 */
function isNotDefined(value: unknown): value is undefined {
  return typeof value === 'undefined' || value === null;
}

/**
 * Creates an instance of {@see TextInput} interface
 *
 * @param source
 */
export function buildTextInput(
  source: ControlInterface,
  _type?: 'text' | 'phone' | 'email' | 'password'
) {
  const { min, max, minLength, maxLength, pattern, required, unique, type } =
    source;
  const _min = min ?? minLength;
  const _max = max ?? maxLength;
  const _base = buildBase(source);
  _type = _type ?? (type as 'text' | 'phone' | 'email' | 'password') ?? 'text';

  return {
    ..._base,
    // TODO: Remove the rules constraint in version 0.3.x
    rules: {
      isRequired: Boolean(required),
      maxLength: _max ? true : false,
      minLength: _min ? true : false,
      email: _type === InputTypes.EMAIL_INPUT,
      notUnique: Boolean(unique),
      pattern: !isNotDefined(pattern),
    },
    pattern: pattern,
    minLength: isNotDefined(_min) ? undefined : +_min,
    maxLength: isNotDefined(_max) ? undefined : +_max,
    type: _type,
    constraints: {
      ...(_base.constraints ?? {}),
      pattern: pattern ? { fn: pattern } : undefined,
      email: _type === InputTypes.EMAIL_INPUT,
      min: isNotDefined(_min) ? undefined : +_min,
      max: isNotDefined(_max) ? undefined : +_max,
    },
  } as TextInput;
}
