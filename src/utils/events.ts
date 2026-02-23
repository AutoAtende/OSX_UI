import type { CleanupTracker } from '../types.js';

export function createCleanupTracker(): CleanupTracker {
  const cleanups: (() => void)[] = [];
  return {
    on(el: EventTarget, event: string, fn: EventListenerOrEventListenerObject, opts?: AddEventListenerOptions | boolean) {
      el.addEventListener(event, fn, opts);
      cleanups.push(() => el.removeEventListener(event, fn, opts));
    },
    clear() {
      cleanups.forEach(fn => fn());
      cleanups.length = 0;
    },
  };
}
