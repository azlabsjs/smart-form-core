import { ControlGroupInterface, ControlInterface } from '../compact';
import { buildRequiredIfConfig } from '../helpers/builders';
import { buildBase } from '../input-types/base';
import { buildDateInput } from '../input-types/date';
import { buildFileInput } from '../input-types/file';
import { buildHTMLInput } from '../input-types/header';
import { buildHiddenInput } from '../input-types/hidden';
import { buildNumberInput } from '../input-types/number';
import { buildSelectableInput } from '../input-types/options';
import { buildTextInput } from '../input-types/text';
import { buildTextAreaInput } from '../input-types/textarea';
import { buildTimeInput } from '../input-types/time';
import { InputConfigInterface, InputGroup, InputTypes } from '../types';

// @internal
// Type definition of an input group or input object
type ControlType = Partial<ControlInterface> | Partial<ControlGroupInterface>;

// @internal
// Creates input types from server side configuration objects
export function createInput(model: ControlType): InputConfigInterface {
  switch (model.type) {
    case InputTypes.DATE_INPUT:
      return buildDateInput(model);
    case InputTypes.SELECT_INPUT:
      return buildSelectableInput(model);
    case InputTypes.TEXTAREA_INPUT:
      return buildTextAreaInput(model);
    case InputTypes.NUMBER_INPUT:
      return buildNumberInput(model);
    case InputTypes.PHONE_INPUT:
      return buildTextInput(model);
    case InputTypes.PASSWORD_INPUT:
      return buildTextInput(model);
    case InputTypes.CHECKBOX_INPUT:
      return buildSelectableInput(model);
    case InputTypes.RADIO_INPUT:
      return buildSelectableInput(model);
    case InputTypes.EMAIL_INPUT:
      return buildTextInput(model);
    case InputTypes.HIDDEN_INPUT:
      return buildHiddenInput(model);
    case InputTypes.FILE_INPUT:
      return buildFileInput(model);
    case InputTypes.HTML_INPUT:
      return buildHTMLInput(model);
    case InputTypes.TIME_INPUT:
      return buildTimeInput(model);
    case InputTypes.CONTROL_GROUP:
      return buildInputGroup(model as ControlGroupInterface);
    default:
      return buildTextInput(model);
  }
}

/**
 * Create an {@see InputGroup} type from API data structure
 *
 * This function serves as bridge for transforming server structured
 * control interface into client supported interface
 *
 * ```js
 * const inputGroup = createInputGroup({
 *  // Type definition of the input group
 * }); // Instance of InputGroup
 * ```
 *
 * @param source
 * @returns
 */
export function buildInputGroup(source: ControlGroupInterface) {
  return {
    ...buildBase(source),
    requiredIf: buildRequiredIfConfig(source.requiredIf ?? ''),
    rules: {
      isRequired: Boolean(source.required),
      pattern: Boolean(source.pattern),
    },
    pattern: source.pattern,
    children: source.children.map((current) => createInput(current)),
  } as InputGroup;
}
