/**
 * @description Abstract representation of a checkbox, radio or combobox option
 */
export interface InputOption {
  value: any;
  description?: string;
  name: string;
  type: string;
}

// @internal
export interface CheckboxInputOption extends InputOption {
  checked?: boolean;
}

// @internal
export interface RadioInputOption extends InputOption {
  checked?: boolean;
}

/**
 * @description Union abstraction a checkbox, radio or combobox option on the native platform
 */
export type InputOptionInterface = (
  | InputOption
  | CheckboxInputOption
  | RadioInputOption
)[];
