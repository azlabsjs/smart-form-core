import {
  BaseControlType,
  HasExistsConstraint,
  HasUniqueConstraint,
  HasRequiredIfConstraint,
  ControlInterface,
  HasAttributesType,
} from '../compact/types';
import { InputConfigInterface, InputTypes } from '../types';
import { buildBase } from './base';

/** @internal */
type ArgType = BaseControlType &
  Partial<HasExistsConstraint> &
  Partial<HasUniqueConstraint> &
  Partial<HasRequiredIfConstraint> &
  Partial<HasAttributesType>;

/** @description Creates an instance of {@see InputConfigInterface} interface */
export function buildHiddenInput(source: ArgType) {
  const base = buildBase(source as ControlInterface);
  return {
    ...base,
    // TODO: Remove the rules constraint in version 0.3.x
    type: InputTypes.HIDDEN_INPUT,
    rules: { isRequired: Boolean(source.required) },
  } as InputConfigInterface;
}
