/** abstract representation of a checkbox, radio or combobox option */
export interface InputOption<T = unknown> {
  value: T;
  name: string;
  type?: string;
  selected?: boolean;
  description?: string;
}

/** exported list like type of input options  */
export type InputOptions<T = unknown> = InputOption<T>[];

/** @deprecated use @link {InputOptions} */
export type InputOptionsInterface = InputOption[];
