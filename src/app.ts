import type { AppConfig } from './types.js';
import { WindowManager } from './core/window-manager.js';
import { MenuBar } from './core/menu-bar.js';
import { Router } from './router/router.js';
import { LinkInterceptor } from './router/link-interceptor.js';
import { ThemeManager } from './theme/theme-manager.js';
import { createDesktop } from './core/desktop.js';
import { centerPosition } from './utils/center-position.js';

export interface App {
  wm: WindowManager;
  menuBar: MenuBar;
  router: Router;
  theme: ThemeManager;
  desktop: HTMLElement;
  centerPos: (w: number, h: number) => { x: number; y: number };
  destroy: () => void;
}

export function createApp(config: AppConfig): App {
  const theme = new ThemeManager(config.container);
  if (config.theme) {
    theme.setTheme(config.theme);
  }

  const desktop = createDesktop(config.container, config.background);

  const menuBar = new MenuBar({
    icon: config.icon,
    appName: config.appName,
    menus: config.menus || [],
    showClock: config.showClock,
    onAuthClick: config.onAuthClick,
  });
  menuBar.init(config.container);

  const wm = new WindowManager(desktop, 28);

  const router = new Router(config.routes || []);
  const linkInterceptor = new LinkInterceptor(desktop, (path) => router.navigate(path));

  const centerPos = (w: number, h: number) => centerPosition(desktop, w, h);

  return {
    wm,
    menuBar,
    router,
    theme,
    desktop,
    centerPos,
    destroy() {
      linkInterceptor.destroy();
      router.destroy();
      menuBar.destroy();
      wm.destroy();
    },
  };
}
