# Components

OSX_UI provides factory functions for common UI components. Each function creates and returns a DOM element (or a result object containing elements). All components are styled by the framework's CSS.

## Import

```js
import {
  createButton,
  createCard,
  createPill,
  createDot,
  createField,
  createPasswordField,
  createModal,
  createToolbar,
} from 'osx-ui';
```

---

## createButton

```ts
createButton(opts: ButtonOptions): HTMLButtonElement
```

Creates a styled button element.

### ButtonOptions

```ts
interface ButtonOptions {
  label?: string;           // Button text
  variant?: ButtonVariant;  // Visual style (default: 'default')
  statusColor?: StatusColor; // Color when variant is 'status'
  icon?: string;            // HTML string (e.g. SVG) used instead of label
  title?: string;           // Tooltip text
  ariaLabel?: string;       // Accessible label
  onClick?: () => void;     // Click handler
}

type ButtonVariant = 'default' | 'primary' | 'danger' | 'ghost' | 'icon' | 'status';
type StatusColor = 'ok' | 'danger' | 'purple' | 'muted';
```

### CSS Classes

The base class is `osx-btn`. Variants add their name as an additional class (e.g., `osx-btn primary`). Status buttons also get the status color class (e.g., `osx-btn status ok`).

### Examples

```js
// Primary action button
const saveBtn = createButton({
  label: 'Save',
  variant: 'primary',
  onClick: () => save(),
});

// Danger button
const deleteBtn = createButton({
  label: 'Delete',
  variant: 'danger',
  onClick: () => confirmDelete(),
});

// Icon button
const menuBtn = createButton({
  icon: '<svg>...</svg>',
  variant: 'icon',
  title: 'Open menu',
  ariaLabel: 'Open menu',
});

// Status indicator button
const statusBtn = createButton({
  label: 'Online',
  variant: 'status',
  statusColor: 'ok',
});
```

---

## createCard

```ts
createCard(opts?: CardOptions): HTMLElement
```

Creates a card container with optional header and body sections.

### CardOptions

```ts
interface CardOptions {
  header?: string | HTMLElement;  // Card header (HTML string or DOM element)
  body?: string | HTMLElement;    // Card body (HTML string or DOM element)
  className?: string;            // Additional CSS class
}
```

### CSS Classes

| Class         | Description        |
|---------------|--------------------|
| `.osx-card`   | Card container     |
| `.osx-card-hd`| Card header        |
| `.osx-card-bd`| Card body          |

### Examples

```js
// Card with HTML strings
const card = createCard({
  header: '<h3>Statistics</h3>',
  body: '<p>Active users: 42</p>',
});

// Card with DOM elements
const title = document.createElement('h3');
title.textContent = 'Settings';
const form = document.createElement('form');
// ...build form...

const card = createCard({
  header: title,
  body: form,
  className: 'settings-card',
});
```

---

## createPill

```ts
createPill(opts: PillOptions): HTMLElement
```

Creates an inline badge/pill element, optionally with a colored status dot.

### PillOptions

```ts
interface PillOptions {
  text: string;       // Pill text
  dot?: DotColor;     // Optional colored dot prefix
  compact?: boolean;  // Compact sizing (default false)
}

type DotColor = 'ok' | 'danger' | 'purple' | 'muted';
```

### CSS Classes

| Class             | Description              |
|-------------------|--------------------------|
| `.osx-pill`       | Pill container           |
| `.osx-pill.compact` | Compact variant        |
| `.osx-dot`        | Status dot               |
| `.osx-dot.ok`     | Green dot                |
| `.osx-dot.danger` | Red dot                  |
| `.osx-dot.purple` | Purple dot               |
| `.osx-dot.muted`  | Gray dot                 |

### Examples

```js
const activePill = createPill({ text: 'Active', dot: 'ok' });
const errorPill = createPill({ text: 'Error', dot: 'danger', compact: true });
const tagPill = createPill({ text: 'v1.0.0' });
```

---

## createDot

```ts
createDot(color: DotColor): HTMLElement
```

Creates a standalone colored status dot.

```js
const dot = createDot('ok');       // Green dot
const dot2 = createDot('danger');  // Red dot
```

---

## createField

```ts
createField(opts: FieldOptions): FieldResult
```

Creates a labeled form field. Supports text, email, number, password, select, and textarea types.

### FieldOptions

```ts
interface FieldOptions {
  label: string;                              // Label text
  name: string;                               // Input name attribute
  type?: FieldType;                           // Input type (default: 'text')
  placeholder?: string;                       // Placeholder text
  value?: string;                             // Initial value
  required?: boolean;                         // Required attribute
  options?: { value: string; label: string }[]; // Options for select type
}

type FieldType = 'text' | 'email' | 'number' | 'password' | 'select' | 'textarea';
```

