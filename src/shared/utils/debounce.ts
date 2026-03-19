const DEFAULT_DELAY = 300;

export const debounce = (fn: Function, ms: number = DEFAULT_DELAY) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return function (this: ThisParameterType<any>, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
};
