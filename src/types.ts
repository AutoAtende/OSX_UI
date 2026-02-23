export interface WindowCreateOptions {
  id: string;
  title: string;
  content: string | HTMLElement;
  x: number;
  y: number;
  width: number;
  height: number;
  minW?: number;
  minH?: number;
  onClose?: () => void;
}

export interface WindowState {
  el: HTMLElement;
  id: string;
  title: string;
  minW: number;
  minH: number;
  onClose: (() => void) | null;
  isMaximized: boolean;
  savedRect: { x: number; y: number; w: number; h: number } | null;
}

export interface MenuItem {
  label?: string;
  action?: (() => void) | null;
  shortcut?: string;
  type?: 'separator';
  checked?: boolean;
  disabled?: boolean;
}

export interface MenuConfig {
  id: string;
  label: string;
  items: MenuItem[];
  dynamic?: boolean;
  onOpen?: () => void;
}

export interface MenuBarConfig {
  icon?: string;
  appName?: string;
  menus: MenuConfig[];
  showClock?: boolean;
  onAuthClick?: () => void;
}

export interface Route {
  pattern: RegExp;
  handler: (match: RegExpMatchArray) => void;
}

export interface ThemeTokens {
  bg: string;
  panel: string;
  panel2: string;
  text: string;
  muted: string;
  accent: string;
  danger: string;
  ok: string;
  winBg: string;
  titlebarBg: string;
  tlClose: string;
  tlMinimize: string;
  tlMaximize: string;
  shadow: string;
  shadowFocused: string;
  font: string;
  menubarHeight: string;
  border: string;
  borderLight: string;
}

export interface AppConfig {
  container: HTMLElement;
  appName?: string;
  icon?: string;
  theme?: 'dark' | 'light' | string;
  showClock?: boolean;
  background?: string;
  menus?: MenuConfig[];
  routes?: Route[];
  onAuthClick?: () => void;
}

export interface CleanupTracker {
  on: (el: EventTarget, event: string, fn: EventListenerOrEventListenerObject, opts?: AddEventListenerOptions | boolean) => void;
  clear: () => void;
}
