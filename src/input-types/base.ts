import { ControlInterface } from '../compact';
import { InputConfigInterface, InputTypes } from '../types';

// @internal
export function buildBase(source: Partial<ControlInterface>) {
  const index = source.controlIndex;
  return {
    label: source.label,
    type: source.type,
    formControlName: source.controlName,
    value: source.value,
    classes: source.classes,
    uniqueCondition: source.uniqueOn,
    isRepeatable: Boolean(source.isRepeatable),
    containerClass: source.containerClass,
    placeholder: source.placeholder,
    disabled: Boolean(source.disabled),
    readOnly: Boolean(source.readonly),
    descriptionText: source.description,
    formControlIndex:
      typeof index === 'undefined' || index === null ? index : +index,
    formControlGroupKey: source.controlGroupKey,
    multiple: Boolean(source.multiple),
    hidden: source.type === InputTypes.HIDDEN_INPUT
  } as InputConfigInterface;
}
