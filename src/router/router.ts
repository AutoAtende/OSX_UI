import type { Route } from '../types.js';

export class Router {
  private routes: Route[];
  private fallback: (() => void) | null;
  private popstateHandler: () => void;

  constructor(routes: Route[], fallback?: () => void) {
    this.routes = routes;
    this.fallback = fallback || null;

    this.popstateHandler = () => this.routeTo(location.pathname);
    window.addEventListener('popstate', this.popstateHandler);
  }

  navigate(path: string, opts?: { replace?: boolean }): void {
    if (opts?.replace) {
      history.replaceState({}, '', path);
    } else {
      history.pushState({}, '', path);
    }
    this.routeTo(path);
  }

  routeTo(path: string): void {
    for (const route of this.routes) {
      const m = path.match(route.pattern);
      if (m) {
        route.handler(m);
        return;
      }
    }
    if (this.fallback) this.fallback();
  }

  start(): void {
    this.routeTo(location.pathname);
  }

  destroy(): void {
    window.removeEventListener('popstate', this.popstateHandler);
  }
}
