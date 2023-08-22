export type AsyncConstraint<T = boolean> = {
  query?: string;
  /**
   * Constraint handler function
   */
  fn: string | ((control: string, value: unknown) => T | Promise<T>);
  /**
   * Provides the list of conditions applied on properties of the return value of the
   * `fn` function.
   */
  conditions?: string[] | ((value: unknown) => boolean);
};

export type EqualsConstaint = {
  /**
   * Uses the equality function passed as parameter or a strict equality function
   * by default if only a string value is passed as parameter.
   */
  fn: string;
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
    fn: string;
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
  unique?: AsyncConstraint<boolean>;
  exists?: AsyncConstraint<boolean>;
  equals?: EqualsConstaint;
};
