import { Subscribable } from '../compact';
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
import { InputOptions } from './options';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnknownType = any;

/** @description type declaration of input control which have value computed from other input values */
export type ComputeConfigType =
  | {
      fn: <T, TReturn = UnknownType>(form: T) => TReturn;
      deps: string[];
    }
  | {
      fn: string;
      args: string[];
    };

// @internal
// Internal type definition of an options config source object
export type OptionsConfigSource = {
  /** @deprecated will be replace in future release with `uri` */
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

// @internal
type RefetchTriggerType = {
  input: string;
  event?: 'change' | 'blur';
};

// @internal
type RefetchConfigType = {
  trigger: string | RefetchTriggerType;
  query?: string;
};

export type OptionsConfig = {
  source: OptionsConfigSource;
  params?: OptionsConfigParams;
  refetch?: RefetchConfigType[];
};

// type declaration of an instance of an options config with `refetch` property being an
// observable which emit each time options needs to be refetched
export type ObservableOptionsConfig<T = { [k: string]: unknown }> = Omit<
  OptionsConfig,
  'refetch'
> & {
  refetch: Subscribable<T>;
};

// @internal
type TextInputConstraint = InputConstraint &
  PatternConstraint &
  TextLengthConstraint &
  IsMailConstraint;

// @internal
type NumberInputConstraint = InputConstraint & NumberConstraint;

// @internal
type DateInputConstraint = InputConstraint & DateConstraint;

// @internal
type FileInputConstraint = InputConstraint &
  PatternConstraint &
  NumberConstraint;

// @internal
type TimeInputConstraint = InputConstraint & TimeConstraint;

// @internal
type EventConfig = {
  change: <T = unknown>(value: T) => void;
  focus: () => void;
  keydown: (e: KeyboardEvent) => void;
  keyup: (e: KeyboardEvent) => void;
  keypress: (e: KeyboardEvent) => void;
  blur: (e: KeyboardEvent) => void;
};

// @internal
type SelectEventConfig = EventConfig & {
  removed: <T = unknown>(value: T) => void;
  selected: <T = unknown>(value: T) => void;
};

/**
 * @description abstract representation on an input for plarform specific representation during build type
 *
 * **Note**
 * this interface is subject to change because the package is under active development
 */
export interface InputConfigInterface {
  label: string;
  type: string;
  name: string;
  classes: string;
  placeholder?: string;
  value?: unknown;
  description?: string;
  group?: string | number;
  index?: number;
  isRepeatable: boolean;
  containerClass: string;

  /** @deprecated */
  hidden?: boolean;

  /** @deprecated */
  disabled?: boolean;

  /** @deprecated */
  readOnly?: boolean;

  /** @deprecated */
  unique?: string;

  /** @deprecated */
  rules?: InputValidationRule;

  /**
   * constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: Partial<InputConstraint>;

  /**
   * this configuration hide or show the input on the UI base on
   * another input value
   */
  requiredIf?: InputRequireIfConfig;

  /**
   * Use compute property to provide an automatic
   * computation on the input value. This might make input disabled by default
   */
  compute?: ComputeConfigType;

  /** list of input event listeners */
  events?: Partial<EventConfig>;
}

// @internal
export interface OptionsInput extends InputConfigInterface {
  /** @deprecated will be replaced in future release with `fetch` */
  optionsConfig?: OptionsConfig | ObservableOptionsConfig;
  multiple?: boolean;
  events?: Partial<SelectEventConfig>;
  options: InputOptions;
}

/** @deprecated use `OptionsInput instead` */
export type OptionsInputConfigInterface = OptionsInput;

// @internal
export interface InputRequireIfConfig<T = unknown> {
  name: string;
  values: T[];
}

// @internal
export interface InputGroup extends InputConfigInterface {
  /** @deprecated will be removed in future release with `inputs` property */
  children: InputConfigInterface[];
}

// @internal
export interface DateInput extends InputConfigInterface {
  /** @deprecated */
  minDate: string;

  /** @deprecated */
  maxDate: string;
  currentDate: string;
  inputFormat?: string;

  /**
   * constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: Partial<DateInputConstraint>;
}

// @internal
export interface FileInput extends InputConfigInterface {
  uploadUrl?: string;
  multiple: boolean;
  maxFileSize: number;
  autoupload?: boolean;
  uploadAs?: string;

  /**
   * property is added to allow input value reader to either
   * read `id` property of the resolved object or entire object
   *
   * by default the implementation will read the id property if
   * it exists on the object or resolve the entire object if id is
   * not defined.
   */
  read?: 'id' | 'object' | 'url';

  /**
   * constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: Partial<FileInputConstraint>;

  /** @deprecated */
  pattern?: string;
}

// @internal
export interface NumberInput extends InputConfigInterface {
  /** @deprecated */
  min: number;

  /** @deprecated */
  max?: number;

  /**
   * constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: Partial<NumberInputConstraint>;
}

// @internal
export interface TextInput extends InputConfigInterface {
  /** @deprecated */
  maxLength?: number;

  /** @deprecated */
  pattern?: string;

  /** @deprecated */
  minLength?: number;

  /**
   * constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: Partial<TextInputConstraint>;
}

// @internal
export interface TextAreaInput extends InputConfigInterface {
  cols: number;
  rows: number;

  /** @deprecated */
  maxLength: number;

  /**
   * constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: Partial<InputConstraint & TextLengthConstraint>;
}

// @internal
export interface TimeInput extends InputConfigInterface {
  /** @deprecated */
  min: string;

  /** @deprecated */
  max?: string;

  /**
   * constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: Partial<TimeInputConstraint>;
}
