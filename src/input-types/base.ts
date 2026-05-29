import { ControlInterface } from '../compact';
import { buildRequiredIfConfig } from '../helpers/builders';
import { AsyncConstraint, InputConfigInterface, InputTypes } from '../types';

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
  const conditional = requiredIf ? buildRequiredIfConfig(requiredIf) : undefined;

  return {
    label: label,
    type: type,
    name: controlName,
    value: value,
    classes: classes,
    unique: uniqueOn,
    requiredIf: conditional,
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
      exists: exists ? { fn: typeof exists === 'string' ? exists : exists['url'], conditions: typeof exists === 'string' ? [] : exists['conditions'], pipe: typeof exists === 'string' ? undefined : (typeof exists === 'object' && exists !== null ? exists.pipe : undefined) } as AsyncConstraint<boolean> : undefined,
      required: Boolean(required),
      disabled: compute ? true : Boolean(disabled ?? readonly),
      unique: unique && uniqueOn ? { fn: typeof uniqueOn === 'string' ? uniqueOn : uniqueOn['url'], conditions: typeof uniqueOn === 'string' ? [] : uniqueOn['conditions'], pipe: typeof uniqueOn === 'string' ? null : (typeof uniqueOn === 'object' && uniqueOn !== null ? uniqueOn.pipe : undefined) } as AsyncConstraint<boolean> : undefined,
      equals: equals ? { fn: equals } : undefined,
    },
  } as InputConfigInterface;
}
