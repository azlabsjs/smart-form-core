import { FormInterface, ObservableInput } from '../compact';

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
