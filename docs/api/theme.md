# ThemeManager

The `ThemeManager` class handles theme registration, switching, and CSS custom property application. OSX_UI ships with `dark` and `light` themes out of the box.

## Import

```js
import { ThemeManager, darkTheme, lightTheme } from 'osx-ui';
```

## Constructor

```ts
new ThemeManager(container?: HTMLElement)
```

| Parameter   | Type          | Default                  | Description                                |
|-------------|---------------|--------------------------|--------------------------------------------|
| `container` | `HTMLElement` | `document.documentElement` | Element where CSS custom properties are set |

The constructor registers both `dark` and `light` themes automatically.

## Methods

### `setTheme(name)`

```ts
setTheme(name: string): void
```

Activates a theme by name. Sets the `data-osx-theme` attribute on the container and applies all token values as CSS custom properties. No-op if the theme name is not registered.

### `getTheme()`

```ts
getTheme(): string
```

Returns the name of the currently active theme (default: `'dark'`).

### `registerTheme(name, tokens)`

```ts
registerTheme(name: string, tokens: ThemeTokens): void
```

Registers a new theme. If a theme with the same name already exists, it is overwritten.

### `getTokens(name?)`

```ts
getTokens(name?: string): ThemeTokens | undefined
```

Returns the `ThemeTokens` object for the given theme name. If `name` is omitted, returns the tokens for the current theme.

## ThemeTokens Interface

```ts
interface ThemeTokens {
  bg: string;            // Page/desktop background
  panel: string;         // Panel background
  panel2: string;        // Secondary panel background
  text: string;          // Primary text color
  muted: string;         // Muted/secondary text color
  accent: string;        // Accent color (links, active states)
  danger: string;        // Danger/error color
  ok: string;            // Success/ok color
  winBg: string;         // Window background
  titlebarBg: string;    // Titlebar background
  tlClose: string;       // Traffic light close button color
  tlMinimize: string;    // Traffic light minimize button color
  tlMaximize: string;    // Traffic light maximize button color
  shadow: string;        // Window shadow (unfocused)
  shadowFocused: string; // Window shadow (focused)
  font: string;          // Font family stack
  menubarHeight: string; // Menu bar height (e.g. "28px")
  border: string;        // Primary border color
  borderLight: string;   // Light/subtle border color
}
```

## CSS Custom Properties Mapping

Each token maps to a CSS custom property that you can use directly in your stylesheets:

| Token           | CSS Custom Property      |
|-----------------|--------------------------|
| `bg`            | `--osx-bg`               |
| `panel`         | `--osx-panel`            |
| `panel2`        | `--osx-panel-2`          |
| `text`          | `--osx-text`             |
| `muted`         | `--osx-muted`            |
| `accent`        | `--osx-accent`           |
| `danger`        | `--osx-danger`           |
| `ok`            | `--osx-ok`               |
| `winBg`         | `--osx-win-bg`           |
| `titlebarBg`    | `--osx-titlebar-bg`      |
| `tlClose`       | `--osx-tl-close`         |
| `tlMinimize`    | `--osx-tl-minimize`      |
| `tlMaximize`    | `--osx-tl-maximize`      |
| `shadow`        | `--osx-shadow`           |
| `shadowFocused` | `--osx-shadow-focused`   |
| `font`          | `--osx-font`             |
| `menubarHeight` | `--osx-menubar-height`   |
| `border`        | `--osx-border`           |
| `borderLight`   | `--osx-border-light`     |

## Built-in Themes

### Dark Theme

```js
import { darkTheme } from 'osx-ui';
// darkTheme.bg        = '#0b1220'
// darkTheme.accent    = '#38bdf8'
// darkTheme.text      = '#e5e7eb'
// darkTheme.winBg     = 'rgba(30,30,30,.85)'
// darkTheme.titlebarBg = 'rgba(60,60,60,.95)'
```

### Light Theme

```js
import { lightTheme } from 'osx-ui';
// lightTheme.bg        = '#f0f2f5'
// lightTheme.accent    = '#0284c7'
// lightTheme.text      = '#1a1a2e'
// lightTheme.winBg     = 'rgba(255,255,255,.92)'
// lightTheme.titlebarBg = 'rgba(232,232,232,.95)'
```

## Usage Examples

### Switch between built-in themes

```js
const theme = new ThemeManager();
theme.setTheme('dark');   // Apply dark theme
theme.setTheme('light');  // Switch to light theme
```

### Register a custom theme

```js
import { darkTheme, ThemeManager } from 'osx-ui';

const theme = new ThemeManager();

theme.registerTheme('ocean', {
  ...darkTheme,
  bg: '#0c1929',
  accent: '#06b6d4',
  panel: '#0e2440',
  panel2: '#132d4f',
});

theme.setTheme('ocean');
```

### Read current tokens

```js
const tokens = theme.getTokens();
console.log(tokens.accent);  // '#38bdf8' (if dark theme)
```

### Use tokens in CSS

```css
.my-component {
  color: var(--osx-text);
  background: var(--osx-panel);
  border: 1px solid var(--osx-border);
}

.my-component:hover {
  border-color: var(--osx-accent);
}
```
