import {
  DateConstraint,
  InputConstraint,
  IsMailConstraint,
  NumberConstraint,
  PatternConstraint,
  TextLengthConstraint,
  TimeConstraint,
} from './constraints';
import { InputValidationRule } from './input-rules';
import { InputOptionsInterface } from './options';

// @internal
// Internal type definition of an options config source object
export type OptionsConfigSource = {
  resource: string;
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
  multiple?: boolean;
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
  name: string;
  classes: string;
  placeholder?: string;
  value?: any;
  description?: string;
  group?: string | number;
  index?: number;
  isRepeatable: boolean;
  containerClass: string;
  /**
   * @deprecated
   */
  hidden?: boolean;
  /**
   * @deprecated
   */
  disabled?: boolean;
  /**
   * @deprecated
   */
  readOnly?: boolean;
  /**
   * @deprecated
   */
  unique?: string;
  /**
   * @deprecated
   */
  rules?: InputValidationRule;
  /**
   * Constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: InputConstraint;
  requiredIf?: InputRequireIfConfig;
}

// @internal
export interface InputRequireIfConfig {
  name: string;
  values: any[];
}

// @internal
export interface InputGroup extends InputConfigInterface {
  children: InputConfigInterface[];
}

// @internal
export interface DateInput extends InputConfigInterface {
  /**
   * @deprecated
   */
  minDate: string;
  /**
   * @deprecated
   */
  maxDate: string;
  currentDate: string;
  inputFormat?: string;
  /**
   * Constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: InputConstraint & DateConstraint;
}

// @internal
export interface FileInput extends InputConfigInterface {
  uploadUrl?: string;
  multiple: boolean;
  maxFileSize: number;
  autoupload?: boolean;
  uploadAs?: string;
  /**
   * @deprecated
   */
  pattern?: string;
  /**
   * Constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: InputConstraint & PatternConstraint;
}

// @internal
export interface NumberInput extends InputConfigInterface {
  /**
   * @deprecated
   */
  min: number;
  /**
   * @deprecated
   */
  max?: number;
  /**
   * Constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: InputConstraint & NumberConstraint;
}

// @internal
export interface TextInput extends InputConfigInterface {
  /**
   * @deprecated
   */
  maxLength?: number;
  /**
   * @deprecated
   */
  pattern?: string;
  /**
   * @deprecated
   */
  minLength?: number;
  /**
   * Constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: InputConstraint & PatternConstraint & TextLengthConstraint & IsMailConstraint;
}

// @internal
export interface TextAreaInput extends InputConfigInterface {
  cols: number;
  rows: number;
  /**
   * @deprecated
   */
  maxLength: number;
  /**
   * Constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: InputConstraint & TextLengthConstraint;
}

// @internal
export interface TimeInput extends InputConfigInterface {
  /**
   * @deprecated
   */
  min: string;
  /**
   * @deprecated
   */
  max?: string;
  /**
   * Constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: InputConstraint & TimeConstraint;
}
