import { ControlInterface } from '../compact/types';
import { InputTypes, TextAreaInput } from '../types';
import { buildBase } from './base';

/**
 * @internal
 */
function isNotDefined(value: unknown): value is undefined {
  return typeof value === 'undefined' || value === null;
}

/**
 * Creates an instance of the {@see TextAreaInput} interface
 */
export function buildTextAreaInput(source: ControlInterface) {
  const { max, maxLength, rows, columns, required } = source;
  const _max = max ?? maxLength;
  const _base = buildBase(source);
  return {
    ..._base,
    // TODO: Remove the rules constraint in version 0.3.x
    rules: { isRequired: Boolean(required) },
    rows: rows,
    cols: columns,
    maxLength: isNotDefined(_max) ? undefined : +_max,
    type: InputTypes.TEXTAREA_INPUT,
    constraints: {
      ...(_base.constraints ?? {}),
      max: isNotDefined(_max) ? undefined : +_max,
    },
  } as TextAreaInput;
}
