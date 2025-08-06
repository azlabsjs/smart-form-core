// This file contains declaration of type that must be used like input to RxJx
// observable input. Most declarations are ported from RxJS library for compatibility reasons
// with RxJS api

/**
 * Note: this will add Symbol.observable globally for all TypeScript users,
 * however, we are no longer polyfilling Symbol.observable
 */
declare global {
  interface SymbolConstructor {
    readonly observable: symbol;
  }
}

// @internal
type Unsubscribable = {
  unsubscribe(): void;
};

// @internal
type Observer<T> = {
  next: (value: T) => void;
  error: (err: unknown) => void;
  complete: () => void;
};

// @internal
type Subscribable<T> = {
  subscribe(observer: Partial<Observer<T>>): Unsubscribable;
};

/** an object that implements the `Symbol.observable` interface. */
type InteropObservable<T> = {
  [Symbol.observable]: () => Subscribable<T>;
};

// @internal
type AsyncIterable<T> = {
  [Symbol.asyncIterator](): AsyncIterator<T>;
};

export type ObservableInput<T> =
  | Subscribable<T>
  | InteropObservable<T>
  | AsyncIterable<T>
  | PromiseLike<T>
  | ArrayLike<T>
  | Iterable<T>;
