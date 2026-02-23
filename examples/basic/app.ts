import { WindowManager, MenuBar, createDesktop, centerPosition } from '../../src/index.js';

const container = document.getElementById('app')!;

// Create menu bar
const menuBar = new MenuBar({
  appName: 'Basic Demo',
  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  menus: [
    {
      id: 'file', label: 'File',
      items: [
        { label: 'New Window', action: () => openHelloWindow(), shortcut: '⌘N' },
        { type: 'separator' },
        { label: 'Close Window', action: () => wm.focusedId && wm.closeWindow(wm.focusedId), shortcut: '⌘W' },
      ],
    },
    {
      id: 'help', label: 'Help',
      items: [
        { label: 'About', action: () => openAbout() },
      ],
    },
  ],
  showClock: true,
});
menuBar.init(container);

// Create desktop
const desktop = createDesktop(container);

// Create window manager
const wm = new WindowManager(desktop);

let winCounter = 0;

function openHelloWindow() {
  winCounter++;
  const id = `win-hello-${winCounter}`;
  const pos = centerPosition(desktop, 500, 350);

  wm.createWindow({
    id,
    title: `Hello World #${winCounter}`,
    content: `
      <div style="padding: 20px;">
        <h2 style="margin: 0 0 12px; font-size: 18px; color: #e5e7eb;">Hello from OSX_UI!</h2>
        <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
          This is a basic window created with the OSX_UI framework.
          Try dragging the title bar, resizing from edges, or using the traffic lights.
        </p>
        <p style="color: #94a3b8; font-size: 14px; margin-top: 12px;">
          Window #${winCounter} — created at ${new Date().toLocaleTimeString()}
        </p>
      </div>
    `,
    x: pos.x + (winCounter - 1) * 30,
    y: pos.y + (winCounter - 1) * 30,
    width: 500,
    height: 350,
    minW: 350,
    minH: 250,
  });
}

function openAbout() {
  const id = 'win-about';
  if (wm.getWindow(id)) { wm.focusWindow(id); return; }
  const pos = centerPosition(desktop, 380, 200);

  wm.createWindow({
    id,
    title: 'About',
    content: `
      <div style="padding: 20px; text-align: center;">
        <strong style="font-size: 16px;">OSX_UI Framework</strong>
        <p style="color: #94a3b8; font-size: 13px; margin-top: 8px;">
          macOS-style desktop window manager<br/>for web applications.
        </p>
        <p style="color: #64748b; font-size: 12px; margin-top: 12px;">v0.1.0</p>
      </div>
    `,
    x: pos.x, y: pos.y,
    width: 380, height: 200,
    minW: 300, minH: 180,
  });
}

// Open first window on load
openHelloWindow();
