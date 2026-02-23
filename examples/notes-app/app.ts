import { createApp, createButton, createField, escapeHtml } from '../../src/index.js';

interface Note {
  id: number;
  title: string;
  content: string;
  updatedAt: Date;
}

let noteIdCounter = 0;
const notes: Note[] = [
  { id: ++noteIdCounter, title: 'Welcome', content: 'Welcome to the Notes app!\n\nThis is built with OSX_UI.', updatedAt: new Date() },
  { id: ++noteIdCounter, title: 'Shopping List', content: 'Milk\nBread\nEggs\nCoffee', updatedAt: new Date() },
];

const app = createApp({
  container: document.getElementById('app')!,
  appName: 'Notes',
  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>',
  theme: 'dark',
  showClock: true,
  background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
  menus: [
    {
      id: 'file', label: 'File',
      items: [
        { label: 'New Note', action: () => openEditor(), shortcut: '⌘N' },
        { type: 'separator' },
        { label: 'Close Window', action: () => app.wm.focusedId && app.wm.closeWindow(app.wm.focusedId), shortcut: '⌘W' },
      ],
    },
    {
      id: 'window', label: 'Window',
      dynamic: true,
      items: [],
      onOpen: () => {
        const cfg = app.menuBar.getMenuConfig('window');
        if (!cfg) return;
        cfg.items = [];
        const wins = app.wm.getAllWindows();
        if (wins.size === 0) { cfg.items.push({ label: 'No windows open', disabled: true }); return; }
        for (const [id, win] of wins) {
          cfg.items.push({
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
    { pattern: /^\/$/, handler: () => openNotesList() },
  ],
});

function openNotesList() {
  const id = 'win-notes-list';
  if (app.wm.getWindow(id)) { app.wm.focusWindow(id); return; }
  const pos = app.centerPos(400, 500);

  const content = document.createElement('div');
  renderNotesList(content);

  app.wm.createWindow({
    id,
    title: 'All Notes',
    content,
    x: pos.x, y: pos.y, width: 400, height: 500,
    minW: 300, minH: 350,
  });
}

function renderNotesList(container: HTMLElement) {
  container.innerHTML = '';

  const toolbar = document.createElement('div');
  toolbar.style.cssText = 'padding: 10px 14px; border-bottom: 1px solid rgba(148,163,184,.12); display: flex; justify-content: space-between; align-items: center;';
  toolbar.innerHTML = `<span style="font-size: 13px; color: var(--osx-muted);">${notes.length} notes</span>`;
  const newBtn = createButton({ label: '+ New', variant: 'primary', onClick: () => openEditor() });
  toolbar.appendChild(newBtn);
  container.appendChild(toolbar);

  const list = document.createElement('div');
  for (const note of notes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())) {
    const item = document.createElement('div');
    item.className = 'note-item';
    item.innerHTML = `
      <div class="note-title">${escapeHtml(note.title)}</div>
      <div class="note-preview">${escapeHtml(note.content.split('\n')[0])}</div>
      <div class="note-date">${note.updatedAt.toLocaleString()}</div>
    `;
    item.addEventListener('click', () => openEditor(note));
    list.appendChild(item);
  }
  container.appendChild(list);
}

function openEditor(note?: Note) {
  const isNew = !note;
  const noteId = note?.id || ++noteIdCounter;
  const winId = `win-note-${noteId}`;

  if (app.wm.getWindow(winId)) { app.wm.focusWindow(winId); return; }

  const pos = app.centerPos(550, 450);

  const content = document.createElement('div');
  content.style.padding = '14px';

  const titleField = createField({ label: 'Title', name: 'title', value: note?.title || '', placeholder: 'Note title...' });
  content.appendChild(titleField.container);

  const textLabel = document.createElement('label');
  textLabel.textContent = 'Content';
  textLabel.style.cssText = 'font-size: 12px; color: var(--osx-muted); display: block; margin-bottom: 6px;';
  content.appendChild(textLabel);

  const textarea = document.createElement('textarea');
  textarea.className = 'editor-area';
  textarea.value = note?.content || '';
  textarea.placeholder = 'Write your note...';
  content.appendChild(textarea);

  const actions = document.createElement('div');
  actions.style.cssText = 'display: flex; gap: 8px; margin-top: 12px;';

  const saveBtn = createButton({ label: 'Save', variant: 'primary', onClick: () => {
    const title = (titleField.input as HTMLInputElement).value.trim() || 'Untitled';
    const body = textarea.value;
    if (isNew) {
      notes.push({ id: noteId, title, content: body, updatedAt: new Date() });
    } else {
      const existing = notes.find(n => n.id === noteId);
      if (existing) {
        existing.title = title;
        existing.content = body;
        existing.updatedAt = new Date();
      }
    }
    // Refresh list if open
    const listWin = app.wm.getWindow('win-notes-list');
    if (listWin) {
      const listContent = listWin.el.querySelector('.osx-content')!;
      renderNotesList(listContent as HTMLElement);
    }
    app.wm.closeWindow(winId);
  }});
  actions.appendChild(saveBtn);

  if (!isNew) {
    const delBtn = createButton({ label: 'Delete', variant: 'danger', onClick: () => {
      const idx = notes.findIndex(n => n.id === noteId);
      if (idx !== -1) notes.splice(idx, 1);
      const listWin = app.wm.getWindow('win-notes-list');
      if (listWin) {
        const listContent = listWin.el.querySelector('.osx-content')!;
        renderNotesList(listContent as HTMLElement);
      }
      app.wm.closeWindow(winId);
    }});
    actions.appendChild(delBtn);
  }
  content.appendChild(actions);

  app.wm.createWindow({
    id: winId,
    title: isNew ? 'New Note' : `Edit — ${note!.title}`,
    content,
    x: pos.x + 40, y: pos.y + 20,
    width: 550, height: 450,
    minW: 400, minH: 350,
  });
}

app.router.start();