### FieldResult

```ts
interface FieldResult {
  container: HTMLElement;                                       // Wrapper div (.osx-field)
  input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement; // The input element
  setInvalid: (invalid: boolean) => void;                       // Toggle invalid styling
}
```

### Examples

```js
// Text field
const { container, input } = createField({
  label: 'Name',
  name: 'username',
  placeholder: 'Enter your name',
  required: true,
});

// Select field
const { container: selectContainer } = createField({
  label: 'Role',
  name: 'role',
  type: 'select',
  value: 'user',
  options: [
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'User' },
  ],
});

// Textarea
const { container: textareaContainer } = createField({
  label: 'Notes',
  name: 'notes',
  type: 'textarea',
  placeholder: 'Additional notes...',
});

// Mark a field as invalid
const field = createField({ label: 'Email', name: 'email', type: 'email' });
field.setInvalid(true);   // Adds .invalid class
field.setInvalid(false);  // Removes .invalid class
```

---

## createPasswordField

```ts
createPasswordField(opts?: PasswordFieldOptions): PasswordFieldResult
```

Creates a password input with a visibility toggle button (eye/eye-off icons).

### PasswordFieldOptions

```ts
interface PasswordFieldOptions {
  label?: string;        // Label text
  name?: string;         // Input name (default: 'password')
  placeholder?: string;  // Placeholder text
  autocomplete?: string; // Autocomplete attribute
  required?: boolean;    // Required attribute
}
```

### PasswordFieldResult

```ts
interface PasswordFieldResult {
  container: HTMLElement;    // Wrapper div (.osx-field)
  input: HTMLInputElement;   // The password input element
}
```

### Example

```js
const { container, input } = createPasswordField({
  label: 'Password',
  name: 'password',
  placeholder: 'Enter password',
  autocomplete: 'current-password',
  required: true,
});

document.querySelector('form').appendChild(container);
```

---

## createModal

```ts
createModal(opts: ModalOptions): ModalResult
```

Creates a modal dialog with a backdrop overlay. The modal is appended to `document.body` immediately.

### ModalOptions

```ts
interface ModalOptions {
  content: string | HTMLElement;  // Modal content (HTML string or DOM element)
  onClose?: () => void;           // Callback when the modal is closed
  closeOnBackdrop?: boolean;      // Close when clicking backdrop (default true)
}
```

### ModalResult

```ts
interface ModalResult {
  backdrop: HTMLElement;  // The backdrop overlay element
  modal: HTMLElement;     // The modal content container
  close: () => void;      // Call to close the modal programmatically
}
```

### CSS Classes

| Class                  | Description          |
|------------------------|----------------------|
| `.osx-modal-backdrop`  | Fullscreen overlay   |
| `.osx-modal`           | Modal content box    |

### Examples

```js
// Simple modal with HTML
const { close } = createModal({
  content: '<h2>Confirm</h2><p>Are you sure?</p>',
  onClose: () => console.log('Modal closed'),
});

// Close programmatically
close();

// Modal with DOM content
const form = document.createElement('form');
form.innerHTML = '<input name="name" /><button type="submit">OK</button>';

const { close: closeForm, modal } = createModal({
  content: form,
  closeOnBackdrop: false,  // Only close via button
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  closeForm();
});
```

---

## createToolbar

```ts
createToolbar(children?: HTMLElement[]): HTMLElement
```

Creates a toolbar container and appends the given child elements.

### CSS Classes

| Class          | Description          |
|----------------|----------------------|
| `.osx-toolbar` | Toolbar container    |

### Example

```js
const toolbar = createToolbar([
  createButton({ label: 'New', variant: 'primary', onClick: () => newItem() }),
  createButton({ label: 'Delete', variant: 'danger', onClick: () => deleteItem() }),
  createPill({ text: '3 items', dot: 'ok' }),
]);

windowBody.prepend(toolbar);
```

---

## createCalendar

```ts
createCalendar(opts?: CalendarOptions): CalendarResult
```

Creates a calendar date picker component.

### CalendarOptions

```ts
interface CalendarOptions {
  value?: Date;           // Initial selected date
  min?: Date;             // Minimum selectable date
  max?: Date;             // Maximum selectable date
  onChange?: (date: Date) => void;  // Callback when date is selected
}
```

### CalendarResult

```ts
interface CalendarResult {
  container: HTMLElement;       // Calendar container element
  setValue: (date: Date) => void;     // Programmatically set date
  getValue: () => Date | null;         // Get currently selected date
  getFormattedValue: () => string | null;  // Get date as YYYY-MM-DD string
}
```

### CSS Classes

