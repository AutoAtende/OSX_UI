// Types
export type {
  WindowCreateOptions,
  WindowState,
  MenuItem,
  MenuConfig,
  MenuBarConfig,
  Route,
  ThemeTokens,
  AppConfig,
  CleanupTracker,
} from './types.js';

// Core
export { WindowManager } from './core/window-manager.js';
export { createDesktop } from './core/desktop.js';
export { Dock } from './core/dock.js';
export { MenuBar } from './core/menu-bar.js';

// Router
export { Router } from './router/router.js';
export { LinkInterceptor } from './router/link-interceptor.js';

// Theme
export { ThemeManager } from './theme/theme-manager.js';
export { darkTheme } from './theme/themes/dark.js';
export { lightTheme } from './theme/themes/light.js';

// Components
export { createButton } from './components/button.js';
export type { ButtonOptions, ButtonVariant, StatusColor } from './components/button.js';
export { createCard } from './components/card.js';
export type { CardOptions } from './components/card.js';
export { createPill, createDot } from './components/pill.js';
export type { PillOptions, DotColor } from './components/pill.js';
export { createField } from './components/field.js';
export type { FieldOptions, FieldResult, FieldType } from './components/field.js';
export { createPasswordField } from './components/password-field.js';
export type { PasswordFieldOptions, PasswordFieldResult } from './components/password-field.js';
export { createModal } from './components/modal.js';
export type { ModalOptions, ModalResult } from './components/modal.js';
export { createToolbar } from './components/toolbar.js';
export { createCalendar } from './components/calendar.js';
export type { CalendarOptions, CalendarResult } from './components/calendar.js';
export { createDateRangePicker } from './components/date-range-picker.js';
export type { DateRange, DateRangePickerOptions, DateRangePickerResult } from './components/date-range-picker.js';
export { createCheckbox, createRadioGroup, createToggle } from './components/form-inputs.js';
export type { CheckboxOptions, CheckboxResult, RadioGroupOptions, RadioGroupResult, RadioOption, ToggleOptions, ToggleResult } from './components/form-inputs.js';
export { createAutocomplete } from './components/autocomplete.js';
export type { AutocompleteOptions, AutocompleteResult, AutocompleteOption } from './components/autocomplete.js';
export { createFileUpload } from './components/file-upload.js';
export type { FileUploadOptions, FileUploadResult } from './components/file-upload.js';
export { createColorPicker } from './components/color-picker.js';
export type { ColorPickerOptions, ColorPickerResult } from './components/color-picker.js';
export { createTabs } from './components/tabs.js';
export type { TabsOptions, TabsResult, Tab } from './components/tabs.js';
export { createToast } from './components/toast.js';
export type { ToastOptions, ToastResult, ToastType } from './components/toast.js';
export { createTable } from './components/table.js';
export type { TableOptions, TableResult, TableColumn } from './components/table.js';
export { createAccordion } from './components/accordion.js';
export type { AccordionOptions, AccordionResult, AccordionItem } from './components/accordion.js';
export { createProgress, createSpinner } from './components/progress.js';
export type { ProgressOptions, ProgressResult, SpinnerOptions, SpinnerResult } from './components/progress.js';
export { createBadge } from './components/badge-avatar.js';
export type { BadgeOptions, BadgeResult } from './components/badge-avatar.js';
export { createAvatar } from './components/badge-avatar.js';
export type { AvatarOptions, AvatarResult } from './components/badge-avatar.js';
export { createTooltip } from './components/tooltip.js';
export type { TooltipOptions, TooltipResult } from './components/tooltip.js';
export { createSidebar } from './components/sidebar.js';
export type { SidebarOptions, SidebarResult, SidebarItem } from './components/sidebar.js';
export { createContextMenu } from './components/context-menu.js';
export type { ContextMenuOptions, ContextMenuResult, ContextMenuItem } from './components/context-menu.js';
export { createDropdown } from './components/dropdown.js';
export type { DropdownOptions, DropdownResult, DropdownItem } from './components/dropdown.js';
export { createPopover } from './components/popover.js';
export type { PopoverOptions, PopoverResult } from './components/popover.js';
export { createList, createTree } from './components/list-tree.js';
export type { ListOptions, ListResult, ListItem, TreeOptions, TreeResult, TreeNode } from './components/list-tree.js';

// Utils
export { escapeHtml } from './utils/escape-html.js';
export { centerPosition } from './utils/center-position.js';
export { debounce } from './utils/debounce.js';
export { createElement } from './utils/dom.js';
export { createCleanupTracker } from './utils/events.js';

// Convenience
export { createApp } from './app.js';
export type { App } from './app.js';
