# MenuBar

The `MenuBar` class renders a macOS-style menu bar with dropdown menus, an app icon, an auth button, and an optional clock.

## Import

```js
import { MenuBar } from 'osx-ui';
```

## Constructor

```ts
new MenuBar(config: MenuBarConfig)
```

Creates a menu bar instance but does not insert it into the DOM. Call `init()` to render.

## Methods

### `init(container?)`

```ts
init(container?: HTMLElement): void
```

Renders the menu bar and its dropdown container into the given element (defaults to `document.body`). The bar is inserted as the first child of the container. Also starts the clock if `showClock` is enabled.

### `updateAuthDisplay(text)`

```ts
updateAuthDisplay(text: string): void
```

Sets the text content of the auth button on the right side of the menu bar. Use this to show the logged-in user's name, or "Login" / "Logout" labels.

### `openDropdown(menuId)`

```ts
openDropdown(menuId: string): void
```

Opens the dropdown for the menu with the given `id`. If the menu is marked `dynamic`, its `onOpen` callback is called first so you can update `items` before rendering.

### `closeDropdown()`

```ts
closeDropdown(): void
```

Closes the currently open dropdown.

### `getMenuConfig(menuId)`

```ts
getMenuConfig(menuId: string): MenuConfig | undefined
```

Returns the `MenuConfig` object for a given menu `id`, or `undefined` if not found. Useful for dynamically modifying menu items.

### `destroy()`

```ts
destroy(): void
```

Stops the clock interval and removes the menu bar and dropdown elements from the DOM.

## MenuBarConfig

```ts
interface MenuBarConfig {
  icon?: string;            // HTML string for the app icon (e.g. an SVG)
  appName?: string;         // App name shown next to the icon
  menus: MenuConfig[];      // Array of menu definitions
  showClock?: boolean;      // Show HH:MM clock on the right (default false)
  onAuthClick?: () => void; // Click handler for the auth button
}
```

## MenuConfig

```ts
interface MenuConfig {
  id: string;               // Unique menu identifier
  label: string;            // Text shown in the menu bar
  items: MenuItem[];        // Dropdown items
  dynamic?: boolean;        // If true, onOpen is called before rendering items
  onOpen?: () => void;      // Called before the dropdown opens (for dynamic menus)
}
```

## MenuItem

```ts
interface MenuItem {
  label?: string;           // Item text
  action?: (() => void) | null;  // Click handler
  shortcut?: string;        // Keyboard shortcut label (display only)
  type?: 'separator';       // Renders a horizontal separator instead of an item
  checked?: boolean;        // Shows a check mark
  disabled?: boolean;       // Grays out the item and disables its action
}
```

## Usage Examples

### Basic menu bar

```js
const menuBar = new MenuBar({
  appName: 'Notes',
  icon: '<svg>...</svg>',
  showClock: true,
  menus: [
    {
      id: 'file',
      label: 'File',
      items: [
        { label: 'New Note', action: () => createNote(), shortcut: 'Cmd+N' },
        { type: 'separator' },
        { label: 'Close', action: () => closeNote(), shortcut: 'Cmd+W' },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      items: [
        { label: 'Undo', action: () => undo(), shortcut: 'Cmd+Z' },
        { label: 'Redo', action: () => redo(), shortcut: 'Cmd+Shift+Z' },
      ],
    },
  ],
  onAuthClick: () => toggleLoginModal(),
});

menuBar.init(document.getElementById('root'));
menuBar.updateAuthDisplay('admin');
```

### Dynamic menus

Use the `dynamic` flag and `onOpen` callback to update menu items at render time:

```js
const windowMenu = {
  id: 'window',
  label: 'Window',
  dynamic: true,
  items: [],
  onOpen() {
    // Rebuild items each time the dropdown opens
    this.items = [];
    for (const [id, state] of wm.getAllWindows()) {
      this.items.push({
        label: state.title,
        action: () => wm.focusWindow(id),
        checked: wm.focusedId === id,
      });
    }
    if (this.items.length === 0) {
      this.items.push({ label: 'No windows', disabled: true });
    }
  },
};
```

### Auth button

```js
menuBar.updateAuthDisplay('Lucas');  // Shows "Lucas" on the right
menuBar.updateAuthDisplay('Login');  // Changes to "Login"
```