| Class                   | Description              |
|-------------------------|------------------------|
| `.osx-calendar`         | Calendar container      |
| `.osx-calendar-header`  | Header with nav buttons |
| `.osx-calendar-month`   | Month/year label        |
| `.osx-calendar-nav`     | Navigation buttons      |
| `.osx-calendar-grid`    | Day grid               |
| `.osx-calendar-day`     | Day cell               |
| `.osx-calendar-day.selected` | Selected day      |
| `.osx-calendar-day.disabled` | Disabled day      |

### Examples

```js
const calendar = createCalendar({
  min: new Date(2024, 0, 1),
  max: new Date(2025, 11, 31),
  onChange: (date) => console.log('Selected:', date),
});

document.body.appendChild(calendar.container);

// Get selected date
const date = calendar.getValue();
const formatted = calendar.getFormattedValue(); // "2024-03-15"
```

---

## createDateRangePicker

```ts
createDateRangePicker(opts?: DateRangePickerOptions): DateRangePickerResult
```

Creates a date range picker with two calendars for selecting start and end dates.

### DateRangePickerOptions

```ts
interface DateRangePickerOptions {
  min?: Date;                    // Minimum selectable date
  max?: Date;                    // Maximum selectable date
  value?: DateRange;             // Initial date range
  onChange?: (range: DateRange) => void;  // Callback when range changes
}

interface DateRange {
  start: Date | null;
  end: Date | null;
}
```

### DateRangePickerResult

```ts
interface DateRangePickerResult {
  container: HTMLElement;       // Picker container
  setValue: (range: DateRange) => void;  // Set date range
  getValue: () => DateRange;   // Get current range
}
```

### CSS Classes

| Class                         | Description              |
|-------------------------------|------------------------|
| `.osx-daterangepicker`        | Main container          |
| `.osx-daterangepicker-inputs` | Input fields container |
| `.osx-daterangepicker-input`  | Date input fields      |
| `.osx-daterangepicker-separator` | Arrow between inputs |
| `.osx-daterangepicker-calendars` | Calendar popup       |

### Examples

```js
const rangePicker = createDateRangePicker({
  onChange: (range) => {
    console.log('Start:', range.start);
    console.log('End:', range.end);
  },
});

document.body.appendChild(rangePicker.container);
```

---

## createCheckbox

```ts
createCheckbox(opts?: CheckboxOptions): CheckboxResult
```

Creates a styled checkbox with label.

### CheckboxOptions

```ts
interface CheckboxOptions {
  label?: string;              // Checkbox label text
  checked?: boolean;          // Initial checked state
  disabled?: boolean;         // Disabled state
  onChange?: (checked: boolean) => void;  // Change callback
}
```

### CheckboxResult

```ts
interface CheckboxResult {
  container: HTMLElement;       // Label wrapper element
  input: HTMLInputElement;     // Hidden checkbox input
  setChecked: (checked: boolean) => void;
  getChecked: () => boolean;
}
```

### CSS Classes

| Class                  | Description          |
|------------------------|----------------------|
| `.osx-checkbox`        | Container (label)    |
| `.osx-checkbox-input`  | Hidden input         |
| `.osx-checkbox-mark`  | Custom checkbox box  |
| `.osx-checkbox-label` | Label text           |

### Examples

```js
const checkbox = createCheckbox({
  label: 'I agree to the terms',
  onChange: (checked) => console.log('Agreed:', checked),
});

document.body.appendChild(checkbox.container);
```

---

## createRadioGroup

```ts
createRadioGroup(opts: RadioGroupOptions): RadioGroupResult
```

Creates a group of radio buttons.

### RadioGroupOptions

```ts
interface RadioGroupOptions {
  name: string;                              // Radio group name
  options: RadioOption[];                    // Radio options
  value?: string;                           // Initial selected value
  onChange?: (value: string) => void;      // Change callback
}

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

### RadioGroupResult

```ts
interface RadioGroupResult {
  container: HTMLElement;       // Group container
  setValue: (value: string) => void;
  getValue: () => string | null;
}
```

### CSS Classes

| Class                | Description          |
|----------------------|----------------------|
| `.osx-radio-group`  | Container for radios |
| `.osx-radio`        | Radio item (label)   |
| `.osx-radio-input`  | Hidden radio input   |
| `.osx-radio-mark`   | Custom radio circle  |
| `.osx-radio-label`  | Radio label text    |

### Examples

```js
const radioGroup = createRadioGroup({
  name: 'plan',
  options: [
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise' },
  ],
  value: 'pro',
  onChange: (value) => console.log('Selected:', value),
});

