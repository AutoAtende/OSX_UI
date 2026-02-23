export interface ModalOptions {
  content: string | HTMLElement;
  onClose?: () => void;
  closeOnBackdrop?: boolean;
}

export interface ModalResult {
  backdrop: HTMLElement;
  modal: HTMLElement;
  close: () => void;
}

export function createModal(opts: ModalOptions): ModalResult {
  const backdrop = document.createElement('div');
  backdrop.className = 'osx-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'osx-modal';

  if (typeof opts.content === 'string') {
    modal.innerHTML = opts.content;
  } else {
    modal.appendChild(opts.content);
  }

  backdrop.appendChild(modal);

  const close = () => {
    backdrop.remove();
    if (opts.onClose) opts.onClose();
  };

  if (opts.closeOnBackdrop !== false) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });
  }

  document.body.appendChild(backdrop);

  return { backdrop, modal, close };
}
