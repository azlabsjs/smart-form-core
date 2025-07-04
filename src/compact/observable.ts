// This file contains declaration of type that must be used like input to RxJx
// observable input. Most declarations are ported from RxJS library for compatibility reasons
// with RxJS api

/**
 * Note: This will add Symbol.observable globally for all TypeScript users,
 * however, we are no longer polyfilling Symbol.observable
 */
declare global {
  interface SymbolConstructor {
    readonly observable: symbol;
  }
}

type Unsubscribable = {
  unsubscribe(): void;
};

type Observer<T> = {
  next: (value: T) => void;
  error: (err: unknown) => void;
  complete: () => void;
};

type Subscribable<T> = {
  subscribe(observer: Partial<Observer<T>>): Unsubscribable;
};

/**
 * An object that implements the `Symbol.observable` interface.
 */
type InteropObservable<T> = {
  [Symbol.observable]: () => Subscribable<T>;
}

type AsyncIterable<T> = {
  [Symbol.asyncIterator](): AsyncIterator<T>;
};


//
export type ObservableInput<T> =
  | Subscribable<T>
  | InteropObservable<T>
  | AsyncIterable<T>
  | PromiseLike<T>
  | ArrayLike<T>
  | Iterable<T>;