document.body.appendChild(radioGroup.container);
```

---

## createToggle

```ts
createToggle(opts?: ToggleOptions): ToggleResult
```

Creates a toggle switch (on/off).

### ToggleOptions

```ts
interface ToggleOptions {
  label?: string;                    // Toggle label
  checked?: boolean;                // Initial state
  disabled?: boolean;               // Disabled state
  onChange?: (checked: boolean) => void;  // Change callback
}
```

### ToggleResult

```ts
interface ToggleResult {
  container: HTMLElement;       // Toggle container (label)
  input: HTMLInputElement;     // Hidden checkbox input
  setChecked: (checked: boolean) => void;
  getChecked: () => boolean;
}
```

### CSS Classes

| Class                | Description          |
|----------------------|----------------------|
| `.osx-toggle`        | Container (label)    |
| `.osx-toggle-input`  | Hidden input         |
| `.osx-toggle-track` | Switch track         |
| `.osx-toggle-thumb` | Switch thumb         |
| `.osx-toggle-label` | Label text           |

### Examples

```js
const toggle = createToggle({
  label: 'Enable notifications',
  onChange: (checked) => console.log('Enabled:', checked),
});

document.body.appendChild(toggle.container);
```

---

## createAutocomplete

```ts
createAutocomplete(opts: AutocompleteOptions): AutocompleteResult
```

Creates an autocomplete input with dropdown suggestions.

### AutocompleteOptions

```ts
interface AutocompleteOptions {
  placeholder?: string;                    // Input placeholder
  options: AutocompleteOption[];            // Available options
  value?: string;                          // Initial value (by value)
  onChange?: (value: string | null) => void;  // Change callback
}

interface AutocompleteOption {
  value: string;
  label: string;
}
```

### AutocompleteResult

```ts
interface AutocompleteResult {
  container: HTMLElement;       // Autocomplete container
  input: HTMLInputElement;      // Text input element
  setValue: (value: string | null) => void;
  getValue: () => string | null;  // Returns option value, not label
}
```

### CSS Classes

| Class                       | Description              |
|-----------------------------|--------------------------|
| `.osx-autocomplete`         | Container                |
| `.osx-autocomplete-input`   | Text input               |
| `.osx-autocomplete-dropdown`| Dropdown menu           |
| `.osx-autocomplete-item`    | Dropdown option          |
| `.osx-autocomplete-item.active` | Highlighted option  |
| `.osx-autocomplete-empty`  | "No results" message    |

### Examples

```js
const autocomplete = createAutocomplete({
  placeholder: 'Select a fruit...',
  options: [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ],
  onChange: (value) => console.log('Selected:', value),
});

document.body.appendChild(autocomplete.container);
```

---

## createFileUpload

```ts
createFileUpload(opts?: FileUploadOptions): FileUploadResult
```

Creates a drag & drop file upload area.

### FileUploadOptions

```ts
interface FileUploadOptions {
  accept?: string;              // Accepted file types (e.g., ".jpg,.png")
  multiple?: boolean;           // Allow multiple files
  onChange?: (files: File[]) => void;  // Change callback
}
```

### FileUploadResult

```ts
interface FileUploadResult {
  container: HTMLElement;       // Upload container
  input: HTMLInputElement;     // Hidden file input
  getFiles: () => File[];     // Get selected files
}
```

### CSS Classes

| Class                        | Description          |
|------------------------------|----------------------|
| `.osx-fileupload`            | Main container       |
| `.osx-fileupload-input`       | Hidden file input    |
| `.osx-fileupload-dropzone`   | Drop area            |
| `.osx-fileupload-dropzone.dragover` | Drag hover state |
| `.osx-fileupload-icon`       | Upload icon          |
| `.osx-fileupload-text`       | Instruction text     |
| `.osx-fileupload-list`       | Selected files list |
| `.osx-fileupload-item`       | File item           |
| `.osx-fileupload-item-name`  | Filename            |
| `.osx-fileupload-item-remove`| Remove button       |

### Examples

```js
const upload = createFileUpload({
  accept: '.jpg,.png,.pdf',
  multiple: true,
  onChange: (files) => {
    files.forEach(file => console.log('File:', file.name));
  },
});

document.body.appendChild(upload.container);

