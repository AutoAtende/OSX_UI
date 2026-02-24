# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Testing:** Vitest test suite with jsdom environment (310+ tests across 33 files)
- **Testing:** Coverage configuration with v8 provider (80% threshold)
- **Linting:** ESLint with @typescript-eslint and recommended rules
- **Formatting:** Prettier configuration (2 spaces, no semicolons, single quotes)
- **CI/CD:** GitHub Actions workflow for lint, typecheck, test, and build on PRs
- **CI/CD:** GitHub Actions workflow for npm publish on version tags
- **Accessibility:** `role="dialog"` and `aria-modal="true"` on Modal
- **Accessibility:** Focus trap and Escape key close on Modal
- **Accessibility:** `aria-expanded`, `aria-controls`, `role="region"` on Accordion
- **Accessibility:** Arrow key navigation between Accordion headers
- **Accessibility:** `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` on Tabs
- **Accessibility:** Arrow key navigation between Tabs
- **Accessibility:** `role="menu"`, `role="menuitem"`, `aria-haspopup`, `aria-expanded` on Dropdown
- **Accessibility:** Keyboard navigation (arrows, Escape) in Dropdown
- **Accessibility:** `role="menu"`, `role="menuitem"` on Context Menu with keyboard navigation
- **Accessibility:** `aria-live="polite"` on Toast container, `role="alert"/"status"` on toasts
- **Accessibility:** `aria-sort` on sortable Table columns with keyboard activation
- **Accessibility:** `role="navigation"`, `aria-label` on Sidebar
- **Accessibility:** `role="dialog"`, `aria-haspopup`, `aria-expanded` on Popover with Escape key
- **Accessibility:** `role="combobox"`, `aria-autocomplete`, `role="listbox"` on Autocomplete
- **Accessibility:** `role="tooltip"` on Tooltip
- **Accessibility:** `:focus-visible` CSS styles for all interactive elements
- **Accessibility:** Screen reader utility class `.sr-only`
- **Cleanup:** `destroy()` method on Modal, Dropdown, Popover, Autocomplete, ColorPicker
- **Cleanup:** `createCleanupTracker` used consistently across components with global listeners
- **Validation:** Runtime prop validation on Table (columns required), Calendar, DateRangePicker, Autocomplete
- **DX:** `dev` script with watch mode using concurrently (ESM + CJS parallel watch)
- **DX:** `typecheck` script for standalone type checking
- **DX:** `test:watch` and `test:coverage` scripts

### Changed
- All TypeScript files formatted with Prettier
- ESLint auto-fixed `prefer-const` issues in dropdown.ts and table.ts

## [0.1.0] - 2024-12-01

### Added
- Initial release
- 25 UI components (Button, Card, Modal, Tabs, Accordion, Dropdown, Toast, Table, Calendar, DateRangePicker, Autocomplete, FileUpload, ColorPicker, Progress, Spinner, Badge, Avatar, Tooltip, Sidebar, ContextMenu, Popover, List, Tree, Pill, Field)
- Core window management (WindowManager, Window, Desktop, Dock, MenuBar, TrafficLights)
- Drag and resize functionality
- Client-side Router with link interceptor
- Theme system with dark and light themes
- CSS custom properties (design tokens)
- Responsive CSS for mobile
- Dual ESM/CJS module output
- CSS bundle script
- Express server utilities (SPA middleware, JSON detection)
- Zero runtime dependencies
