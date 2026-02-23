// Types
export type {
  WindowCreateOptions,
  WindowState,
  MenuItem,
  MenuConfig,
  MenuBarConfig,
  Route,
  ThemeTokens,
  AppConfig,
  CleanupTracker,
} from './types.js';

// Core
export { WindowManager } from './core/window-manager.js';
export { createDesktop } from './core/desktop.js';
export { Dock } from './core/dock.js';
export { MenuBar } from './core/menu-bar.js';

// Router
export { Router } from './router/router.js';
export { LinkInterceptor } from './router/link-interceptor.js';

// Theme
export { ThemeManager } from './theme/theme-manager.js';
export { darkTheme } from './theme/themes/dark.js';
export { lightTheme } from './theme/themes/light.js';

// Components
export { createButton } from './components/button.js';
export type { ButtonOptions, ButtonVariant, StatusColor } from './components/button.js';
export { createCard } from './components/card.js';
export type { CardOptions } from './components/card.js';
export { createPill, createDot } from './components/pill.js';
export type { PillOptions, DotColor } from './components/pill.js';
export { createField } from './components/field.js';
export type { FieldOptions, FieldResult, FieldType } from './components/field.js';
export { createPasswordField } from './components/password-field.js';
export type { PasswordFieldOptions, PasswordFieldResult } from './components/password-field.js';
export { createModal } from './components/modal.js';
export type { ModalOptions, ModalResult } from './components/modal.js';
export { createToolbar } from './components/toolbar.js';

// Utils
export { escapeHtml } from './utils/escape-html.js';
export { centerPosition } from './utils/center-position.js';
export { debounce } from './utils/debounce.js';
export { createElement } from './utils/dom.js';
export { createCleanupTracker } from './utils/events.js';

// Convenience
export { createApp } from './app.js';
export type { App } from './app.js';
