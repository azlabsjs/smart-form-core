import { ControlInterface } from '../compact/types';
import { InputConfigInterface } from '../types';
import { buildRequiredIfConfig } from '../helpers/builders';
import { buildBase } from './base';

/**
 * Creates an instance of {@see InputConfigInterface} interface
 *
 * @param source
 */
export function buildHiddenInput(source: Partial<ControlInterface>) {
  return {
    ...buildBase(source),
    requiredIf: buildRequiredIfConfig(source.requiredIf ?? ''),
    rules: {
      isRequired: Boolean(source.required),
    },
  } as InputConfigInterface;
}
