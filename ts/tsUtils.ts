export function assertNever(msg: string): never {
  throw new Error(msg);
}

export function assertNeverArg(x: never, msg: string = `Unexpected object: ${x}`): never {
  throw new Error(msg);
}

export const not =
  <T extends (...args: any[]) => boolean>(fn: T) =>
  (...args: Parameters<T>) => {
    return !fn(...args);
  };

// TS can't narrow `object` to an object with a known key, so we need a type-guard for that
export function hasKey<K extends string>(obj: object, key: K): obj is Record<K, unknown> {
  return key in obj;
}

// Restrict Extract Union to items assignable to T
export type TypeSafeExtract<T, U extends T> = U;

export const noop = () => {};

export type PromiseResolve<T> = NonNullable<Parameters<Promise<T>['then']>[0]>;
export type PromiseReject<T> = NonNullable<Parameters<Promise<T>['catch']>[0]>;

export type DeferredPromise<T> = {
  promise: Promise<T>;
  resolve: PromiseResolve<T>;
  reject: PromiseReject<T>;
};

export const deferPromise = <T>(): DeferredPromise<T> => {
  let resolve: PromiseResolve<T> = noop;
  let reject: PromiseReject<T> = noop;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

export type Success<T extends Record<string, any>> = {
  type: 'success';
} & T;

export type Failure<T extends Record<string, any>> = {
  type: 'failure';
} & T;

export type Result<S extends Record<string, any>, F extends Record<string, any>> =
  | Success<S>
  | Failure<F>;
