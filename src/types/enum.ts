export enum InputTypes {
  DATE_INPUT = 'date',
  SELECT_INPUT = 'select',
  TEXTAREA_INPUT = 'textarea',
  NUMBER_INPUT = 'number',
  TEXT_INPUT = 'text',
  PHONE_INPUT = 'phone',
  PASSWORD_INPUT = 'password',
  CHECKBOX_INPUT = 'checkbox',
  RADIO_INPUT = 'radio',
  EMAIL_INPUT = 'email',
  HIDDEN_INPUT = 'hidden',
  FILE_INPUT = 'file',
  HTML_INPUT = 'html',
  /** @deprecated use INPUT_GROUP instead */
  CONTROL_GROUP = 'control_group',
  TIME_INPUT = 'time',
  TYPEAHEAD = 'typeahead',
  INPUT_GROUP = 'group',
}

/** @internal */
type LiteralInputType = 'date' | 'select' | 'textarea' | 'number' | 'text' | 'phone' | 'password' | 'checkbox' | 'radio' | 'email' | 'hidden' | 'file' | 'html' | 'control_group' | 'time' | 'typeahead' | 'group';

const inputTypes = new Set<string>(Object.values(InputTypes));

/** cast input type literal string to input type enum type */
export function castInputType(value: LiteralInputType): InputTypes {
  if (inputTypes.has(value)) {
    return value as InputTypes;
  }
  throw new Error(`Invalid input type provided: "${value}"`);
}