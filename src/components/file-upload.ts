export interface FileUploadOptions {
  accept?: string;
  multiple?: boolean;
  onChange?: (files: File[]) => void;
}

export interface FileUploadResult {
  container: HTMLElement;
  input: HTMLInputElement;
  getFiles: () => File[];
}

export function createFileUpload(opts: FileUploadOptions = {}): FileUploadResult {
  const container = document.createElement('div');
  container.className = 'osx-fileupload';

  const input = document.createElement('input');
  input.type = 'file';
  input.className = 'osx-fileupload-input';

  if (opts.accept) input.accept = opts.accept;
  if (opts.multiple) input.multiple = true;

  const dropzone = document.createElement('div');
  dropzone.className = 'osx-fileupload-dropzone';

  const icon = document.createElement('div');
  icon.className = 'osx-fileupload-icon';
  icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>';

  const text = document.createElement('div');
  text.className = 'osx-fileupload-text';
  text.textContent = 'Drag & drop files here or click to browse';

  const fileList = document.createElement('div');
  fileList.className = 'osx-fileupload-list';

  let files: File[] = [];

  function renderFiles() {
    fileList.innerHTML = '';
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const item = document.createElement('div');
      item.className = 'osx-fileupload-item';

      const name = document.createElement('span');
      name.className = 'osx-fileupload-item-name';
      name.textContent = file.name;

      const remove = document.createElement('button');
      remove.className = 'osx-fileupload-item-remove';
      remove.innerHTML = '&times;';
      remove.addEventListener('click', (e) => {
        e.stopPropagation();
        files.splice(i, 1);
        renderFiles();
        if (opts.onChange) opts.onChange(files);
      });

      item.appendChild(name);
      item.appendChild(remove);
      fileList.appendChild(item);
    }
  }

  dropzone.addEventListener('click', () => input.click());

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer?.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      if (opts.multiple) {
        files = [...files, ...newFiles];
      } else {
        files = newFiles.slice(0, 1);
      }
      renderFiles();
      if (opts.onChange) opts.onChange(files);
    }
  });

  input.addEventListener('change', () => {
    if (input.files) {
      const newFiles = Array.from(input.files);
      if (opts.multiple) {
        files = [...files, ...newFiles];
      } else {
        files = newFiles.slice(0, 1);
      }
      renderFiles();
      if (opts.onChange) opts.onChange(files);
    }
  });

  dropzone.appendChild(icon);
  dropzone.appendChild(text);
  container.appendChild(dropzone);
  container.appendChild(fileList);

  return {
    container,
    input,
    getFiles() {
      return files;
    },
  };
}