// Get files programmatically
const files = upload.getFiles();
```

---

## createColorPicker

```ts
createColorPicker(opts?: ColorPickerOptions): ColorPickerResult
```

Creates a color picker with preset colors.

### ColorPickerOptions

```ts
interface ColorPickerOptions {
  value?: string;              // Initial color (hex)
  onChange?: (color: string) => void;  // Change callback
}
```

### ColorPickerResult

```ts
interface ColorPickerResult {
  container: HTMLElement;       // Picker container
  setValue: (color: string) => void;
  getValue: () => string;       // Returns hex color
}
```

### CSS Classes

| Class                      | Description          |
|----------------------------|----------------------|
| `.osx-colorpicker`         | Container            |
| `.osx-colorpicker-trigger` | Color swatch button  |
| `.osx-colorpicker-popup`   | Popup with presets   |
| `.osx-colorpicker-hex`     | Hex input field     |
| `.osx-colorpicker-presets` | Preset colors grid  |
| `.osx-colorpicker-swatch`  | Color swatch        |
| `.osx-colorpicker-swatch.selected` | Selected color |

### Examples

```js
const colorPicker = createColorPicker({
  value: '#3b82f6',
  onChange: (color) => console.log('Color:', color),
});

document.body.appendChild(colorPicker.container);
```

---

## createTabs

```ts
createTabs(opts: TabsOptions): TabsResult
```

Creates a tabbed interface.

### TabsOptions

```ts
interface TabsOptions {
  tabs: Tab[];                       // Tab definitions
  activeTab?: string;                // Initial active tab id
  onChange?: (tabId: string) => void;  // Tab change callback
}

interface Tab {
  id: string;
  label: string;
  content: HTMLElement | string;
}
```

### TabsResult

```ts
interface TabsResult {
  container: HTMLElement;       // Tabs container
  setActiveTab: (tabId: string) => void;
  getActiveTab: () => string | null;
}
```

### CSS Classes

| Class              | Description          |
|--------------------|----------------------|
| `.osx-tabs`        | Container            |
| `.osx-tabs-nav`    | Tab buttons container |
| `.osx-tabs-tab`    | Tab button           |
| `.osx-tabs-tab.active` | Active tab      |
| `.osx-tabs-content` | Content container  |
| `.osx-tabs-panel`  | Tab panel            |

### Examples

```js
const tabs = createTabs({
  tabs: [
    { id: 'home', label: 'Home', content: '<p>Welcome!</p>' },
    { id: 'profile', label: 'Profile', content: '<p>Your profile</p>' },
    { id: 'settings', label: 'Settings', content: '<p>Settings here</p>' },
  ],
  onChange: (id) => console.log('Active tab:', id),
});

document.body.appendChild(tabs.container);
```

---

## createAccordion

```ts
createAccordion(opts: AccordionOptions): AccordionResult
```

Creates an accordion (collapsible sections).

### AccordionOptions

```ts
interface AccordionOptions {
  items: AccordionItem[];              // Accordion items
  allowMultiple?: boolean;              // Allow multiple open
}

interface AccordionItem {
  id: string;
  title: string;
  content: HTMLElement | string;
}
```

### AccordionResult

```ts
interface AccordionResult {
  container: HTMLElement;       // Accordion container
  open: (id: string) => void;       // Open item
  close: (id: string) => void;       // Close item
  toggle: (id: string) => void;      // Toggle item
}
```

### CSS Classes

| Class                      | Description          |
|----------------------------|----------------------|
| `.osx-accordion`          | Container            |
| `.osx-accordion-item`     | Single item          |
| `.osx-accordion-header`   | Clickable header     |
| `.osx-accordion-icon`     | Expand/collapse icon |
| `.osx-accordion-content` | Collapsible content  |

### Examples

```js
const accordion = createAccordion({
  items: [
    { id: 'faq1', title: 'What is OSX UI?', content: '<p>It is a UI framework...</p>' },
    { id: 'faq2', title: 'How to install?', content: '<p>npm install osx-ui</p>' },
    { id: 'faq3', title: 'Is it free?', content: '<p>Yes, MIT license!</p>' },
  ],
  allowMultiple: true,
});

document.body.appendChild(accordion.container);
```

---

## createProgress

```ts
createProgress(opts?: ProgressOptions): ProgressResult
```

Creates a progress bar.

### ProgressOptions

```ts
interface ProgressOptions {
  value?: number;             // Current value (0-100)
  max?: number;              // Maximum value (default: 100)
  showValue?: boolean;       // Show percentage label
  variant?: 'default' | 'success' | 'warning' | 'danger';
}
```

### ProgressResult

```ts
interface ProgressResult {
  container: HTMLElement;       // Progress container
  setValue: (value: number) => void;
  getValue: () => number;
}
```

### CSS Classes

| Class                  | Description          |
|------------------------|----------------------|
| `.osx-progress`        | Container            |
| `.osx-progress-track`  | Background track     |
| `.osx-progress-bar`   | Progress fill        |
| `.osx-progress-label` | Percentage label     |
| `.osx-progress.success` | Success variant    |
| `.osx-progress.warning` | Warning variant    |
| `.osx-progress.danger`  | Danger variant      |

### Examples

```js
const progress = createProgress({
  value: 60,
  showValue: true,
  variant: 'success',
});

