import { InputValidationRule } from './input-rules';
import { InputOptionsInterface } from './options';

// @internal
// Internal type definition of an options config source object
export type OptionsConfigSource = {
  resource: string;
  type?: string;
  raw: string;
};

// @internal
// internal type definition of an options config parameter object
export type OptionsConfigParams = {
  groupBy?: string;
  keyBy: string;
  valueBy: string;
  filters?: string;
};

export type OptionsConfig = {
  source: OptionsConfigSource;
  params?: OptionsConfigParams;
};

// @internal
export interface OptionsInputConfigInterface extends InputConfigInterface {
  optionsConfig?: OptionsConfig;
  options: InputOptionsInterface;
}

/**
 * @description Abstract representation on an input for plarform specific
 * representation during build type
 *
 * **Note**
 * This interface is subject to change because the package is under active development
 */
export interface InputConfigInterface {
  label: string;
  type: string;
  formControlName: string;
  classes: string;
  requiredIf?: InputRequireIfConfig;
  rules?: InputValidationRule;
  placeholder?: string;
  value?: string | any;
  disabled?: boolean;
  readOnly?: boolean;
  descriptionText?: string;
  formControlGroupKey?: string | number;
  formControlIndex?: number;
  hidden?: boolean;
  isRepeatable: boolean;
  uniqueCondition?: string;
  containerClass: string;
  multiple?: boolean;
}

// @internal
export interface InputRequireIfConfig {
  formControlName: string;
  values: any[];
}


// @internal
export interface InputGroup extends InputConfigInterface {
  children: InputConfigInterface[];
}


// @internal
export interface DateInput extends InputConfigInterface {
  minDate: string;
  maxDate: string;
  currentDate: string;
  inputFormat?: string;
}


// @internal
export interface FileInput extends InputConfigInterface {
  uploadUrl?: string;
  pattern?: string;
  multiple: boolean;
  maxFileSize: number;
}


// @internal
export interface NumberInput extends InputConfigInterface {
  min: number;
  max?: number;
}


// @internal
export interface TextInput extends InputConfigInterface {
  maxLength?: number;
  pattern?: string;
  minLength?: number;
}



// @internal
export interface TextAreaInput extends InputConfigInterface {
  cols: number;
  rows: number;
  maxLength: number;
}

// @internal
export interface TimeInput extends InputConfigInterface {
  min: string;
  max?: string;
}