import type { ThemeTokens } from '../types.js';
import { darkTheme } from './themes/dark.js';
import { lightTheme } from './themes/light.js';

const TOKEN_MAP: Record<keyof ThemeTokens, string> = {
  bg: '--osx-bg',
  panel: '--osx-panel',
  panel2: '--osx-panel-2',
  text: '--osx-text',
  muted: '--osx-muted',
  accent: '--osx-accent',
  danger: '--osx-danger',
  ok: '--osx-ok',
  winBg: '--osx-win-bg',
  titlebarBg: '--osx-titlebar-bg',
  tlClose: '--osx-tl-close',
  tlMinimize: '--osx-tl-minimize',
  tlMaximize: '--osx-tl-maximize',
  shadow: '--osx-shadow',
  shadowFocused: '--osx-shadow-focused',
  font: '--osx-font',
  menubarHeight: '--osx-menubar-height',
  border: '--osx-border',
  borderLight: '--osx-border-light',
};

export class ThemeManager {
  private container: HTMLElement;
  private themes = new Map<string, ThemeTokens>();
  private currentTheme: string = 'dark';

  constructor(container: HTMLElement = document.documentElement) {
    this.container = container;
    this.themes.set('dark', darkTheme);
    this.themes.set('light', lightTheme);
  }

  registerTheme(name: string, tokens: ThemeTokens): void {
    this.themes.set(name, tokens);
  }

  setTheme(name: string): void {
    const tokens = this.themes.get(name);
    if (!tokens) return;

    this.container.setAttribute('data-osx-theme', name);
    this.currentTheme = name;

    // Apply tokens as CSS custom properties
    for (const [key, cssVar] of Object.entries(TOKEN_MAP)) {
      const value = tokens[key as keyof ThemeTokens];
      if (value) {
        this.container.style.setProperty(cssVar, value);
      }
    }
  }

  getTheme(): string {
    return this.currentTheme;
  }

  getTokens(name?: string): ThemeTokens | undefined {
    return this.themes.get(name || this.currentTheme);
  }
}
