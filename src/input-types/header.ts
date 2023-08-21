import { ControlInterface } from '../compact/types';
import { buildBase } from './base';

/**
 * @deprecated Should be removed in version 0.3.x
 * 
 * Build an instance of the {@see HTMLInput} interface
 */
export function buildHTMLInput(source: ControlInterface) {
  return buildBase(source);
}
