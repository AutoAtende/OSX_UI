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
  createCalendar,
  createDateRangePicker,
  createCheckbox,
  createRadioGroup,
  createToggle,
  createAutocomplete,
  createFileUpload,
  createColorPicker,
  createTabs,
  createToast,
  createTable,
  createAccordion,
  createProgress,
  createSpinner,
  createBadge,
  createAvatar,
  createTooltip,
  createSidebar,
  createList,
  createTree,
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
        { label: 'Cards & Pills', action: () => openCardsDemo() },
        { label: 'Form Inputs', action: () => openFormsDemo() },
        { label: 'Date Pickers', action: () => openDatePickersDemo() },
        { label: 'Form Elements', action: () => openFormElementsDemo() },
        { label: 'Table', action: () => openTableDemo() },
        { label: 'Tabs & Accordion', action: () => openTabsAccordionDemo() },
        { label: 'Feedback', action: () => openFeedbackDemo() },
        { label: 'Display', action: () => openDisplayDemo() },
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
  const pos = app.centerPos(480, 550);

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
    createToast({ message: 'Form submitted!', type: 'success' });
  }});
  content.appendChild(submitBtn);

  app.wm.createWindow({ id, title: 'Form Fields', content, x: pos.x, y: pos.y, width: 480, height: 550, minH: 450 });
}

function openDatePickersDemo() {
  const id = 'win-datepickers';
  if (app.wm.getWindow(id)) { app.wm.focusWindow(id); return; }
  const pos = app.centerPos(400, 350);

  const content = document.createElement('div');
  content.style.padding = '16px';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.gap = '16px';

  const calLabel = document.createElement('div');
  calLabel.style.color = 'var(--osx-text)';
  calLabel.style.fontSize = '14px';
  calLabel.textContent = 'Calendar (Date Picker)';
  content.appendChild(calLabel);

  const calendar = createCalendar({
    onChange: (date) => {
      createToast({ message: `Selected: ${date.toDateString()}`, type: 'info' });
    }
  });
  content.appendChild(calendar.container);

  const rangeLabel = document.createElement('div');
  rangeLabel.style.color = 'var(--osx-text)';
  rangeLabel.style.fontSize = '14px';
  rangeLabel.style.marginTop = '16px';
  rangeLabel.textContent = 'Date Range Picker';
  content.appendChild(rangeLabel);

  const rangePicker = createDateRangePicker({
    onChange: (range) => {
      createToast({ message: `Range: ${range.start?.toDateString()} - ${range.end?.toDateString()}`, type: 'info' });
    }
  });
  content.appendChild(rangePicker.container);

  app.wm.createWindow({ id, title: 'Date Pickers', content, x: pos.x, y: pos.y, width: 400, height: 350 });
}

function openFormElementsDemo() {
  const id = 'win-formelements';
  if (app.wm.getWindow(id)) { app.wm.focusWindow(id); return; }
  const pos = app.centerPos(450, 500);

  const content = document.createElement('div');
  content.style.padding = '16px';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.gap = '16px';

  const section1 = document.createElement('div');
  section1.innerHTML = '<div style="color: var(--osx-text); font-size: 14px; margin-bottom: 8px;">Checkbox, Radio & Toggle</div>';
  
  const checkbox = createCheckbox({ label: 'Accept terms', onChange: (checked) => console.log('Checkbox:', checked) });
  section1.appendChild(checkbox.container);
  
  const radioGroup = createRadioGroup({
    name: 'plan',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise' },
    ],
    value: 'pro',
    onChange: (value) => console.log('Radio:', value)
  });
  section1.appendChild(radioGroup.container);

  const toggle = createToggle({ label: 'Enable notifications', onChange: (checked) => console.log('Toggle:', checked) });
  section1.appendChild(toggle.container);

  content.appendChild(section1);

  const section2 = document.createElement('div');
  section2.innerHTML = '<div style="color: var(--osx-text); font-size: 14px; margin-bottom: 8px;">Autocomplete</div>';
  
  const autocomplete = createAutocomplete({
    placeholder: 'Select a fruit...',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
      { value: 'grape', label: 'Grape' },
      { value: 'mango', label: 'Mango' },
    ],
    onChange: (value) => console.log('Autocomplete:', value)
  });
  section2.appendChild(autocomplete.container);
  content.appendChild(section2);

  const section3 = document.createElement('div');
  section3.innerHTML = '<div style="color: var(--osx-text); font-size: 14px; margin-bottom: 8px;">Color Picker</div>';
  
  const colorPicker = createColorPicker({
    value: '#3b82f6',
    onChange: (color) => console.log('Color:', color)
  });
  section3.appendChild(colorPicker.container);
  content.appendChild(section3);

  const section4 = document.createElement('div');
  section4.innerHTML = '<div style="color: var(--osx-text); font-size: 14px; margin-bottom: 8px;">File Upload (Drag & Drop)</div>';
  
  const fileUpload = createFileUpload({
    multiple: true,
    onChange: (files) => console.log('Files:', files.map(f => f.name))
  });
  section4.appendChild(fileUpload.container);
  content.appendChild(section4);

  app.wm.createWindow({ id, title: 'Form Elements', content, x: pos.x, y: pos.y, width: 450, height: 500 });
}

