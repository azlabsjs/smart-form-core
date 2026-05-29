import { ObservableInput, FormInterface } from '../compact';
import { InputConfigInterface } from './input';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnknownType = any;

/** @internal */
type FormMethods = 'GET' | 'POST' | 'PUT';

/**
 * abstract type definition of a form configuration object.
 * It serves as backbone to smart-form UI construction as it contains
 * most information for building input, submission url and method.
 *
 */
export type FormConfigInterface = {
  id: number | string;
  title: string;
  description?: string;
  endpointURL?: string;
  method?: FormMethods;
  /** @deprecated will be replaced in future release with `context` property */
  appcontext?: string;
  /** @deprecated will be replaced in future release with `inputs` property */
  controlConfigs: InputConfigInterface[];
};

/**
 * @description Form client type definition. Implementation class must provide
 * functionality to load the form using form id from a given data source
 */
export interface FormsClient {
  /**
   * @description get form definitions using the user provided id
   */
  get(id: string | number): ObservableInput<FormConfigInterface>;

  /**
   * @description get form definitions using the list of user provided ids
   */
  getAll(id: (string | number)[]): ObservableInput<FormConfigInterface[]>;
}

/** provide implementation for preloading application form into developper defined cache */
export interface FormsLoader {
  /*
   * provides an abstraction for loading dynamic form definitions
   * from an asset configuration file, a remote server
   *
   * @param endpoint
   * @param options
   */
  load(
    endpoint: string,
    options?: { [index: string]: UnknownType }
  ): ObservableInput<FormInterface[]>;
}

/**
 * forms cache provider. For form object query efficiency, object are loaded
 * and managed by the cache provider
 */
export interface CacheProvider {
  get(id: string | number): ObservableInput<FormInterface>;

  getList(values: (string | number)[]): ObservableInput<FormInterface[]>;

  /** provides predefined dynamic forms loader implementation */
  cache(
    endpoint: string,
    options?: { [index: string]: UnknownType }
  ): ObservableInput<never> | ObservableInput<FormInterface[]>;
}
