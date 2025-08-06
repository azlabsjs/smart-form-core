import { ControlInterface } from '../compact/types';
import { InputTypes, TextAreaInput } from '../types';
import { buildBase } from './base';

/** @internal */
function isNotDefined(value: unknown): value is undefined {
  return typeof value === 'undefined' || value === null;
}

/** creates an instance of the {@see TextAreaInput} interface */
export function buildTextAreaInput(source: ControlInterface) {
  const { max: maximum, maxLength, rows, columns, required } = source;
  const max = maximum ?? maxLength;
  const base = buildBase(source);
  return {
    ...base,
    // TODO: remove the rules constraint in version 0.3.x
    rules: { isRequired: Boolean(required) },
    rows: rows,
    cols: columns,
    maxLength: isNotDefined(max) ? undefined : +max,
    type: InputTypes.TEXTAREA_INPUT,
    constraints: {
      ...(base.constraints ?? {}),
      max: isNotDefined(max) ? undefined : +max,
    },
  } as TextAreaInput;
}
