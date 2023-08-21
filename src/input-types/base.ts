import { ControlInterface } from '../compact';
import { buildRequiredIfConfig } from '../helpers';
import { InputConfigInterface, InputTypes } from '../types';

/**
 * @internal
 */
export function buildBase(source: ControlInterface) {
  const {
    required,
    disabled,
    readonly,
    unique,
    uniqueOn,
    equals,
    controlIndex: index,
    label,
    type,
    controlName,
    value,
    classes,
    isRepeatable,
    containerClass,
    placeholder,
    description,
    controlGroupKey,
    requiredIf,
  } = source;
  const _requiredIf = requiredIf
    ? buildRequiredIfConfig(requiredIf)
    : undefined;

  return {
    label: label,
    type: type,
    name: controlName,
    value: value,
    classes: classes,
    unique: uniqueOn,
    requiredIf: _requiredIf,
    isRepeatable: Boolean(isRepeatable),
    containerClass: containerClass,
    placeholder: placeholder,
    description: description,
    index,
    group: controlGroupKey,

    disabled: Boolean(disabled),
    readOnly: Boolean(readonly),
    hidden: type === InputTypes.HIDDEN_INPUT,

    constraints: {
      required: Boolean(required),
      disabled: Boolean(disabled ?? readonly),
      unique: unique && uniqueOn ? { fn: uniqueOn } : undefined,
      equals: equals ? { fn: equals } : undefined,
    },
  } as InputConfigInterface;
}
