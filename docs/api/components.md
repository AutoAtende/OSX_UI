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
