import { ControlInterface } from '../compact/types';
import { FileInput, InputTypes } from '../types';
import { buildBase } from './base';

/**
 * Creates an instance of {@see FileInput} interface
 */
export function buildFileInput(source: ControlInterface) {
  const { multiple, required, autoupload, pattern, uploadAs, uploadURL, max } =
    source;
  const _base = buildBase(source);
  return {
    ..._base,
    // TODO: Remove the rules constraint in version 0.3.x
    rules: { isRequired: Boolean(required) },
    multiple: Boolean(multiple),
    uploadUrl: uploadURL,
    pattern: pattern,
    maxFileSize: max ?? undefined,
    autoupload: autoupload || false,
    uploadAs: uploadAs ?? 'file',
    type: InputTypes.FILE_INPUT,
    constraints: {
      ...(_base.constraints ?? {}),
      pattern: pattern ? { fn: pattern } : undefined,
    },
  } as FileInput;
}
