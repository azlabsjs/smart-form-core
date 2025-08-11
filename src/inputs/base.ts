import { ControlInterface } from '../compact';
import { buildConditional } from '../helpers/builders';
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
    disabledIf,
    exists,
    compute,
  } = source;
  const _requiredIf = requiredIf ? buildConditional(requiredIf) : undefined;
  const _disabledIf = disabledIf ? buildConditional(disabledIf) : undefined;

  const constraints = {
    exists: exists
      ? {
          fn: typeof exists === 'string' ? exists : exists['url'],
          conditions: typeof exists === 'string' ? [] : exists['conditions'],
        }
      : undefined,
    unique:
      unique && uniqueOn
        ? {
            fn: typeof uniqueOn === 'string' ? uniqueOn : uniqueOn['url'],
            conditions:
              typeof uniqueOn === 'string' ? [] : uniqueOn['conditions'],
          }
        : undefined,
    equals: equals ? { fn: equals } : undefined,
  } as Record<string, unknown>;

  if (compute || !_disabledIf) {
    constraints['disabled'] = compute ? true : Boolean(disabled ?? readonly);
  } else {
    constraints['disabledIf'] = _disabledIf;
  }

  if (_requiredIf) {
    constraints['requiredIf'] = _requiredIf;
  } else {
    constraints['required'] = Boolean(required);
  }

  return {
    label: label,
    type: type,
    name: controlName,
    value: value,
    classes: classes,
    unique: uniqueOn,
    requiredIf: _requiredIf,
    disabledIf: _disabledIf,
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
    constraints,
  } as InputConfigInterface;
}
