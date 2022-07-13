import { ControlInterface } from '../compact/types';
import { buildRequiredIfConfig } from '../helpers/builders';
import { FileInput } from '../types';
import { buildBase } from './base';

/**
 * Creates an instance of {@see FileInput} interface
 *
 * @param source
 */
export function buildFileInput(source: Partial<ControlInterface>) {
  return {
    ...buildBase(source),
    requiredIf: buildRequiredIfConfig(source.requiredIf ?? ''),
    rules: {
      isRequired: Boolean(source.required),
    },
    uploadUrl: source.uploadURL,
    pattern: source.pattern,
    maxFileSize: source.max ?? undefined,
  } as FileInput;
}
