# Creating Windows

This guide covers window creation, lifecycle management, sizing, and content patterns.

## Basic Window Creation

Use the `WindowManager` (available as `app.wm` when using `createApp`) to create windows:

```js
app.wm.createWindow({
  id: 'editor',
  title: 'Text Editor',
  content: '<textarea style="width:100%;height:100%"></textarea>',
  x: 100,
  y: 50,
  width: 600,
  height: 400,
});
```

Every window requires a unique `id`. If you call `createWindow` with an `id` that already exists, the existing window is focused instead of creating a duplicate.

## Centering Windows

Use `app.centerPos(width, height)` to compute centered coordinates:

```js
const pos = app.centerPos(500, 350);
app.wm.createWindow({
  id: 'centered',
  title: 'Centered',
  content: '<p>This window is centered on the desktop.</p>',
  ...pos,       // spreads { x, y }
  width: 500,
  height: 350,
});
```

You can also use `centerPosition` directly:

```js
import { centerPosition } from 'osx-ui';

const desktop = document.getElementById('desktop');
const { x, y } = centerPosition(desktop, 500, 350);
```

## Window Lifecycle

### Open

Windows are created with `createWindow`. They appear with an open animation and receive focus automatically.

### Focus

Clicking a window brings it to the top. You can also focus programmatically:

```js
app.wm.focusWindow('editor');
```

The focused window gets the CSS class `focused` and the highest z-index.

### Minimize

The yellow traffic light button minimizes a window. The window slides out and appears as a dock item at the bottom of the screen:

```js
app.wm.minimizeWindow('editor');
```

### Restore

Click the dock item or call:

```js
app.wm.restoreWindow('editor');
```

The window reappears with an animation and regains focus.

### Maximize

The green traffic light button toggles maximize. A maximized window fills the entire desktop area:

```js
app.wm.maximizeWindow('editor');  // Maximize
app.wm.maximizeWindow('editor');  // Restore to original size
```

The original position and size are stored in `WindowState.savedRect`.

### Close

The red traffic light button closes a window. You can also close programmatically:

```js
app.wm.closeWindow('editor');
```

Closing a window:
1. Calls the `onClose` callback (if set)
2. Removes the window from the dock (if minimized)
3. Plays the close animation
4. Focuses the next topmost window

## Content: HTML String vs DOM Element

The `content` option accepts either an HTML string or a DOM element.

### HTML string

```js
app.wm.createWindow({
  id: 'html-win',
  title: 'HTML Content',
  content: `
    <div style="padding: 16px;">
      <h2>Hello</h2>
      <p>This is rendered from an HTML string.</p>
    </div>
  `,
  x: 100, y: 100, width: 400, height: 300,
});
```

### DOM element

```js
const container = document.createElement('div');
container.style.padding = '16px';

const heading = document.createElement('h2');
heading.textContent = 'Hello';
container.appendChild(heading);

const btn = createButton({ label: 'Click me', variant: 'primary', onClick: () => alert('Hi') });
container.appendChild(btn);

app.wm.createWindow({
  id: 'dom-win',
  title: 'DOM Content',
  content: container,
  x: 200, y: 100, width: 400, height: 300,
});
```

Using DOM elements is recommended when you need event listeners or complex interactivity.

## Window Sizes

Here are common size presets you might use:

| Size    | Width | Height | Use case                    |
|---------|-------|--------|-----------------------------|
| Compact | 360   | 280    | Dialogs, settings panels    |
| Medium  | 600   | 400    | Standard content windows    |
| Large   | 900   | 600    | Full editors, dashboards    |

### Minimum size

Set `minW` and `minH` to prevent windows from being resized too small:

```js
app.wm.createWindow({
  id: 'resizable',
  title: 'Has Minimum Size',
  content: '<p>Try resizing me.</p>',
  x: 100, y: 100,
  width: 600, height: 400,
  minW: 300,
  minH: 200,
});
```

## The onClose Callback

Use `onClose` to run cleanup logic when a window is closed:

```js
let interval;

app.wm.createWindow({
  id: 'timer',
  title: 'Timer',
  content: '<p id="clock">0</p>',
  x: 100, y: 100, width: 300, height: 200,
  onClose: () => {
    clearInterval(interval);
    console.log('Timer window closed, interval cleared');
  },
});

let seconds = 0;
interval = setInterval(() => {
  seconds++;
  document.getElementById('clock').textContent = String(seconds);
}, 1000);
```

## Iterating All Windows

```js
for (const [id, state] of app.wm.getAllWindows()) {
  console.log(`${id}: ${state.title}, maximized=${state.isMaximized}`);
}
```

## Checking the Focused Window

```js
const focusedId = app.wm.focusedId;
if (focusedId) {
  const win = app.wm.getWindow(focusedId);
  console.log('Focused:', win.title);
}
```
