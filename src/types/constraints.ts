/**
 * Unique constaint type declaration
 */
export type UniqueConstraint = {
  /**
   * Constaint handler function
   */
  fn:
    | string
    | (<T = unknown>(
        control: string,
        value: T
      ) => { unique: true } | undefined);
  /**
   * Provides the list of conditions applied on properties of the return value of the
   * `fn` function.
   *
   * **Note** When using a function as condition, if the function returns true, we assume the
   * value is not unique, else we assume the value does is unique
   */
  conditions?: string[] | (<T = unknown>(value: T) => boolean);
  /**
   * The on result if provided handles will be invoke on the result of the `fn` function.
   * It must return true if the value exists in the data source and false if not
   */
  onResult?: <T = unknown>(
    value: T,
    constraint: UniqueConstraint
  ) => { unique: true } | undefined;
};

/**
 * Exists constraint type declaration
 */
export type ExistsConstraint = {
  /**
   * Constraint handler function
   */
  fn:
    | string
    | (<T = unknown>(
        control: string,
        value: T
      ) => { exists: true } | undefined);
  /**
   * Provides the list of conditions applied on properties of the return value of the
   * `fn` function.
   *
   * **Note** When using a function as condition, if the function returns true, we assume the
   * value exists, else we assume the value does not exists
   */
  conditions?: string[] | (<T = unknown>(value: T) => boolean);
  /**
   * The on result if provided handles will be invoke on the result of the `fn` function.
   * It must return true if the value exists in the data source and false if not
   */
  onResult?: <T = unknown>(
    value: T,
    constraint: ExistsConstraint
  ) => { exists: true } | undefined;
};

export type EqualsConstaint = {
  /**
   * Uses the equality function passed as parameter or a strict equality function
   * by default if only a string value is passed as parameter.
   */
  fn:
    | string
    | (<T = unknown>(
        control: string,
        value: T
      ) => { equals: true } | undefined);
};

/**
 * Pattern constraint type declaration. It will replace the default boolean value
 * from version 3 release
 */
export type PatternConstraint = {
  pattern: {
    /**
     * Pattern string or pattern verifier function
     */
    fn:
      | string
      | (<T = unknown>(
          value: T,
          pattern: string
        ) => { pattern: true } | undefined);
  };
};

/**
 * Text length constraint type declaration
 */
export type TextLengthConstraint = {
  /**
   * Checks maximum length of the text value
   */
  max?: number;
  /**
   * Check minimum length of the text value
   */
  min?: number;
};

/**
 * Time constraint type declaration
 */
export type TimeConstraint = {
  max?: string;
  min?: string;
};

/**
 * Number constraint type declaration
 */
export type NumberConstraint = {
  max?: number;
  min?: number;
};

export type DateConstraint = {
  min?: string | Date;
  max?: string | Date;
};

/**
 * Constraint which if present on the input requires input to be validated
 * against an email rule
 */
export type IsMailConstraint = {
  email: boolean;
};

/**
 * Input constraints API provide a replacement for validation rule API
 */
export type InputConstraint = {
  required: boolean;
  disabled?: boolean;
  unique?: UniqueConstraint;
  exists?: ExistsConstraint;
  equals?: EqualsConstaint;
};
