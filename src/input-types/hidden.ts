import {
  BaseControlType,
  ConditionableControlType,
  ControlInterface,
  HasAttributesType
} from '../compact/types';
import { buildRequiredIfConfig } from '../helpers/builders';
import { InputConfigInterface } from '../types';
import { buildBase } from './base';

/**
 * Creates an instance of {@see InputConfigInterface} interface
 *
 * @param source
 */
export function buildHiddenInput(
  source: BaseControlType &
    ConditionableControlType &
    Partial<HasAttributesType>
) {
  return {
    ...buildBase(source as ControlInterface),
    requiredIf: buildRequiredIfConfig(source.requiredIf ?? ''),
    rules: {
      isRequired: Boolean(source.required),
    },
  } as InputConfigInterface;
}
