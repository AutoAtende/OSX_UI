# Dock

The `Dock` class renders a macOS-style dock at the bottom of the screen that holds minimized windows. Clicking a dock item restores the corresponding window.

## Import

```js
import { Dock } from 'osx-ui';
```

> **Note**: You typically do not create a `Dock` directly. The `WindowManager` creates and manages one internally. This reference is provided for advanced use cases.

## Constructor

```ts
new Dock(container: HTMLElement, onRestore: (id: string) => void)
```

| Parameter   | Type                       | Description                                  |
|-------------|----------------------------|----------------------------------------------|
| `container` | `HTMLElement`              | Parent element to append the dock to         |
| `onRestore` | `(id: string) => void`    | Callback invoked when a dock item is clicked |

Creates a `<div class="osx-dock">` element and appends it to the container.

## Methods

### `addItem(id, title)`

```ts
addItem(id: string, title: string): void
```

Adds a dock item for the given window `id`. The `title` is truncated to 18 characters with an ellipsis if longer than 20 characters.

### `removeItem(id)`

```ts
removeItem(id: string): void
```

Removes the dock item with the given `id` from the dock. No-op if the item does not exist.

### `destroy()`

```ts
destroy(): void
```

Removes the dock element from the DOM.

## CSS Classes

| Class            | Description                         |
|------------------|-------------------------------------|
| `.osx-dock`      | The dock container                  |
| `.osx-dock-item` | Individual item inside the dock     |

Each dock item has a `data-dock-id` attribute set to the window `id`.

## Usage Example

```js
const dock = new Dock(document.body, (id) => {
  console.log('Restore window:', id);
});

dock.addItem('editor', 'Text Editor');
dock.addItem('settings', 'Application Settings Panel');  // Truncated to "Application Setti..."

dock.removeItem('editor');
dock.destroy();
```