document.body.appendChild(progress.container);

// Update progress
progress.setValue(80);
```

---

## createSpinner

```ts
createSpinner(opts?: SpinnerOptions): SpinnerResult
```

Creates a loading spinner.

### SpinnerOptions

```ts
interface SpinnerOptions {
  size?: 'small' | 'medium' | 'large';
}
```

### SpinnerResult

```ts
interface SpinnerResult {
  container: HTMLElement;       // Spinner element
}
```

### CSS Classes

| Class          | Description          |
|----------------|----------------------|
| `.osx-spinner` | Spinner element      |
| `.osx-spinner.small` | Small size     |
| `.osx-spinner.large` | Large size     |

### Examples

```js
const spinner = createSpinner({ size: 'large' });
document.body.appendChild(spinner.container);
```

---

## createBadge

```ts
createBadge(opts?: BadgeOptions): BadgeResult
```

Creates a badge/counter element.

### BadgeOptions

```ts
interface BadgeOptions {
  value?: number | string;    // Badge value
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  max?: number;               // Max value before showing "+"
}
```

### BadgeResult

```ts
interface BadgeResult {
  container: HTMLElement;       // Badge element
  setValue: (value: number | string) => void;
  getValue: () => number | string;
}
```

### CSS Classes

| Class              | Description          |
|--------------------|----------------------|
| `.osx-badge`       | Badge element        |
| `.osx-badge.primary` | Primary variant    |
| `.osx-badge.success` | Success variant   |
| `.osx-badge.warning` | Warning variant   |
| `.osx-badge.danger`  | Danger variant    |

### Examples

```js
const badge = createBadge({ value: 5 });
document.body.appendChild(badge.container);

badge.setValue(42);
badge.setValue(100); // Shows "99+" if max is 99
```

---

## createAvatar

```ts
createAvatar(opts?: AvatarOptions): AvatarResult
```

Creates a user avatar image or initials.

### AvatarOptions

```ts
interface AvatarOptions {
  src?: string;           // Image URL
  alt?: string;          // Alt text
  size?: 'small' | 'medium' | 'large';
  fallback?: string;     // Fallback initials (e.g., "John Doe")
}
```

### AvatarResult

```ts
interface AvatarResult {
  container: HTMLElement;       // Avatar element
  setSrc: (src: string) => void;   // Change image source
}
```

### CSS Classes

| Class              | Description          |
|--------------------|----------------------|
| `.osx-avatar`      | Avatar container     |
| `.osx-avatar.small`| Small size           |
| `.osx-avatar.large`| Large size          |

### Examples

```js
// From image
const avatar = createAvatar({
  src: 'https://example.com/photo.jpg',
  alt: 'User photo',
});

document.body.appendChild(avatar.container);

// With initials
const initials = createAvatar({
  fallback: 'John Doe',  // Shows "JD"
  size: 'large',
});

document.body.appendChild(initials.container);
```

---

## createTooltip

```ts
createTooltip(target: HTMLElement, opts: TooltipOptions): TooltipResult
```

Creates a tooltip that appears on hover over a target element.

### TooltipOptions

```ts
interface TooltipOptions {
  content: string;                 // Tooltip text
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;                 // Show delay in ms (default: 300)
}
```

### TooltipResult

```ts
interface TooltipResult {
  container: HTMLElement;       // Target element
  tooltip: HTMLElement;        // Tooltip element
  show: () => void;
  hide: () => void;
  destroy: () => void;
}
```

### CSS Classes

| Class              | Description          |
|--------------------|----------------------|
| `.osx-tooltip`     | Tooltip element      |
| `.osx-tooltip-top` | Positioned top      |
| `.osx-tooltip-bottom`| Positioned bottom |
| `.osx-tooltip-left` | Positioned left    |
| `.osx-tooltip-right`| Positioned right   |

### Examples

```js
const button = createButton({ label: 'Hover me' });
document.body.appendChild(button);

const tooltip = createTooltip(button, {
  content: 'This is a tooltip!',
  position: 'top',
  delay: 200,
});
```

---

## createSidebar

```ts
createSidebar(opts: SidebarOptions): SidebarResult
```

Creates a collapsible sidebar navigation.

### SidebarOptions

```ts
interface SidebarOptions {
  items: SidebarItem[];              // Sidebar items
  width?: number;                    // Expanded width (default: 240)
  collapsible?: boolean;             // Allow collapse (default: true)
  onChange?: (itemId: string) => void;  // Item click callback
}

