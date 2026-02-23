# OSX_UI

**macOS-style desktop window manager framework for web apps**

OSX_UI gives your single-page application the look and feel of a macOS desktop, complete with draggable/resizable windows, a menu bar, a dock, theming, and a built-in client-side router -- all with zero runtime dependencies.

## Features

- **Zero dependencies** -- pure TypeScript, no runtime deps (Express is an optional peer dep for server helpers)
- **Window manager** with drag, resize, minimize, maximize, close, and z-order focus
- **Menu bar** with dropdown menus, keyboard shortcuts, dynamic items, and a clock
- **Dock** that shows minimized windows and restores them on click
- **Client-side router** with History API and automatic link interception
- **Dark and light themes** out of the box, plus a token-based system for custom themes
- **Responsive mobile** -- windows become fullscreen, menu bar hides, drag/resize disabled on small screens
- **Component library** -- buttons, cards, pills, fields, password fields, modals, toolbars, calendars, date pickers, form inputs, tables, tabs, accordions, toasts, and more
- **Server helpers** -- Express SPA catch-all middleware and `wantsJson` content negotiation

## Quick Start

### Install

```bash
npm install osx-ui
```

### Import CSS

```html
<link rel="stylesheet" href="node_modules/osx-ui/css/osx-ui.css" />
```

Or in a bundler:

```js
import 'osx-ui/css';
```

### Create Your App

```js
import { createApp } from 'osx-ui';

const app = createApp({
  container: document.getElementById('root'),
  appName: 'My App',
  theme: 'dark',
  showClock: true,
  menus: [
    {
      id: 'file',
      label: 'File',
      items: [
        { label: 'New Window', action: () => openNewWindow(), shortcut: 'Cmd+N' },
        { type: 'separator' },
        { label: 'Quit', action: () => app.destroy() },
      ],
    },
  ],
  routes: [
    { pattern: /^\/$/, handler: () => showHome() },
    { pattern: /^\/about$/, handler: () => showAbout() },
  ],
});

app.router.start();

function showHome() {
  const pos = app.centerPos(600, 400);
  app.wm.createWindow({
    id: 'home',
    title: 'Home',
    content: '<h1>Welcome</h1>',
    ...pos,
    width: 600,
    height: 400,
  });
}
```

## API Reference

### Main Exports (`osx-ui`)

| Export                | Type      | Description                          |
|-----------------------|-----------|--------------------------------------|
| `createApp`           | function  | High-level app factory               |
| `WindowManager`       | class     | Window lifecycle management          |
| `MenuBar`             | class     | macOS-style menu bar                 |
| `Dock`                | class     | Minimized window dock                |
| `Router`              | class     | History API client-side router       |
| `LinkInterceptor`     | class     | Captures `<a>` clicks for SPA nav   |
| `ThemeManager`        | class     | Theme registration and switching     |
| `darkTheme`           | object    | Built-in dark theme tokens           |
| `lightTheme`          | object    | Built-in light theme tokens          |
| `createButton`        | function  | Button component factory             |
| `createCard`          | function  | Card component factory               |
| `createPill`          | function  | Pill badge component factory         |
| `createDot`           | function  | Status dot component factory         |
| `createField`         | function  | Form field component factory         |
| `createPasswordField` | function  | Password field with toggle           |
| `createModal`         | function  | Modal dialog factory                 |
| `createToolbar`       | function  | Toolbar container factory            |
| `createCalendar`      | function  | Date picker calendar                 |
| `createDateRangePicker`| function | Date range picker                   |
| `createCheckbox`      | function  | Checkbox component                   |
| `createRadioGroup`   | function  | Radio button group                   |
| `createToggle`        | function  | Toggle switch                        |
| `createAutocomplete`  | function  | Autocomplete input                   |
| `createFileUpload`    | function  | Drag & drop file upload              |
| `createColorPicker`   | function  | Color picker                         |
| `createTabs`          | function  | Tab navigation                       |
| `createAccordion`     | function  | Accordion/collapsible sections       |
| `createTable`         | function  | Data table with pagination           |
| `createList`          | function  | List component                       |
| `createTree`          | function  | Tree/hierarchical view               |
| `createBadge`         | function  | Badge/counter                        |
| `createAvatar`        | function  | User avatar                          |
| `createProgress`      | function  | Progress bar                         |
| `createSpinner`       | function  | Loading spinner                      |
| `createToast`         | function  | Toast notifications                  |
| `createTooltip`       | function  | Tooltip on hover                     |
| `createSidebar`       | function  | Collapsible sidebar                  |
| `createContextMenu`   | function  | Right-click context menu            |
| `createDropdown`      | function  | Dropdown menu                        |
| `createPopover`       | function  | Positionable popover                 |
| `createDesktop`       | function  | Desktop surface creator              |
| `centerPosition`      | function  | Calculates centered x/y coordinates  |
| `escapeHtml`          | function  | HTML string escaping utility         |
| `debounce`            | function  | Debounce utility                     |
| `createElement`       | function  | DOM element shorthand                |
| `createCleanupTracker`| function  | Event listener cleanup tracker       |

