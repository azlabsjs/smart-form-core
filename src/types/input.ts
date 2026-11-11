import { Subscribable } from './compact';
import { DateConstraint, InputConstraint, IsMailConstraint, NumberConstraint, PatternConstraint, TextLengthConstraint, TimeConstraint } from './constraints';
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
/** @deprecated internal type definition of an options config source object */
export type OptionsConfigSource = { uri: string; };

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
  source: string;
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
type TextInputConstraint = InputConstraint & PatternConstraint & TextLengthConstraint & IsMailConstraint;

// @internal
type NumberInputConstraint = InputConstraint & NumberConstraint;

// @internal
type DateInputConstraint = InputConstraint & DateConstraint;

// @internal
type FileInputConstraint = InputConstraint & PatternConstraint & NumberConstraint;

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

  /** input label attribute */
  label: string;

  /** input type attribute */
  type: string;


  /** input name attribute */
  name: string;

  /** css classes to apply to input when rendering */
  classes?: string;

  /** input placeholder attribute configuration */
  placeholder?: string;

  /** input default value declaration */
  value?: unknown;

  /** input description */
  description?: string;

  /** @deprecated group id to which input belongs to */
  group?: string | number;

  /** index position of the input when redering ui */
  index?: number;

  /** @deprecated might be replaced with `{repeatable}` in future releases. allows input to support list or scalar values */
  isRepeatable?: boolean;

  /** container element class declaration */
  containerClass?: string;

  /**
   * constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: Partial<InputConstraint>;

  /**
   * Use compute property to provide an automatic
   * computation on the input value. This might make input disabled by default
   */
  compute?: ComputeConfigType;

  /** list of input event listeners */
  events?: Partial<EventConfig>;

  /** debugging flag: can be used by implementation libraries to add debugging code */
  debug?: boolean;
}

// @internal
export interface OptionsInput extends InputConfigInterface {
  fetch?: OptionsConfig | ObservableOptionsConfig;

  /** allows or prevent multiple selection on the input element */
  multiple?: boolean;

  /** dictionnary of events to listen for on the input */
  events?: Partial<SelectEventConfig>;

  /** list of preconfigured input opptions */
  options: InputOptions;

  /** triggers autoselection of an element, usually the first element in the list of options */
  autoselect?: boolean;
}

// @internal
export interface InputGroup extends InputConfigInterface {
  inputs: InputConfigInterface[];
}

// @internal
export interface DateInput extends InputConfigInterface {
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
}

// @internal
export interface NumberInput extends InputConfigInterface {
  /**
   * constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: Partial<NumberInputConstraint>;
}

// @internal
export interface TextInput extends InputConfigInterface {

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

  /**
   * constraint API provides a replacement alternative to validation API and limit the number of properties required by input config object
   */
  constraints?: Partial<InputConstraint & TextLengthConstraint>;
}

// @internal
export interface TimeInput extends InputConfigInterface {
  /**
   * constraint API provides a replacement alternative to
   * validation API and limit the number of properties required by input config object
   */
  constraints?: Partial<TimeInputConstraint>;
}