function openTableDemo() {
  const id = 'win-table';
  if (app.wm.getWindow(id)) { app.wm.focusWindow(id); return; }
  const pos = app.centerPos(600, 400);

  const table = createTable({
    columns: [
      { key: 'id', label: 'ID', sortable: true, width: '60px' },
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Role' },
    ],
    data: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
      { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User' },
      { id: 6, name: 'Diana Evans', email: 'diana@example.com', role: 'Admin' },
      { id: 7, name: 'Eve Foster', email: 'eve@example.com', role: 'Editor' },
      { id: 8, name: 'Frank Garcia', email: 'frank@example.com', role: 'User' },
      { id: 9, name: 'Grace Harris', email: 'grace@example.com', role: 'User' },
      { id: 10, name: 'Henry Jackson', email: 'henry@example.com', role: 'Editor' },
      { id: 11, name: 'Ivy King', email: 'ivy@example.com', role: 'User' },
      { id: 12, name: 'Jack Lewis', email: 'jack@example.com', role: 'User' },
    ],
    pageSize: 5,
    onRowClick: (row) => {
      createToast({ message: `Clicked: ${row.name}`, type: 'info' });
    }
  });

  app.wm.createWindow({ id, title: 'Table', content: table.container, x: pos.x, y: pos.y, width: 600, height: 400 });
}

function openTabsAccordionDemo() {
  const id = 'win-tabs-accordion';
  if (app.wm.getWindow(id)) { app.wm.focusWindow(id); return; }
  const pos = app.centerPos(500, 450);

  const content = document.createElement('div');
  content.style.padding = '16px';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.gap = '24px';

  const tabsSection = document.createElement('div');
  tabsSection.innerHTML = '<div style="color: var(--osx-text); font-size: 14px; margin-bottom: 8px;">Tabs</div>';
  
  const tabs = createTabs({
    tabs: [
      { id: 'tab1', label: 'Home', content: '<p>Welcome to the home tab!</p>' },
      { id: 'tab2', label: 'Profile', content: '<p>This is your profile information.</p>' },
      { id: 'tab3', label: 'Settings', content: '<p>Configure your settings here.</p>' },
    ],
    onChange: (id) => console.log('Tab changed:', id)
  });
  tabsSection.appendChild(tabs.container);
  content.appendChild(tabsSection);

  const accordionSection = document.createElement('div');
  accordionSection.innerHTML = '<div style="color: var(--osx-text); font-size: 14px; margin-bottom: 8px;">Accordion</div>';
  
  const accordion = createAccordion({
    items: [
      { id: 'acc1', title: 'What is OSX UI?', content: '<p>OSX UI is a macOS-style desktop window manager framework for web apps.</p>' },
      { id: 'acc2', title: 'How to use?', content: '<p>Import components from the library and create your desktop app.</p>' },
      { id: 'acc3', title: 'Features', content: '<p>Window management, components, themes, routing, and more!</p>' },
    ]
  });
  accordionSection.appendChild(accordion.container);
  content.appendChild(accordionSection);

  app.wm.createWindow({ id, title: 'Tabs & Accordion', content, x: pos.x, y: pos.y, width: 500, height: 450 });
}

