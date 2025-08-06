/** @deprecated */
export interface InputValidationRule {
  isRequired: boolean;
  maxLength?: boolean;
  minLength?: boolean;
  max?: boolean;
  min?: boolean;
  maxDate?: boolean;
  minDate?: boolean;
  email?: boolean;
  pattern?: boolean;
  /** @deprecated */
  notUnique?: boolean;
  /** @deprecated */
  same?: boolean;
  /** @deprecated */
  invalidFormat?: boolean;
}
