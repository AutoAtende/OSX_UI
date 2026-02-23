# WindowManager

The `WindowManager` class handles the full lifecycle of desktop windows -- creation, focus management, z-ordering, minimize/restore, maximize, and cleanup.

## Import

```js
import { WindowManager } from 'osx-ui';
```

## Constructor

```ts
new WindowManager(desktop: HTMLElement, menuBarHeight?: number)
```

| Parameter       | Type          | Default | Description                                    |
|-----------------|---------------|---------|------------------------------------------------|
| `desktop`       | `HTMLElement` | --      | The desktop surface element                    |
| `menuBarHeight` | `number`      | `28`    | Height of the menu bar in pixels (constrains window drag) |

The constructor also creates an internal `Dock` instance, appended to the desktop's parent element.

## Properties

### `focusedId`

```ts
get focusedId(): string | null
```

Returns the `id` of the currently focused window, or `null` if no window has focus.

## Methods

### `createWindow(opts)`

```ts
createWindow(opts: WindowCreateOptions): WindowState
```

Creates a new window and appends it to the desktop. If a window with the same `id` already exists, it focuses that window instead of creating a duplicate.

Returns the `WindowState` for the new (or existing) window.

### `closeWindow(id)`

```ts
closeWindow(id: string): void
```

Closes and removes a window. Calls the window's `onClose` callback if set, removes the window from the dock (if minimized), plays the close animation, and focuses the next topmost window.

### `minimizeWindow(id)`

```ts
minimizeWindow(id: string): void
```

Minimizes a window by hiding it and adding a dock item. The window is animated before being hidden.

### `restoreWindow(id)`

```ts
restoreWindow(id: string): void
```

Restores a minimized window, removing it from the dock and giving it focus.

### `maximizeWindow(id)`

```ts
maximizeWindow(id: string): void
```

Toggles a window between maximized (fills the desktop area) and its previous size/position. The original position is saved to `WindowState.savedRect` and restored when toggled back.

### `focusWindow(id)`

```ts
focusWindow(id: string): void
```

Brings a window to the top of the z-order and marks it as `focused`. The previously focused window loses its `focused` CSS class.

### `getWindow(id)`

```ts
getWindow(id: string): WindowState | undefined
```

Returns the `WindowState` for a given window `id`, or `undefined` if not found.

### `getAllWindows()`

```ts
getAllWindows(): Map<string, WindowState>
```

Returns the full internal map of all open windows.

### `destroy()`

```ts
destroy(): void
```

Closes all windows and removes the dock from the DOM.

## WindowCreateOptions

```ts
interface WindowCreateOptions {
  id: string;                       // Unique window identifier
  title: string;                    // Titlebar text
  content: string | HTMLElement;    // Window body (HTML string or DOM element)
  x: number;                        // Initial left position (px)
  y: number;                        // Initial top position (px)
  width: number;                    // Initial width (px)
  height: number;                   // Initial height (px)
  minW?: number;                    // Minimum width (default varies)
  minH?: number;                    // Minimum height (default varies)
  onClose?: () => void;             // Callback when window is closed
}
```

## WindowState

```ts
interface WindowState {
  el: HTMLElement;         // The window's root DOM element
  id: string;              // Window identifier
  title: string;           // Window title
  minW: number;            // Minimum width
  minH: number;            // Minimum height
  onClose: (() => void) | null;
  isMaximized: boolean;    // Whether the window is currently maximized
  savedRect: { x: number; y: number; w: number; h: number } | null;
}
```

## Usage Examples

### Basic window

```js
const desktop = document.getElementById('desktop');
const wm = new WindowManager(desktop);

wm.createWindow({
  id: 'editor',
  title: 'Text Editor',
  content: '<textarea style="width:100%;height:100%"></textarea>',
  x: 100,
  y: 50,
  width: 600,
  height: 400,
  onClose: () => console.log('Editor closed'),
});
```

### Centering a window

Use `centerPosition` to compute x/y:

```js
import { WindowManager, centerPosition } from 'osx-ui';

const pos = centerPosition(desktop, 500, 350);
wm.createWindow({
  id: 'centered',
  title: 'Centered Window',
  content: '<p>Hello</p>',
  ...pos,
  width: 500,
  height: 350,
});
```

### Programmatic control

```js
wm.minimizeWindow('editor');   // Sends to dock
wm.restoreWindow('editor');    // Brings back from dock
wm.maximizeWindow('editor');   // Fills desktop
wm.maximizeWindow('editor');   // Restores to previous size
wm.focusWindow('editor');      // Brings to front
wm.closeWindow('editor');      // Removes and cleans up
```

### Iterate all windows

```js
for (const [id, state] of wm.getAllWindows()) {
  console.log(id, state.title, state.isMaximized);
}
```