### Server Exports (`osx-ui/server`)

| Export         | Type     | Description                            |
|----------------|----------|----------------------------------------|
| `spaCatchAll`  | function | Express middleware for SPA catch-all   |
| `wantsJson`    | function | Checks Accept header for JSON          |

## Theming

OSX_UI ships with `dark` and `light` themes. Switch at any time:

```js
app.theme.setTheme('light');
```

Create a custom theme by providing a full `ThemeTokens` object:

```js
import { darkTheme } from 'osx-ui';

app.theme.registerTheme('midnight', {
  ...darkTheme,
  accent: '#8b5cf6',
  bg: '#0a0a1a',
});

app.theme.setTheme('midnight');
```

All tokens are applied as CSS custom properties (`--osx-bg`, `--osx-accent`, etc.) so you can also override them directly in CSS.

## Components

All components are factory functions that return DOM elements.

```js
import { createButton, createCard, createPill, createField, createPasswordField, createModal, createToolbar, createCalendar, createCheckbox, createTabs, createToast } from 'osx-ui';

const btn = createButton({ label: 'Save', variant: 'primary', onClick: () => save() });
const card = createCard({ header: '<h3>Title</h3>', body: '<p>Content</p>' });
const pill = createPill({ text: 'Active', dot: 'ok' });
const { container, input } = createField({ label: 'Email', name: 'email', type: 'email' });
const { container: pwContainer, input: pwInput } = createPasswordField({ label: 'Password', name: 'pw' });
const { close } = createModal({ content: '<p>Are you sure?</p>' });
const toolbar = createToolbar([btn]);
const calendar = createCalendar({ onChange: (date) => console.log(date) });
const checkbox = createCheckbox({ label: 'Agree', onChange: (checked) => console.log(checked) });
const tabs = createTabs({ tabs: [{ id: '1', label: 'Tab', content: '<p>Content</p>' }] });
createToast({ message: 'Hello!', type: 'success' });
```

See [docs/api/components.md](docs/api/components.md) for the full options reference.

## Server Helpers

Server-side utilities are imported from the `osx-ui/server` sub-path (requires Express as an optional peer dependency):

```js
import { spaCatchAll, wantsJson } from 'osx-ui/server';

app.use(spaCatchAll({ view: 'index' }));
```

See [docs/api/server-helpers.md](docs/api/server-helpers.md) for details.

## Documentation

Full API reference and guides are in the [docs/](docs/) folder:

- **API Reference**: [window-manager](docs/api/window-manager.md) | [menu-bar](docs/api/menu-bar.md) | [router](docs/api/router.md) | [dock](docs/api/dock.md) | [theme](docs/api/theme.md) | [components](docs/api/components.md) | [server-helpers](docs/api/server-helpers.md)
- **Guides**: [Getting Started](docs/guides/getting-started.md) | [Creating Windows](docs/guides/creating-windows.md) | [Custom Themes](docs/guides/custom-themes.md) | [Server Integration](docs/guides/server-integration.md) | [Mobile Responsive](docs/guides/mobile-responsive.md)

## License

[MIT](LICENSE)
