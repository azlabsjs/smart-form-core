import { ControlInterface } from '../compact/types';
import { buildBase } from './base';

/**
 * Build an instance of the {@see HTMLInput} interface
 *
 * @param source
 * @returns
 */
export function buildHTMLInput(source: ControlInterface) {
  return buildBase(source);
}
