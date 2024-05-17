/**
 * @description Abstract representation of a checkbox, radio or combobox option
 */
export interface InputOption<T = any> {
  value: T;
  name: string;
  type?: string;
  selected?: boolean;
  description?: string;
}

/**
 * Exported list like type of input options
 */
export type InputOptions<T = any> = InputOption<T>[];

/**
 * @deprecated use @link {InputOptions}
 * Exported list like type of input options
 */
export type InputOptionsInterface = InputOption[];