function openFeedbackDemo() {
  const id = 'win-feedback';
  if (app.wm.getWindow(id)) { app.wm.focusWindow(id); return; }
  const pos = app.centerPos(400, 380);

  const content = document.createElement('div');
  content.style.padding = '16px';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.gap = '16px';

  const toastSection = document.createElement('div');
  toastSection.innerHTML = '<div style="color: var(--osx-text); font-size: 14px; margin-bottom: 8px;">Toast Notifications</div>';
  
  const toastBtns = document.createElement('div');
  toastBtns.style.display = 'flex';
  toastBtns.style.gap = '8px';
  toastBtns.style.flexWrap = 'wrap';
  
  toastBtns.appendChild(createButton({ label: 'Info', variant: 'primary', onClick: () => createToast({ message: 'This is an info message', type: 'info' }) }));
  toastBtns.appendChild(createButton({ label: 'Success', variant: 'primary', onClick: () => createToast({ message: 'Operation successful!', type: 'success' }) }));
  toastBtns.appendChild(createButton({ label: 'Warning', variant: 'primary', onClick: () => createToast({ message: 'Warning: Please check this', type: 'warning' }) }));
  toastBtns.appendChild(createButton({ label: 'Error', variant: 'danger', onClick: () => createToast({ message: 'An error occurred!', type: 'error' }) }));
  
  toastSection.appendChild(toastBtns);
  content.appendChild(toastSection);

  const progressSection = document.createElement('div');
  progressSection.innerHTML = '<div style="color: var(--osx-text); font-size: 14px; margin-bottom: 8px;">Progress Bar</div>';
  
  const progress = createProgress({ value: 60, showValue: true });
  progressSection.appendChild(progress.container);
  
  const progressBtns = document.createElement('div');
  progressBtns.style.display = 'flex';
  progressBtns.style.gap = '8px';
  progressBtns.style.marginTop = '8px';
  
  let progressValue = 60;
  progressBtns.appendChild(createButton({ label: '-10%', onClick: () => { progressValue = Math.max(0, progressValue - 10); progress.setValue(progressValue); } }));
  progressBtns.appendChild(createButton({ label: '+10%', onClick: () => { progressValue = Math.min(100, progressValue + 10); progress.setValue(progressValue); } }));
  progressBtns.appendChild(createButton({ label: 'Success', onClick: () => { 
    const p = createProgress({ value: 100, showValue: true, variant: 'success' });
    progressSection.appendChild(p.container);
  }}));
  progressBtns.appendChild(createButton({ label: 'Warning', onClick: () => { 
    const p = createProgress({ value: 75, showValue: true, variant: 'warning' });
    progressSection.appendChild(p.container);
  }}));
  progressBtns.appendChild(createButton({ label: 'Danger', onClick: () => { 
    const p = createProgress({ value: 90, showValue: true, variant: 'danger' });
    progressSection.appendChild(p.container);
  }}));
  
  progressSection.appendChild(progressBtns);
  content.appendChild(progressSection);

  const spinnerSection = document.createElement('div');
  spinnerSection.innerHTML = '<div style="color: var(--osx-text); font-size: 14px; margin-bottom: 8px;">Spinners</div>';
  
  const spinners = document.createElement('div');
  spinners.style.display = 'flex';
  spinners.style.gap = '16px';
  spinners.style.alignItems = 'center';
  spinners.appendChild(createSpinner({ size: 'small' }).container);
  spinners.appendChild(createSpinner({ size: 'medium' }).container);
  spinners.appendChild(createSpinner({ size: 'large' }).container);
  spinnerSection.appendChild(spinners);
  content.appendChild(spinnerSection);

  app.wm.createWindow({ id, title: 'Feedback Components', content, x: pos.x, y: pos.y, width: 400, height: 380 });
}

