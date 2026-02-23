# Getting Started

This guide walks you through setting up a basic OSX_UI application from scratch.

## 1. Install

```bash
npm install osx-ui
```

If you plan to use server helpers, also install Express:

```bash
npm install express
```

## 2. HTML Shell

Create an HTML file (or an EJS/template view) with a root container element:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My App</title>
  <link rel="stylesheet" href="/public/osx-ui.css" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/public/app.js"></script>
</body>
</html>
```

The `#root` container is where the desktop, menu bar, and windows will be rendered.

## 3. Import CSS

If you are using a bundler (Vite, esbuild, webpack), import the CSS directly:

```js
import 'osx-ui/css';
```

Or link to the file from `node_modules`:

```html
<link rel="stylesheet" href="node_modules/osx-ui/css/osx-ui.css" />
```

The CSS bundle includes all core styles, component styles, theme defaults, and responsive rules.

## 4. Create the App

In your JavaScript entry point, use `createApp` to bootstrap everything at once:

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
        { label: 'New Window', action: () => openWindow(), shortcut: 'Cmd+N' },
        { type: 'separator' },
        { label: 'Quit', action: () => app.destroy() },
      ],
    },
  ],
  routes: [
    { pattern: /^\/$/, handler: () => openWindow() },
  ],
});

app.router.start();
```

`createApp` sets up all the pieces for you:
- `app.wm` -- WindowManager for creating/managing windows
- `app.menuBar` -- MenuBar with your menus rendered
- `app.router` -- Router with your routes registered
- `app.theme` -- ThemeManager for switching themes
- `app.desktop` -- The desktop DOM element
- `app.centerPos(w, h)` -- Helper to center a window on the desktop
- `app.destroy()` -- Tears down everything

## 5. Add Routes and Windows

Define route handlers that create windows:

```js
function openWindow() {
  const pos = app.centerPos(600, 400);
  app.wm.createWindow({
    id: 'main',
    title: 'Welcome',
    content: '<h1>Hello, World</h1><p>This is your first OSX_UI window.</p>',
    ...pos,
    width: 600,
    height: 400,
  });
}
```

Key points:
- Each window needs a unique `id`. If you call `createWindow` with an existing `id`, it focuses that window instead of creating a duplicate.
- `content` accepts an HTML string or a DOM element.
- `centerPos` returns `{ x, y }` coordinates that center the window on the desktop.

## 6. Run with Express

Create a simple Express server to serve your SPA:

```js
// server.js
import express from 'express';
import { spaCatchAll } from 'osx-ui/server';

const app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

// API routes go here
app.get('/api/hello', (req, res) => res.json({ message: 'Hello' }));

// SPA catch-all (must be last)
app.use(spaCatchAll({ view: 'index' }));

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
```

Start the server:

```bash
node server.js
```

Open `http://localhost:3000` in your browser and you will see a macOS-style desktop with your menu bar and window.

## Next Steps

- [Creating Windows](./creating-windows.md) -- window lifecycle, sizing, content
- [Custom Themes](./custom-themes.md) -- build your own color scheme
- [Server Integration](./server-integration.md) -- full Express setup
- [Mobile Responsive](./mobile-responsive.md) -- how the framework adapts to small screens
