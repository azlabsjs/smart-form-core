import { ObservableInput } from '../compact';
import { InputOptionInterface } from './options';

export interface SelectOptionsClient {
  //
  /**
   * @description Query list of select options from forms provider database
   *
   */
  request(params: string | any[]): ObservableInput<InputOptionInterface>;
}
