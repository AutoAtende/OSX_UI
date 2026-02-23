# Custom Themes

OSX_UI uses a token-based theming system. Every color, shadow, and font is defined as a token, which is applied to the DOM as a CSS custom property.

## Using Built-in Themes

Two themes ship out of the box: `dark` and `light`.

```js
import { createApp } from 'osx-ui';

// Set the initial theme in the config
const app = createApp({
  container: document.getElementById('root'),
  theme: 'dark',
  // ...
});

// Switch at runtime
app.theme.setTheme('light');
app.theme.setTheme('dark');
```

## Creating a Custom Theme

A theme is a `ThemeTokens` object with values for every token. The easiest way to create one is to spread an existing theme and override specific values:

```js
import { darkTheme } from 'osx-ui';

const oceanTheme = {
  ...darkTheme,
  bg: '#0c1929',
  panel: '#0e2440',
  panel2: '#132d4f',
  accent: '#06b6d4',
  ok: '#2dd4bf',
  winBg: 'rgba(14, 36, 64, 0.9)',
  titlebarBg: 'rgba(19, 45, 79, 0.95)',
};
```

### All Tokens

| Token           | Purpose                                    |
|-----------------|--------------------------------------------|
| `bg`            | Desktop/page background                    |
| `panel`         | Primary panel background                   |
| `panel2`        | Secondary panel background                 |
| `text`          | Primary text color                         |
| `muted`         | Muted/secondary text color                 |
| `accent`        | Accent color (links, active elements)      |
| `danger`        | Danger/error color                         |
| `ok`            | Success color                              |
| `winBg`         | Window background                          |
| `titlebarBg`    | Window titlebar background                 |
| `tlClose`       | Traffic light close button color           |
| `tlMinimize`    | Traffic light minimize button color        |
| `tlMaximize`    | Traffic light maximize button color        |
| `shadow`        | Window shadow (unfocused)                  |
| `shadowFocused` | Window shadow (focused)                    |
| `font`          | Font family stack                          |
| `menubarHeight` | Menu bar height (e.g., `"28px"`)           |
| `border`        | Primary border color                       |
| `borderLight`   | Light/subtle border color                  |

## Registering and Applying

```js
// Register the theme
app.theme.registerTheme('ocean', oceanTheme);

// Apply it
app.theme.setTheme('ocean');
```

You can register multiple themes and switch between them freely:

```js
app.theme.registerTheme('ocean', oceanTheme);
app.theme.registerTheme('sunset', sunsetTheme);

// Theme switcher
function toggleTheme() {
  const current = app.theme.getTheme();
  if (current === 'dark') {
    app.theme.setTheme('ocean');
  } else if (current === 'ocean') {
    app.theme.setTheme('sunset');
  } else {
    app.theme.setTheme('dark');
  }
}
```

## CSS Custom Properties Reference

When a theme is applied, each token is set as a CSS custom property on the container element. You can use these directly in your own CSS:

```css
.my-sidebar {
  background: var(--osx-panel);
  color: var(--osx-text);
  border-right: 1px solid var(--osx-border);
}

.my-sidebar a {
  color: var(--osx-accent);
}

.my-sidebar a:hover {
  color: var(--osx-text);
}

.my-error-message {
  color: var(--osx-danger);
}

.my-success-badge {
  background: var(--osx-ok);
}
```

Full mapping of tokens to CSS properties:

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

## Reading Tokens at Runtime

```js
const tokens = app.theme.getTokens();
console.log(tokens.accent);  // e.g., '#38bdf8'

// Get tokens for a specific theme
const lightTokens = app.theme.getTokens('light');
console.log(lightTokens.bg);  // '#f0f2f5'
```

## Example: Theme Menu

Add a theme-switching menu to the menu bar:

```js
const app = createApp({
  container: document.getElementById('root'),
  theme: 'dark',
  menus: [
    {
      id: 'view',
      label: 'View',
      dynamic: true,
      items: [],
      onOpen() {
        const current = app.theme.getTheme();
        this.items = [
          { label: 'Dark', action: () => app.theme.setTheme('dark'), checked: current === 'dark' },
          { label: 'Light', action: () => app.theme.setTheme('light'), checked: current === 'light' },
          { label: 'Ocean', action: () => app.theme.setTheme('ocean'), checked: current === 'ocean' },
        ];
      },
    },
  ],
});
```
