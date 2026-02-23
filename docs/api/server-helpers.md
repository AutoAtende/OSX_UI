# Server Helpers

OSX_UI provides optional server-side utilities for Express applications. These are imported from the `osx-ui/server` sub-path and require Express as a peer dependency.

## Import

```js
import { spaCatchAll, wantsJson } from 'osx-ui/server';
```

---

## spaCatchAll

```ts
spaCatchAll(opts: SpaCatchAllOptions): RequestHandler
```

Returns an Express middleware that serves your SPA shell view for all non-API, non-static routes. API and static asset paths receive a 404 JSON response instead.

### SpaCatchAllOptions

```ts
interface SpaCatchAllOptions {
  view: string;              // View name to render (passed to res.render)
  apiPrefixes?: string[];    // Paths that return JSON 404 (default: ['/api/'])
  staticPrefixes?: string[]; // Paths that return JSON 404 (default: ['/public/'])
}
```

### Behavior

1. If the request path starts with any `apiPrefixes` or `staticPrefixes` entry, respond with `404 { error: 'not_found' }`.
2. Otherwise, render the configured `view`.

### Example

```js
import express from 'express';
import { spaCatchAll } from 'osx-ui/server';

const app = express();

// Your API routes
app.get('/api/notes', (req, res) => { /* ... */ });

// Static files
app.use('/public', express.static('public'));

// SPA catch-all (must be last)
app.use(spaCatchAll({
  view: 'index',
  apiPrefixes: ['/api/'],
  staticPrefixes: ['/public/', '/assets/'],
}));
```

---

## wantsJson

```ts
wantsJson(req: { get(name: string): string | undefined }): boolean
```

Returns `true` if the request's `Accept` header contains `application/json`. Useful for content negotiation -- serve JSON for API clients and HTML for browsers.

### Example

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
  return res.render('note', { note });
});
```

---

## Full Express Server Example

```js
import express from 'express';
import { spaCatchAll, wantsJson } from 'osx-ui/server';

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use('/public', express.static('public'));

// API routes
app.get('/api/notes', (req, res) => {
  res.json({ notes: getAllNotes() });
});

app.get('/api/notes/:id', (req, res) => {
  const note = getNote(req.params.id);
  if (!note) return res.status(404).json({ error: 'not_found' });
  res.json(note);
});

// SPA catch-all -- all other GET requests render the shell
app.use(spaCatchAll({ view: 'index' }));

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
```
