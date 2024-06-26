import { ObservableInput } from '../compact';
import { OptionsConfig } from './input';
import { InputOptions } from './options';

export interface InputOptionsClient {
  /**
   * @description Query list of select options from forms provider database
   */
  request(optionsConfig: OptionsConfig): ObservableInput<InputOptions>;
}
