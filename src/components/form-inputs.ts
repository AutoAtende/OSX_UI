export interface CheckboxOptions {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export interface CheckboxResult {
  container: HTMLElement;
  input: HTMLInputElement;
  setChecked: (checked: boolean) => void;
  getChecked: () => boolean;
}

export function createCheckbox(opts: CheckboxOptions = {}): CheckboxResult {
  const container = document.createElement('label');
  container.className = 'osx-checkbox';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.className = 'osx-checkbox-input';

  const checkmark = document.createElement('span');
  checkmark.className = 'osx-checkbox-mark';

  if (opts.checked) input.checked = true;
  if (opts.disabled) {
    input.disabled = true;
    container.classList.add('disabled');
  }

  input.addEventListener('change', () => {
    if (opts.onChange) opts.onChange(input.checked);
  });

  container.appendChild(input);
  container.appendChild(checkmark);

  if (opts.label) {
    const labelText = document.createElement('span');
    labelText.className = 'osx-checkbox-label';
    labelText.textContent = opts.label;
    container.appendChild(labelText);
  }

  return {
    container,
    input,
    setChecked(checked: boolean) {
      input.checked = checked;
    },
    getChecked() {
      return input.checked;
    },
  };
}

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupOptions {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export interface RadioGroupResult {
  container: HTMLElement;
  setValue: (value: string) => void;
  getValue: () => string | null;
}

export function createRadioGroup(opts: RadioGroupOptions): RadioGroupResult {
  const container = document.createElement('div');
  container.className = 'osx-radio-group';

  const inputs: HTMLInputElement[] = [];

  for (const option of opts.options) {
    const item = document.createElement('label');
    item.className = 'osx-radio';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = opts.name;
    input.value = option.value;
    input.className = 'osx-radio-input';

    if (option.value === opts.value) input.checked = true;
    if (option.disabled) {
      input.disabled = true;
      item.classList.add('disabled');
    }

    const mark = document.createElement('span');
    mark.className = 'osx-radio-mark';

    const labelText = document.createElement('span');
    labelText.className = 'osx-radio-label';
    labelText.textContent = option.label;

    input.addEventListener('change', () => {
      if (opts.onChange) opts.onChange(option.value);
    });

    item.appendChild(input);
    item.appendChild(mark);
    item.appendChild(labelText);
    container.appendChild(item);
    inputs.push(input);
  }

  return {
    container,
    setValue(value: string) {
      for (const input of inputs) {
        input.checked = input.value === value;
      }
    },
    getValue() {
      for (const input of inputs) {
        if (input.checked) return input.value;
      }
      return null;
    },
  };
}

export interface ToggleOptions {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export interface ToggleResult {
  container: HTMLElement;
  input: HTMLInputElement;
  setChecked: (checked: boolean) => void;
  getChecked: () => boolean;
}

export function createToggle(opts: ToggleOptions = {}): ToggleResult {
  const container = document.createElement('label');
  container.className = 'osx-toggle';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.className = 'osx-toggle-input';

  const track = document.createElement('span');
  track.className = 'osx-toggle-track';

  const thumb = document.createElement('span');
  thumb.className = 'osx-toggle-thumb';

  if (opts.checked) input.checked = true;
  if (opts.disabled) {
    input.disabled = true;
    container.classList.add('disabled');
  }

  input.addEventListener('change', () => {
    if (opts.onChange) opts.onChange(input.checked);
  });

  track.appendChild(thumb);
  container.appendChild(input);
  container.appendChild(track);

  if (opts.label) {
    const labelText = document.createElement('span');
    labelText.className = 'osx-toggle-label';
    labelText.textContent = opts.label;
    container.appendChild(labelText);
  }

  return {
    container,
    input,
    setChecked(checked: boolean) {
      input.checked = checked;
    },
    getChecked() {
      return input.checked;
    },
  };
}
