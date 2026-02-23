# Server Integration

OSX_UI is a client-side framework, but it ships with server helpers for Express that make it easy to serve your SPA and handle content negotiation.

## Express Setup for SPA

A single-page application needs a server that:
1. Serves static assets (CSS, JS, images)
2. Provides API endpoints that return JSON
3. Returns the HTML shell for all other routes, so the client-side router handles navigation

### Minimal Server

```js
import express from 'express';
import { spaCatchAll } from 'osx-ui/server';

const app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

// SPA catch-all (must be the last route)
app.use(spaCatchAll({ view: 'index' }));

app.listen(3000);
```

The `spaCatchAll` middleware checks if the request path starts with an API or static prefix. If it does, it returns a `404 JSON` response. Otherwise, it renders your shell view.

## wantsJson for Content Negotiation

Use `wantsJson` to check if the client expects a JSON response (based on the `Accept` header). This is useful for routes that can serve both HTML and JSON:

```js
import { wantsJson } from 'osx-ui/server';

app.get('/notes/:id', (req, res) => {
  const note = getNote(req.params.id);

  if (!note) {
    if (wantsJson(req)) {
      return res.status(404).json({ error: 'not_found' });
    }
    return res.status(404).render('404');
  }

  if (wantsJson(req)) {
    return res.json(note);
  }
  res.render('note', { note });
});
```

Browsers send `Accept: text/html` by default, while `fetch()` calls with `Accept: application/json` trigger the JSON branch.

## SPA Catch-All Middleware

### Configuration

```js
spaCatchAll({
  view: 'index',                            // Required: view name for res.render()
  apiPrefixes: ['/api/', '/graphql/'],       // Optional (default: ['/api/'])
  staticPrefixes: ['/public/', '/assets/'],  // Optional (default: ['/public/'])
})
```

### How It Works

1. Request comes in for `/notes/42`
2. Path does not start with `/api/` or `/public/`
3. The middleware calls `res.render('index')`, returning the HTML shell
4. The browser loads the JS bundle, the client-side router sees `/notes/42`, and renders the appropriate window

For API routes like `/api/notes/99`:
1. Path starts with `/api/`
2. The middleware returns `{ error: 'not_found' }` with status 404
3. Your actual API routes should be defined before the catch-all so they handle valid paths

## Full Express Server Example

```js
import express from 'express';
import { spaCatchAll, wantsJson } from 'osx-ui/server';

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/public', express.static('public'));

// Serve the OSX_UI CSS from node_modules
app.use('/public/osx-ui.css', express.static('node_modules/osx-ui/css/osx-ui.css'));

// API routes
app.get('/api/notes', (req, res) => {
  const notes = getAllNotes();
  res.json({ notes });
});

app.get('/api/notes/:id', (req, res) => {
  const note = getNote(req.params.id);
  if (!note) return res.status(404).json({ error: 'not_found' });
  res.json(note);
});

app.post('/api/notes', (req, res) => {
  const note = createNote(req.body);
  res.status(201).json(note);
});

app.put('/api/notes/:id', (req, res) => {
  const note = updateNote(req.params.id, req.body);
  if (!note) return res.status(404).json({ error: 'not_found' });
  res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  deleteNote(req.params.id);
  res.json({ ok: true });
});

// SPA catch-all -- must be after all API and static routes
app.use(spaCatchAll({ view: 'index' }));

// Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

### Corresponding EJS View (`views/index.ejs`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Notes App</title>
  <link rel="stylesheet" href="/public/osx-ui.css" />
  <link rel="stylesheet" href="/public/app.css" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/public/app.js"></script>
</body>
</html>
```

### Client-Side App (`public/app.js`)

```js
import { createApp, createCard } from 'osx-ui';

const app = createApp({
  container: document.getElementById('root'),
  appName: 'Notes',
  theme: 'dark',
  showClock: true,
  menus: [
    {
      id: 'file',
      label: 'File',
      items: [
        { label: 'New Note', action: () => app.router.navigate('/notes/new') },
      ],
    },
  ],
  routes: [
    { pattern: /^\/$/, handler: () => showNotesList() },
    { pattern: /^\/notes\/new$/, handler: () => showNewNote() },
    { pattern: /^\/notes\/(\d+)$/, handler: (m) => showNote(m[1]) },
  ],
});

app.router.start();

async function showNotesList() {
  const res = await fetch('/api/notes', { headers: { Accept: 'application/json' } });
  const { notes } = await res.json();

  const list = document.createElement('div');
  for (const note of notes) {
    const card = createCard({
      header: `<h3>${note.title}</h3>`,
      body: `<p>${note.preview}</p>`,
    });
    card.addEventListener('click', () => app.router.navigate(`/notes/${note.id}`));
    list.appendChild(card);
  }

  const pos = app.centerPos(600, 500);
  app.wm.createWindow({
    id: 'notes-list',
    title: 'All Notes',
    content: list,
    ...pos,
    width: 600,
    height: 500,
  });
}
```
