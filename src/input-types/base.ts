import { ControlInterface } from '../compact';
import { buildRequiredIfConfig } from '../helpers/builders';
import { InputConfigInterface, InputTypes } from '../types';

/** @internal */
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
    exists,
    compute,
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
    compute,
    constraints: {
      exists: exists
        ? {
            fn: typeof exists === 'string' ? exists : exists['url'],
            conditions: typeof exists === 'string' ? [] : exists['conditions'],
          }
        : undefined,
      required: Boolean(required),
      // Case the value of compute property is provided, we mark the input as disabled
      disabled: compute ? true : Boolean(disabled ?? readonly),
      unique:
        unique && uniqueOn
          ? {
              fn: typeof uniqueOn === 'string' ? uniqueOn : uniqueOn['url'],
              conditions:
                typeof uniqueOn === 'string' ? [] : uniqueOn['conditions'],
            }
          : undefined,
      equals: equals ? { fn: equals } : undefined,
    },
  } as InputConfigInterface;
}
