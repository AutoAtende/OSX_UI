# AGENTS.md - OSX UI Framework

## Project Overview

OSX UI is a macOS-style desktop window manager framework for web apps. It's a TypeScript library that provides components (buttons, cards, modals, etc.) and core window management (traffic lights, drag, resize, dock, menu bar) for building desktop-like web applications.

## Build Commands

```bash
# Build all (ESM + CJS + CSS)
npm run build

# Build ESM module
npm run build:esm

# Build CommonJS module
npm run build:cjs

# Build CSS
npm run build:css

# Clean dist folder
npm run clean
```

**Note:** This project has no test suite. There are no test commands in package.json and no test files exist in the repository.

## Code Style Guidelines

### TypeScript Configuration

- Target: ES2022
- Strict mode: enabled
- Declaration files: generated
- No unused locals/parameters allowed

### Naming Conventions

- **Interfaces/Types**: PascalCase (e.g., `WindowCreateOptions`, `ButtonOptions`, `AppConfig`)
- **Types only**: Use `export type { ... }` syntax
- **Functions**: camelCase (e.g., `createWindow`, `createButton`, `createDesktop`)
- **Classes**: PascalCase (e.g., `WindowManager`, `MenuBar`, `Router`)
- **Files**: kebab-case (e.g., `window-manager.ts`, `link-interceptor.ts`)

### Import/Export Style

- Use `.js` extension for all local imports (ESM style):
  ```typescript
  import { WindowManager } from './core/window-manager.js';
  import type { WindowCreateOptions } from '../types.js';
  ```
- Use `import type` for type-only imports
- Use named exports only (no default exports)
- Group exports in index.ts files by category (Types, Core, Router, Theme, Components, Utils)

### Formatting

- Use 2 spaces for indentation
- No semicolons at end of statements
- Single quotes for strings
- No trailing commas
- No comments unless explaining complex logic

### Error Handling

- Return `null` or fallback values instead of throwing errors when possible
- Provide default values for optional parameters (e.g., `opts.minW || 320`)
- Callbacks should handle their own errors; errors propagate silently to caller

### Component Patterns

All components follow this pattern:

```typescript
// Type definitions first
export type ButtonVariant = 'default' | 'primary' | 'danger' | 'ghost' | 'icon' | 'status';

export interface ButtonOptions {
  label?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
}

// Factory function
export function createButton(opts: ButtonOptions): HTMLButtonElement {
  const btn = document.createElement('button');
  // ... implementation
  return btn;
}
```

- Use `document.createElement()` for DOM creation
- Add class names using `className` property
- Attach event listeners directly to elements
- Return the created DOM element

### Project Structure

```
src/
├── index.ts           # Main export file
├── app.ts             # createApp function
├── types.ts           # Global type definitions
├── core/              # Window management, desktop, dock, menu bar
├── components/        # UI components (button, card, modal, etc.)
├── router/            # Router and link interceptor
├── theme/             # Theme manager and themes
└── utils/             # Utility functions
```

### CSS

- CSS is bundled separately (see `scripts/bundle-css.js`)
- Components use BEM-like class names (e.g., `osx-window`, `osx-titlebar`, `osx-btn`)
- CSS custom properties defined in tokens.ts

### Server

- Express server available at `./server` export
- Use `express-spa.ts` for SPA routing
- `wants-json.ts` for API detection middleware

## Available Components

### Core
- `createApp` - Main app entry point
- `WindowManager` - Window management (create, minimize, maximize, close, drag, resize)
- `createDesktop` - Desktop container
- `Dock` - macOS-style dock
- `MenuBar` - Menu bar with dropdowns

### Components
- `createButton` - Button with variants (default, primary, danger, ghost, icon, status)
- `createCard` - Card container
- `createPill` / `createDot` - Status indicators
- `createField` - Text input, select, textarea
- `createPasswordField` - Password input with show/hide toggle
- `createModal` - Modal dialog
- `createToolbar` - Button toolbar

### Date & Time
- `createCalendar` - Date picker calendar
- `createDateRangePicker` - Date range picker with two calendars

### Form Inputs
- `createCheckbox` - Checkbox with label
- `createRadioGroup` - Radio button group
- `createToggle` - Toggle switch
- `createAutocomplete` - Autocomplete input with dropdown suggestions
- `createFileUpload` - Drag & drop file upload
- `createColorPicker` - Color picker with presets

### Navigation
- `createTabs` - Tab navigation
- `createAccordion` - Accordion/collapsible sections
- `createSidebar` - Collapsible sidebar navigation

### Display
- `createTable` - Data table with sorting and pagination
- `createList` - List component
- `createTree` - Tree/hierarchical view
- `createBadge` - Badge/counter
- `createAvatar` - User avatar with image or initials

### Feedback
- `createToast` - Toast notifications (info, success, warning, error)
- `createProgress` - Progress bar
- `createSpinner` - Loading spinner

### Overlays
- `createTooltip` - Tooltip on hover
- `createContextMenu` - Right-click context menu
- `createDropdown` - Dropdown menu
- `createPopover` - Positionable popover

### Theme
- `ThemeManager` - Theme switching
- `darkTheme` / `lightTheme` - Predefined themes

### Router
- `Router` - Client-side routing
- `LinkInterceptor` - Intercept link clicks for SPA routing
