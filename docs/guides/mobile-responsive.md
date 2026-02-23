# Mobile Responsive

OSX_UI automatically adapts to small screens. On viewports 768px wide or narrower, the framework switches to a mobile-friendly layout.

## How Mobile Mode Works

The responsive behavior is handled entirely by CSS media queries -- no JavaScript changes are needed. When the viewport width is at or below 768px:

### Windows become fullscreen

Every window is forced to fill the entire viewport using `position: fixed` and `inset: 0`. This means all windows stack on top of each other at z-index 100.

```css
/* Automatically applied at <= 768px */
.osx-window {
  position: fixed !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 0;
  z-index: 100 !important;
}
```

### Menu bar hidden

The menu bar and its dropdown are hidden. If your app relies on menu actions, provide alternative controls (buttons, navigation links) inside window content for mobile users.

```css
.osx-menu-bar { display: none; }
.osx-menu-bar-dropdown { display: none !important; }
```

### Desktop starts at the top

Without the menu bar, the desktop area starts at `top: 0` instead of being offset by the menu bar height.

### No drag or resize

- The titlebar cursor is set to `default` (no grab cursor)
- Drag handles are inactive because the window fills the screen
- Resize handles are hidden: `.osx-resize-handle { display: none; }`
- Minimize and maximize traffic light buttons are hidden since windows are always fullscreen

### Dock hidden

The dock is hidden on mobile since windows cannot be minimized.

### Animations disabled

Open, close, and minimize animations are disabled to avoid visual artifacts on fullscreen transitions.

## Titlebar on Mobile

The titlebar remains visible with a slightly taller height (44px instead of the default) to provide a comfortable touch target. The close button (red traffic light) still works, allowing users to close windows.

## What You Should Do

### Provide in-window navigation

Since the menu bar is hidden, ensure your window content includes navigation:

```js
function showNote(noteId) {
  const content = document.createElement('div');

  // Back button for mobile navigation
  const backBtn = createButton({
    label: 'Back',
    variant: 'ghost',
    onClick: () => {
      app.wm.closeWindow('note-' + noteId);
      app.router.navigate('/');
    },
  });
  content.appendChild(backBtn);

  // Note content...
  const body = document.createElement('div');
  body.innerHTML = '<h2>Note Title</h2><p>Note content here...</p>';
  content.appendChild(body);

  const pos = app.centerPos(600, 400);
  app.wm.createWindow({
    id: 'note-' + noteId,
    title: 'Note',
    content,
    ...pos,
    width: 600,
    height: 400,
  });
}
```

### Avoid opening multiple windows simultaneously

On mobile, windows stack on top of each other at the same z-index. Close the current window before opening a new one, or use a single window and swap its content.

### Test touch interactions

Click handlers work with touch events automatically, but make sure interactive elements are large enough for fingers (at least 44x44px).

## Testing in DevTools

1. Open Chrome DevTools (F12)
2. Click the device toolbar icon (or press Ctrl+Shift+M / Cmd+Shift+M)
3. Select a mobile device preset or set the viewport width to 375px
4. Reload the page

You should see:
- No menu bar
- Windows filling the entire screen
- No resize handles
- Only the close button in the titlebar

## Breakpoint

The single breakpoint is `768px`:

```css
@media (max-width: 768px) {
  /* Mobile styles */
}
```

All desktop behavior applies above 768px. All mobile behavior applies at 768px and below.
