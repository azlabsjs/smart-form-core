import {
  BaseControlType,
  ConditionableControlType,
  ControlInterface,
  HasAttributesType,
} from '../compact/types';
import { InputConfigInterface, InputTypes } from '../types';
import { buildBase } from './base';

/**
 * @internal
 */
type ArgType = BaseControlType &
  ConditionableControlType &
  Partial<HasAttributesType>;

/**
 * Creates an instance of {@see InputConfigInterface} interface
 */
export function buildHiddenInput(source: ArgType) {
  const _base = buildBase(source as ControlInterface);
  return {
    ..._base,
    // TODO: Remove the rules constraint in version 0.3.x
    type: InputTypes.HIDDEN_INPUT,
    rules: { isRequired: Boolean(source.required) },
  } as InputConfigInterface;
}
