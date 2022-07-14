import { ObservableInput, FormInterface } from '../compact';
import { InputConfigInterface } from './input';

type FormMethods = 'GET' | 'POST' | 'PUT';

/**
 * @description Abstract type definition of a form configuration object.
 * It serves as backbone to smart-form UI construction as it contains
 * most information for building input, submission url and method.
 *
 */
export type FormConfigInterface = {
  id: number | string;
  title: string;
  description?: string;
  controlConfigs: InputConfigInterface[];
  endpointURL?: string;
  method?: FormMethods;
  appcontext?: string;
};

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
  getAll(id: (string | number)[]): ObservableInput<FormConfigInterface[]>;
}

/**
 * @description Provide implementation for preloading application form
 * into developper defined cache
 */
export interface FormsLoader {
  /**
   * @descritpion Provides an abstraction for loading dynamic form definitions
   * from an asset configuration file, a remote server
   *
   * @param endpoint
   * @param options
   */
  load(
    endpoint: string,
    options?: { [index: string]: any }
  ): ObservableInput<FormInterface[]>;
}

/**
 * @description Forms cache provider. For form object query efficiency, object are loaded
 * and managed by the cache provider
 */
export interface CacheProvider {
  /**
   *
   * @param id
   */
  get(id: string | number): ObservableInput<FormInterface>;

  /**
   *
   * @param values
   */
  getList(values: (string | number)[]): ObservableInput<FormInterface[]>;

  /**
   * Provides predefined dynamic forms loader implementation
   *
   * @param endpoint
   * @param options
   */
  cache(
    endpoint: string,
    options?: { [index: string]: any }
  ): ObservableInput<never> | ObservableInput<FormInterface[]>;
}
