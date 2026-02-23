export type FieldType = 'text' | 'email' | 'number' | 'password' | 'select' | 'textarea';

export interface FieldOptions {
  label: string;
  name: string;
  type?: FieldType;
  placeholder?: string;
  value?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export interface FieldResult {
  container: HTMLElement;
  input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  setInvalid: (invalid: boolean) => void;
}

export function createField(opts: FieldOptions): FieldResult {
  const container = document.createElement('div');
  container.className = 'osx-field';

  const label = document.createElement('label');
  label.textContent = opts.label;
  container.appendChild(label);

  let input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

  if (opts.type === 'select' && opts.options) {
    const select = document.createElement('select');
    select.name = opts.name;
    if (opts.required) select.required = true;
    for (const opt of opts.options) {
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.label;
      if (opts.value === opt.value) option.selected = true;
      select.appendChild(option);
    }
    input = select;
  } else if (opts.type === 'textarea') {
    const textarea = document.createElement('textarea');
    textarea.name = opts.name;
    if (opts.placeholder) textarea.placeholder = opts.placeholder;
    if (opts.value) textarea.value = opts.value;
    if (opts.required) textarea.required = true;
    input = textarea;
  } else {
    const inp = document.createElement('input');
    inp.type = opts.type || 'text';
    inp.name = opts.name;
    if (opts.placeholder) inp.placeholder = opts.placeholder;
    if (opts.value) inp.value = opts.value;
    if (opts.required) inp.required = true;
    input = inp;
  }

  container.appendChild(input);

  return {
    container,
    input,
    setInvalid(invalid: boolean) {
      input.classList.toggle('invalid', invalid);
    },
  };
}
