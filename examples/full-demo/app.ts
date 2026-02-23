import {
  createApp,
  createButton,
  createCard,
  createPill,
  createDot,
  createField,
  createPasswordField,
  createModal,
  createToolbar,
  escapeHtml,
} from '../../src/index.js';

const app = createApp({
  container: document.getElementById('app')!,
  appName: 'Component Showcase',
  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>',
  theme: 'dark',
  showClock: true,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  menus: [
    {
      id: 'demos', label: 'Demos',
      items: [
        { label: 'Buttons', action: () => openButtonsDemo() },
        { label: 'Cards', action: () => openCardsDemo() },
        { label: 'Forms', action: () => openFormsDemo() },
        { label: 'Modal', action: () => openModalDemo() },
        { type: 'separator' },
        { label: 'All Components', action: () => openAllDemo() },
      ],
    },
    {
      id: 'theme', label: 'Theme',
      items: [
        { label: 'Dark', action: () => app.theme.setTheme('dark') },
        { label: 'Light', action: () => app.theme.setTheme('light') },
      ],
    },
    {
      id: 'window', label: 'Window',
      dynamic: true,
      items: [],
      onOpen: () => {
        const menuCfg = app.menuBar.getMenuConfig('window');
        if (!menuCfg) return;
        menuCfg.items = [];
        const windows = app.wm.getAllWindows();
        if (windows.size === 0) {
          menuCfg.items.push({ label: 'No windows open', disabled: true });
          return;
        }
        for (const [id, win] of windows) {
          menuCfg.items.push({
            label: win.title,
            checked: id === app.wm.focusedId,
            action: () => {
              if (win.el.style.display === 'none') app.wm.restoreWindow(id);
              else app.wm.focusWindow(id);
            },
          });
        }
      },
    },
  ],
  routes: [
    { pattern: /^\/$/, handler: () => openAllDemo() },
  ],
});