interface SidebarItem {
  id: string;
  icon?: string;           // SVG HTML string
  label: string;
  badge?: number;         // Optional badge count
  action?: () => void;    // Click action
}
```

### SidebarResult

```ts
interface SidebarResult {
  container: HTMLElement;       // Sidebar element
  collapse: () => void;
  expand: () => void;
  toggle: () => void;
}
```

### CSS Classes

| Class                  | Description          |
|------------------------|----------------------|
| `.osx-sidebar`        | Sidebar container    |
| `.osx-sidebar.collapsed`| Collapsed state    |
| `.osx-sidebar-header` | Header with toggle  |
| `.osx-sidebar-toggle` | Toggle button       |
| `.osx-sidebar-nav`    | Navigation items     |
| `.osx-sidebar-item`  | Navigation item      |
| `.osx-sidebar-item.active` | Active item    |
| `.osx-sidebar-item-badge` | Badge indicator |

### Examples

```js
const sidebar = createSidebar({
  width: 240,
  items: [
    { id: 'home', label: 'Home', icon: '<svg>...</svg>' },
    { id: 'settings', label: 'Settings', badge: 3 },
  ],
  onChange: (id) => console.log('Clicked:', id),
});

document.body.appendChild(sidebar.container);
```

---

## createContextMenu

```ts
createContextMenu(opts: ContextMenuOptions): ContextMenuResult
```

Creates a right-click context menu.

### ContextMenuOptions

```ts
interface ContextMenuOptions {
  items: ContextMenuItem[];        // Menu items
}

interface ContextMenuItem {
  id: string;
  label?: string;
  icon?: string;          // SVG HTML string
  separator?: boolean;    // Is separator line
  disabled?: boolean;     // Disabled item
  action?: () => void;   // Click action
}
```

### ContextMenuResult

```ts
interface ContextMenuResult {
  menu: HTMLElement;            // Menu element
  show: (x: number, y: number) => void;  // Show at position
  hide: () => void;
  destroy: () => void;
}
```

### CSS Classes

| Class                        | Description          |
|------------------------------|----------------------|
| `.osx-contextmenu`           | Menu container       |
| `.osx-contextmenu-item`      | Menu item            |
| `.osx-contextmenu-item.disabled` | Disabled item    |
| `.osx-contextmenu-icon`      | Item icon            |
| `.osx-contextmenu-separator` | Separator line       |

### Examples

```js
const contextMenu = createContextMenu({
  items: [
    { id: 'copy', label: 'Copy', icon: '<svg>...</svg>' },
    { id: 'paste', label: 'Paste' },
    { id: 'sep', separator: true },
    { id: 'delete', label: 'Delete', disabled: true },
  ],
});

document.body.appendChild(contextMenu.menu);

// Show on right-click
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  contextMenu.show(e.clientX, e.clientY);
});
```

---

## createDropdown

```ts
createDropdown(opts: DropdownOptions): DropdownResult
```

Creates a dropdown menu attached to a trigger element.

### DropdownOptions

```ts
interface DropdownOptions {
  trigger: HTMLElement;       // Element that triggers the dropdown
  items: DropdownItem[];      // Menu items
}

interface DropdownItem {
  id: string;
  label?: string;
  icon?: string;
  separator?: boolean;
  disabled?: boolean;
  action?: () => void;
}
```

### DropdownResult

```ts
interface DropdownResult {
  container: HTMLElement;       // Dropdown element
  show: () => void;
  hide: () => void;
  toggle: () => void;
}
```

### CSS Classes

| Class                    | Description          |
|--------------------------|----------------------|
| `.osx-dropdown`          | Dropdown container   |
| `.osx-dropdown-item`    | Menu item            |
| `.osx-dropdown-icon`    | Item icon            |
| `.osx-dropdown-separator`| Separator line     |

### Examples

```js
const trigger = createButton({ label: 'Menu' });
document.body.appendChild(trigger);

const dropdown = createDropdown({
  trigger,
  items: [
    { id: 'new', label: 'New File' },
    { id: 'open', label: 'Open' },
    { id: 'sep', separator: true },
    { id: 'settings', label: 'Settings' },
  ],
});
```

---

## createPopover

```ts
createPopover(opts: PopoverOptions): PopoverResult
```

Creates a positionable popover attached to a trigger element.

### PopoverOptions

```ts
interface PopoverOptions {
  trigger: HTMLElement;         // Element that triggers the popover
  content: HTMLElement | string;  // Popover content
  position?: 'top' | 'bottom' | 'left' | 'right';
  onShow?: () => void;
  onHide?: () => void;
}
```

### PopoverResult

```ts
interface PopoverResult {
  container: HTMLElement;       // Popover element
  show: () => void;
  hide: () => void;
  toggle: () => void;
  destroy: () => void;
}
```

### CSS Classes

| Class              | Description          |
|--------------------|----------------------|
| `.osx-popover`     | Popover container    |
| `.osx-popover-top` | Positioned top      |
| `.osx-popover-bottom`| Positioned bottom |
| `.osx-popover-left` | Positioned left    |
| `.osx-popover-right`| Positioned right   |

### Examples

```js
const trigger = createButton({ label: 'Show Popover' });
document.body.appendChild(trigger);

