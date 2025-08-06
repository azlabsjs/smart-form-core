import { ObservableInput } from '../compact';
import { OptionsConfig } from './input';
import { InputOptions } from './options';

export interface InputOptionsClient {
  /** query list of select options from forms provider database */
  request(optionsConfig: OptionsConfig): ObservableInput<InputOptions>;
}
