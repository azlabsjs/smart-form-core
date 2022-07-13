/**
 * // @internal
 * Type definition of API forms structure
 */
export interface FormInterface {
  id: number;
  title: string;
  parentId?: string;
  description?: string;
  controls: (ControlInterface | ControlGroupInterface)[];
  url?: string;
  status?: number;
  appcontext?: string;
  cached?: boolean;
}

/**
 * // @internal
 * Type definition of API forms inputs/controls structure
 */
export interface ControlInterface {
  id: number;
  label: string;
  placeholder?: string;
  type: string;
  classes?: string;
  requiredIf?: string;
  required: number | boolean;
  disabled: number | boolean;
  readonly: number | boolean;
  unique: number | boolean;
  pattern?: string;
  description: string;
  maxLength?: number | string;
  minLength?: number | string;
  min?: number | string;
  max?: number | string;
  minDate?: string;
  maxDate?: string;
  selectableValues?: string;
  selectableModel?: string;
  optionsConfig?: string;
  modelFilters?: string;
  multiple: number | boolean;
  controlGroupKey?: string | number;
  controlName: string;
  controlIndex: number;
  options?: { [index: string]: any }[];
  rows?: number;
  columns?: number;
  value?: string;
  uploadURL?: string;
  isRepeatable?: number | boolean;
  children?: ControlInterface[];
  uniqueOn?: string;
  containerClass?: string;
}

/**
 * @interal Type definition of OptionInterface
 */
export interface OptionInterface {
  id: number;
  table: string;
  keyfield: string;
  groupfield?: string;
  description: string;
  displayLabel: string;
}

/**
 * // @internal
 * @description Type definition for group of controls
 */
export interface ControlGroupInterface extends ControlInterface {
  children: ControlInterface[];
}