function openDisplayDemo() {
  const id = 'win-display';
  if (app.wm.getWindow(id)) { app.wm.focusWindow(id); return; }
  const pos = app.centerPos(500, 450);

  const content = document.createElement('div');
  content.style.padding = '16px';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.gap = '20px';

  const badgeSection = document.createElement('div');
  badgeSection.innerHTML = '<div style="color: var(--osx-text); font-size: 14px; margin-bottom: 8px;">Badges</div>';
  
  const badges = document.createElement('div');
  badges.style.display = 'flex';
  badges.style.gap = '8px';
  badges.style.alignItems = 'center';
  
  badges.appendChild(createBadge({ value: 5 }).container);
  badges.appendChild(createBadge({ value: 42, variant: 'primary' }).container);
  badges.appendChild(createBadge({ value: 99, variant: 'success' }).container);
  badges.appendChild(createBadge({ value: 100, variant: 'warning' }).container);
  badges.appendChild(createBadge({ value: 999, variant: 'danger', max: 99 }).container);
  
  badgeSection.appendChild(badges);
  content.appendChild(badgeSection);

  const avatarSection = document.createElement('div');
  avatarSection.innerHTML = '<div style="color: var(--osx-text); font-size: 14px; margin-bottom: 8px;">Avatars</div>';
  
  const avatars = document.createElement('div');
  avatars.style.display = 'flex';
  avatars.style.gap = '12px';
  avatars.style.alignItems = 'center';
  
  avatars.appendChild(createAvatar({ src: 'https://i.pravatar.cc/100?img=1', alt: 'User 1' }).container);
  avatars.appendChild(createAvatar({ fallback: 'John Doe', size: 'small' }).container);
  avatars.appendChild(createAvatar({ fallback: 'Jane Smith' }).container);
  avatars.appendChild(createAvatar({ fallback: 'Bob Wilson', size: 'large' }).container);
  
  avatarSection.appendChild(avatars);
  content.appendChild(avatarSection);

  const listSection = document.createElement('div');
  listSection.innerHTML = '<div style="color: var(--osx-text); font-size: 14px; margin-bottom: 8px;">List</div>';
  
  const list = createList({
    items: [
      { id: '1', label: 'Dashboard', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
      { id: '2', label: 'Analytics', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
      { id: '3', label: 'Settings', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>' },
    ],
    onItemClick: (item) => createToast({ message: `Clicked: ${item.label}`, type: 'info' })
  });
  listSection.appendChild(list.container);
  content.appendChild(listSection);

  const treeSection = document.createElement('div');
  treeSection.innerHTML = '<div style="color: var(--osx-text); font-size: 14px; margin-bottom: 8px;">Tree</div>';
  
  const tree = createTree({
    data: [
      {
        id: '1', label: 'Documents', expanded: true,
        children: [
          { id: '1a', label: 'Work' },
          { id: '1b', label: 'Personal' },
        ]
      },
      {
        id: '2', label: 'Images',
        children: [
          { id: '2a', label: 'Photos' },
          { id: '2b', label: 'Screenshots' },
        ]
      },
      { id: '3', label: 'Downloads' },
    ],
    onNodeClick: (node) => createToast({ message: `Selected: ${node.label}`, type: 'info' })
  });
  treeSection.appendChild(tree.container);
  content.appendChild(treeSection);

  app.wm.createWindow({ id, title: 'Display Components', content, x: pos.x, y: pos.y, width: 500, height: 450 });
}

function openAllDemo() {
  const id = 'win-all';
  if (app.wm.getWindow(id)) { app.wm.focusWindow(id); return; }
  const pos = app.centerPos(600, 450);

  const content = document.createElement('div');
  content.style.padding = '20px';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.gap = '16px';
  content.innerHTML = `
    <h2 style="margin: 0 0 8px; font-size: 20px; color: var(--osx-text);">OSX_UI Component Showcase</h2>
    <p style="color: var(--osx-muted); margin: 0; font-size: 14px;">
      Open individual demos from the <strong>Demos</strong> menu above.
    </p>
    <p style="color: var(--osx-muted); margin: 0; font-size: 14px;">
      All components support both <strong>dark</strong> and <strong>light</strong> themes.
    </p>
  `;

  const toolbar = createToolbar([
    createButton({ label: 'Buttons', onClick: () => openButtonsDemo() }),
    createButton({ label: 'Cards & Pills', onClick: () => openCardsDemo() }),
    createButton({ label: 'Forms', onClick: () => openFormsDemo() }),
    createButton({ label: 'Date Pickers', onClick: () => openDatePickersDemo() }),
    createButton({ label: 'Form Elements', onClick: () => openFormElementsDemo() }),
  ]);

  const toolbar2 = createToolbar([
    createButton({ label: 'Table', onClick: () => openTableDemo() }),
    createButton({ label: 'Tabs & Accordion', onClick: () => openTabsAccordionDemo() }),
    createButton({ label: 'Feedback', onClick: () => openFeedbackDemo() }),
    createButton({ label: 'Display', onClick: () => openDisplayDemo() }),
  ]);

  const wrapper = document.createElement('div');
  wrapper.appendChild(toolbar);
  wrapper.appendChild(toolbar2);
  wrapper.appendChild(content);

  app.wm.createWindow({ id, title: 'Component Showcase', content: wrapper, x: pos.x, y: pos.y, width: 600, height: 450 });
}

app.router.start();