const popover = createPopover({
  trigger,
  content: '<p>This is a popover!</p>',
  position: 'bottom',
});

trigger.addEventListener('click', () => popover.toggle());
```

---

## createList

```ts
createList(opts: ListOptions): ListResult
```

Creates a list component with clickable items.

### ListOptions

```ts
interface ListOptions {
  items: ListItem[];                    // List items
  onItemClick?: (item: ListItem) => void;  // Click callback
}

interface ListItem {
  id: string;
  label: string;
  icon?: string;           // SVG HTML string
  action?: () => void;
}
```

### ListResult

```ts
interface ListResult {
  container: HTMLElement;       // List element
  setItems: (items: ListItem[]) => void;
  getItems: () => ListItem[];
}
```

### CSS Classes

| Class                  | Description          |
|------------------------|----------------------|
| `.osx-list`           | List container       |
| `.osx-list-item`      | List item            |
| `.osx-list-item-icon` | Item icon            |
| `.osx-list-item-label`| Item label           |

### Examples

```js
const list = createList({
  items: [
    { id: '1', label: 'Dashboard', icon: '<svg>...</svg>' },
    { id: '2', label: 'Analytics' },
    { id: '3', label: 'Settings' },
  ],
  onItemClick: (item) => console.log('Clicked:', item.label),
});

document.body.appendChild(list.container);
```

---

## createTree

```ts
createTree(opts: TreeOptions): TreeResult
```

Creates a hierarchical tree view.

### TreeOptions

```ts
interface TreeOptions {
  data: TreeNode[];                    // Tree data
  onNodeClick?: (node: TreeNode) => void;  // Node click callback
}

interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNode[];
  expanded?: boolean;
}
```

### TreeResult

```ts
interface TreeResult {
  container: HTMLElement;       // Tree element
}
```

### CSS Classes

| Class                  | Description          |
|------------------------|----------------------|
| `.osx-tree`           | Tree container       |
| `.osx-tree-node`      | Tree node            |
| `.osx-tree-row`      | Node row (clickable)|
| `.osx-tree-toggle`   | Expand/collapse icon|
| `.osx-tree-toggle.expanded` | Expanded state |
| `.osx-tree-icon`     | Node icon            |
| `.osx-tree-label`    | Node label           |
| `.osx-tree-children` | Children container   |

### Examples

```js
const tree = createTree({
  data: [
    {
      id: 'docs',
      label: 'Documents',
      expanded: true,
      children: [
        { id: 'work', label: 'Work' },
        { id: 'personal', label: 'Personal' },
      ],
    },
    {
      id: 'images',
      label: 'Images',
      children: [
        { id: 'photos', label: 'Photos' },
        { id: 'screenshots', label: 'Screenshots' },
      ],
    },
  ],
  onNodeClick: (node) => console.log('Selected:', node.label),
});

document.body.appendChild(tree.container);
```

---

## createToast

```ts
createToast(opts: ToastOptions): ToastResult
```

Creates a toast notification. Toast is appended to body and auto-dismisses.

### ToastOptions

```ts
interface ToastOptions {
  message: string;                    // Toast message
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;                  // Display duration ms (default: 4000, 0 = persist)
}
```

### ToastResult

```ts
interface ToastResult {
  toast: HTMLElement;       // Toast element
  close: () => void;        // Close manually
}
```

### CSS Classes

| Class                  | Description          |
|------------------------|----------------------|
| `.osx-toast-container` | Container (fixed)    |
| `.osx-toast`           | Toast element        |
| `.osx-toast-info`      | Info variant         |
| `.osx-toast-success`   | Success variant      |
| `.osx-toast-warning`   | Warning variant      |
| `.osx-toast-error`     | Error variant        |
| `.osx-toast-icon`      | Toast icon           |
| `.osx-toast-message`   | Message text         |
| `.osx-toast-close`     | Close button         |

### Examples

```js
// Info toast
createToast({ message: 'Operation started', type: 'info' });

// Success toast
createToast({ message: 'Saved successfully!', type: 'success' });

// Warning toast
createToast({ message: 'Please review your input', type: 'warning' });

// Error toast
createToast({ message: 'Something went wrong', type: 'error' });

// Persistent toast (no auto-dismiss)
const toast = createToast({ message: 'Processing...', duration: 0 });
toast.close();  // Manual close
```