function openButtonsDemo() {
  const id = 'win-buttons';
  if (app.wm.getWindow(id)) { app.wm.focusWindow(id); return; }
  const pos = app.centerPos(500, 400);

  const content = document.createElement('div');
  content.style.padding = '16px';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.gap = '12px';

  const row1 = document.createElement('div');
  row1.style.display = 'flex';
  row1.style.gap = '8px';
  row1.style.flexWrap = 'wrap';
  row1.appendChild(createButton({ label: 'Default' }));
  row1.appendChild(createButton({ label: 'Primary', variant: 'primary' }));
  row1.appendChild(createButton({ label: 'Danger', variant: 'danger' }));
  row1.appendChild(createButton({ label: 'Ghost', variant: 'ghost' }));
  content.appendChild(row1);

  const row2 = document.createElement('div');
  row2.style.display = 'flex';
  row2.style.gap = '8px';
  row2.appendChild(createButton({ variant: 'status', statusColor: 'ok', icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2"/></svg>', title: 'OK' }));
  row2.appendChild(createButton({ variant: 'status', statusColor: 'danger', icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/></svg>', title: 'Danger' }));
  row2.appendChild(createButton({ variant: 'status', statusColor: 'purple', icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2"/></svg>', title: 'Purple' }));
  row2.appendChild(createButton({ variant: 'status', statusColor: 'muted', icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2"/></svg>', title: 'Muted' }));
  content.appendChild(row2);

  app.wm.createWindow({ id, title: 'Buttons', content, x: pos.x, y: pos.y, width: 500, height: 400 });
}

function openCardsDemo() {
  const id = 'win-cards';
  if (app.wm.getWindow(id)) { app.wm.focusWindow(id); return; }
  const pos = app.centerPos(500, 400);

  const content = document.createElement('div');
  content.style.padding = '16px';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.gap = '12px';

  content.appendChild(createCard({ header: '<strong>Card Title</strong>', body: '<p>Card content goes here.</p>' }));

  const pillRow = document.createElement('div');
  pillRow.style.display = 'flex';
  pillRow.style.gap = '8px';
  pillRow.style.flexWrap = 'wrap';
  pillRow.appendChild(createPill({ text: 'Available', dot: 'ok' }));
  pillRow.appendChild(createPill({ text: 'Occupied', dot: 'danger' }));
  pillRow.appendChild(createPill({ text: 'Reserved', dot: 'purple' }));
  pillRow.appendChild(createPill({ text: 'Disabled', dot: 'muted' }));
  content.appendChild(pillRow);

  app.wm.createWindow({ id, title: 'Cards & Pills', content, x: pos.x, y: pos.y, width: 500, height: 400 });
}

function openFormsDemo() {
  const id = 'win-forms';
  if (app.wm.getWindow(id)) { app.wm.focusWindow(id); return; }
  const pos = app.centerPos(480, 500);

  const content = document.createElement('div');
  content.style.padding = '16px';

  const nameField = createField({ label: 'Name', name: 'name', placeholder: 'Your name...' });
  content.appendChild(nameField.container);

  const emailField = createField({ label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' });
  content.appendChild(emailField.container);

  const pw = createPasswordField({ label: 'Password', name: 'password', placeholder: 'Enter password...' });
  content.appendChild(pw.container);

  const selectField = createField({
    label: 'Role', name: 'role', type: 'select',
    options: [
      { value: 'user', label: 'User' },
      { value: 'admin', label: 'Admin' },
      { value: 'editor', label: 'Editor' },
    ],
  });
  content.appendChild(selectField.container);

  const notesField = createField({ label: 'Notes', name: 'notes', type: 'textarea', placeholder: 'Optional notes...' });
  content.appendChild(notesField.container);

  const submitBtn = createButton({ label: 'Submit', variant: 'primary', onClick: () => {
    alert('Form submitted! (demo)');
  }});
  content.appendChild(submitBtn);

  app.wm.createWindow({ id, title: 'Form Fields', content, x: pos.x, y: pos.y, width: 480, height: 500, minH: 400 });
}

function openModalDemo() {
  const modalContent = document.createElement('div');
  modalContent.innerHTML = `
    <h3 style="margin: 0 0 12px; color: var(--osx-text);">Modal Dialog</h3>
    <p style="color: var(--osx-muted); margin-bottom: 16px;">This is a modal overlay with backdrop blur.</p>
  `;
  const closeBtn = createButton({ label: 'Close Modal', variant: 'primary' });
  modalContent.appendChild(closeBtn);

  const { close } = createModal({ content: modalContent, closeOnBackdrop: true });
  closeBtn.addEventListener('click', close);
}

function openAllDemo() {
  const id = 'win-all';
  if (app.wm.getWindow(id)) { app.wm.focusWindow(id); return; }
  const pos = app.centerPos(600, 450);

  const content = document.createElement('div');
  content.style.padding = '20px';
  content.innerHTML = `
    <h2 style="margin: 0 0 16px; font-size: 20px; color: var(--osx-text);">OSX_UI Component Showcase</h2>
    <p style="color: var(--osx-muted); margin-bottom: 16px; font-size: 14px;">
      Open individual demos from the <strong>Demos</strong> menu above,
      or switch themes from the <strong>Theme</strong> menu.
    </p>
    <p style="color: var(--osx-muted); font-size: 14px;">
      Features: Window Manager with drag/resize/minimize/maximize,
      Menu Bar with dropdowns, Client-side Router, Dark/Light Themes,
      and a complete component library.
    </p>
  `;

  const toolbar = createToolbar([
    createButton({ label: 'Buttons', onClick: () => openButtonsDemo() }),
    createButton({ label: 'Cards', onClick: () => openCardsDemo() }),
    createButton({ label: 'Forms', onClick: () => openFormsDemo() }),
    createButton({ label: 'Modal', onClick: () => openModalDemo() }),
  ]);

  const wrapper = document.createElement('div');
  wrapper.appendChild(toolbar);
  wrapper.appendChild(content);

  app.wm.createWindow({ id, title: 'Component Showcase', content: wrapper, x: pos.x, y: pos.y, width: 600, height: 450 });
}

app.router.start();
