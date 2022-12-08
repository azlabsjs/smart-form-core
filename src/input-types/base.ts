import { ControlInterface } from '../compact';
import { InputConfigInterface, InputTypes } from '../types';

// @internal
export function buildBase(source: ControlInterface) {
  const index =
    typeof source.controlIndex === 'undefined' || source.controlIndex === null
      ? source.controlIndex
      : +source.controlIndex;
  return {
    label: source.label,
    type: source.type,
    name: source.controlName,
    value: source.value,
    classes: source.classes,
    unique: source.uniqueOn,
    isRepeatable: Boolean(source.isRepeatable),
    containerClass: source.containerClass,
    placeholder: source.placeholder,
    disabled: Boolean(source.disabled),
    readOnly: Boolean(source.readonly),
    description: source.description,
    index,
    group: source.controlGroupKey,
    multiple: Boolean(source.multiple),
    hidden: source.type === InputTypes.HIDDEN_INPUT,
  } as InputConfigInterface;
}
