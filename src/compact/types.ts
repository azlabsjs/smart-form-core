import { OptionsConfig } from '../types';

/**
 * @internal
 * Type definition of API forms structure
 */
export interface FormInterface {
  id: number;
  title: string;
  description?: string;
  controls: (ControlInterface | ControlGroupInterface)[];
  url?: string;
  status?: number;
  appcontext?: string;
  cached?: boolean;
}

/**
 * Configuration for inputs with existance constraint
 */
export type HasExistsConstraint = {
  exists:
    | string
    | {
        url: string;
        conditions?: string | string[];
      };
};

/**
 * Configuration for input with required if constraint
 */
export type HasRequiredIfConstraint = {
  requiredIf: string;
};

/**
 * Configuration for input with unique constraints
 */
export type HasUniqueConstraint = {
  uniqueOn:
    | string
    | {
        url: string;
        conditions?: string | string[];
      };
};

/**
 * Control that belongs to a group type definition
 */
export type BelongsToControlGroupType = {
  controlGroupKey?: string | number;
};

/**
 * Control having attributes type definition
 */
export type HasAttributesType = {
  required: number | boolean;
  disabled: number | boolean;
  readonly: number | boolean;
  unique: number | boolean;
  controlIndex: number;

  //#region Optional properties
  classes?: string;
  label?: string;
  isRepeatable?: number | boolean;
  description?: string;
  placeholder?: string;
  //#region Optional properties
};

/**
 * Basic control type definition
 */
export type BaseControlType = {
  id: number;
  type: string;
  controlName: string;
  value?: string;
};

/**
 * Date control type definitions
 */
export type HasDateAttributesType = {
  //#region Date input properties
  minDate: string;
  maxDate: string;
  //#endregion Date input properties
};

/**
 * Option/Combobox control type definition
 */
export type HasSelectAttributesType = {
  //#region Options inputs properties

  //#region deprecated properties
  /** @deprecated */
  selectableValues?: string;
  /** @deprecated */
  selectableModel?: string;
  //#endregion deprecated properties

  optionsConfig?: string | OptionsConfig;
  modelFilters?: string;
  options?: { [index: string]: any }[];
  multiple: number | boolean;

  //#endregion Option UI cconfiguration attributes
  keyfield?: string;
  valuefield?: string;
  groupfield?: string;
  //#endregion Option UI cconfiguration attributes

  //#endregion Options inputs properties
};

/**
 * Upload control a.k.a file input type definition
 */
export type HasUploadAttributesType = {
  //#region File input properties
  uploadURL: string;
  autoupload: boolean;
  uploadAs: string;
  //#endregion File input properties
};

/**
 * Provides configuration about how file input value should
 * be read when an record is resolved from remote source
 */
export type HasReadAttribute = {
  read: 'id' | 'object' | 'url';
};

/**
 * Text control type definition
 */
export type HasTextAttributesType = {
  //#region Text inputs properties
  pattern?: string;
  maxLength: number | string;
  minLength: number | string;
  //#endregion Text inputs properties
};

/**
 * Multi Text control type definition
 */
export type HasMultiTextAttributeType = {
  //#region Textarea inputs properties
  rows: number;
  columns: number;
  //#endregion Textarea input properties
};

/**
 * Number control type definition
 */
export type HasNumberAttributesType = {
  //#region Number & Time input properties
  min: number | string;
  max: number | string;
  //#endregion Number & Time input properties
};

/**
 * Group of controls type definition
 */
export type ControlGroupType = {
  children: ControlInterface[];
};

/**
 * @internal
 *
 * Type definition of API forms inputs/controls structure
 */
export interface ControlInterface
  extends BaseControlType,
    Partial<HasAttributesType>,
    Partial<HasDateAttributesType>,
    Partial<HasSelectAttributesType>,
    Partial<HasUploadAttributesType>,
    Partial<HasTextAttributesType>,
    Partial<HasMultiTextAttributeType>,
    Partial<HasNumberAttributesType>,
    Partial<ControlGroupType>,
    Partial<BelongsToControlGroupType>,
    Partial<HasExistsConstraint>,
    Partial<HasRequiredIfConstraint>,
    Partial<HasUniqueConstraint>,
    Partial<HasReadAttribute> {
  /**
   * Input container class configuration value
   */
  containerClass?: string;
  /**
   * Added to support equality constraints
   */
  equals?: string;
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
