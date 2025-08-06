import { ControlGroupInterface, ControlInterface } from '../compact';
import { buildRequiredIfConfig } from '../helpers/builders';
import { buildBase } from '../inputs/base';
import { buildDateInput } from '../inputs/date';
import { buildFileInput } from '../inputs/file';
import { buildHiddenInput } from '../inputs/hidden';
import { buildNumberInput } from '../inputs/number';
import { buildSelectableInput } from '../inputs/options';
import { buildTextInput } from '../inputs/text';
import { buildTextAreaInput } from '../inputs/textarea';
import { buildTimeInput } from '../inputs/time';
import { InputConfigInterface, InputGroup, InputTypes } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnknownType = any;

/** @internal */
type ControlType = ControlInterface | ControlGroupInterface;

/** @internal */
type BuilderType = (model: UnknownType) => InputConfigInterface | InputGroup;

// @internal creates input types from server side configuration objects
export function createInput(model: ControlType) {
  const builders: Record<string, BuilderType> = {
    [InputTypes.DATE_INPUT]: buildDateInput,
    [InputTypes.SELECT_INPUT]: (model) =>
      buildSelectableInput(model, InputTypes.SELECT_INPUT),
    [InputTypes.TEXTAREA_INPUT]: buildTextAreaInput,
    [InputTypes.NUMBER_INPUT]: buildNumberInput,
    [InputTypes.PHONE_INPUT]: (model) =>
      buildTextInput(model, InputTypes.PHONE_INPUT),
    [InputTypes.PASSWORD_INPUT]: (model) =>
      buildTextInput(model, InputTypes.PASSWORD_INPUT),
    [InputTypes.CHECKBOX_INPUT]: (model) =>
      buildSelectableInput(model, InputTypes.CHECKBOX_INPUT),
    [InputTypes.RADIO_INPUT]: (model) =>
      buildSelectableInput(model, InputTypes.RADIO_INPUT),
    [InputTypes.EMAIL_INPUT]: (model) =>
      buildTextInput(model, InputTypes.EMAIL_INPUT),
    [InputTypes.HIDDEN_INPUT]: buildHiddenInput,
    [InputTypes.FILE_INPUT]: buildFileInput,
    [InputTypes.HTML_INPUT]: buildBase,
    [InputTypes.TIME_INPUT]: buildTimeInput,
    [InputTypes.CONTROL_GROUP]: buildInputGroup,
  };

  const fn =
    builders[model.type] ??
    ((model) => buildTextInput(model, InputTypes.TEXT_INPUT));

  return fn(model) as InputConfigInterface;
}

/**
 * create an {@see InputGroup} type from API data structure
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
