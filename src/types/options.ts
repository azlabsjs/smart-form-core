/**
 * @description Abstract representation of a checkbox, radio or combobox option
 */
export interface InputOption {
  value: any;
  description?: string;
  name: string;
  type?: string;
  selected?: boolean;
}

/**
 * @description Union abstraction a checkbox, radio or combobox option on the native platform
 */
export type InputOptionsInterface = InputOption[];
