import { ObservableInput } from '../compact';
import { InputConfigInterface } from './input';

export interface FormConfigInterface {
  id: number | string;
  title: string;
  description?: string;
  controlConfigs: InputConfigInterface[];
  endpointURL?: string;
  appcontext?: string;
}

/**
 * @description Form client type definition. Implementation class must provide
 * functionality to load the form using form id from a given data source
 */
export interface FormsClient {
  /**
   * @description Get form definitions using the user provided id
   * @param id
   */
  get(id: string | number): ObservableInput<FormConfigInterface>;

  /**
   * @description Get form definitions using the list of user provided ids
   * @param id
   */
  getAll(id: string[] | number[]): ObservableInput<FormConfigInterface[]>;
}
