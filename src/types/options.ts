/** abstract representation of a checkbox, radio or combobox option */
export interface InputOption<T = unknown> {
  value: T;
  name: string;
  type?: string;
  selected?: boolean;
  description?: string;
}

export type InputOptions<T = unknown> = InputOption<T>[];
