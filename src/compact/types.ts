import { OptionsConfig } from '../types';

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
  type: string;
  controlName: string;
  required?: number | boolean;
  disabled?: number | boolean;
  readonly?: number | boolean;
  unique?: number | boolean;
  controlIndex: number;
  description?: string;
  placeholder?: string;
  classes?: string;
  requiredIf?: string;
  controlGroupKey?: string | number;
  value?: string;
  children?: ControlInterface[];
  uniqueOn?: string;
  containerClass?: string;

  //#region Date input properties
  minDate?: string;
  maxDate?: string;
  //#endregion Date input properties
  
  //#region Textarea inputs properties
  rows?: number;
  columns?: number;
  //#endregion Textarea input properties

  //#region Text inputs properties
  pattern?: string;
  maxLength?: number | string;
  minLength?: number | string;
  //#endregion Text inputs properties

  //#region Options inputs properties
  selectableValues?: string;
  selectableModel?: string;
  optionsConfig?: string | OptionsConfig;
  modelFilters?: string;
  options?: { [index: string]: any }[];
  multiple: number | boolean;
  isRepeatable?: number | boolean;
  //#endregion Options inputs properties

  //#region Number & Time input properties
  min?: number | string;
  max?: number | string;
  //#endregion Number & Time input properties

  //#region File input properties
  uploadURL?: string;
  autoupload?: boolean;
  uploadAs?: string;
  //#endregion File input properties
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
