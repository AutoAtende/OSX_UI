# Router & LinkInterceptor

OSX_UI includes a lightweight client-side router that uses the History API, and a link interceptor that captures `<a>` clicks for SPA navigation.

## Import

```js
import { Router, LinkInterceptor } from 'osx-ui';
```

---

## Router

### Constructor

```ts
new Router(routes: Route[], fallback?: () => void)
```

| Parameter  | Type         | Description                                          |
|------------|--------------|------------------------------------------------------|
| `routes`   | `Route[]`    | Array of route definitions                           |
| `fallback` | `() => void` | Called when no route matches (optional 404 handler)   |

The constructor automatically registers a `popstate` listener for browser back/forward navigation.

### Methods

#### `navigate(path, opts?)`

```ts
navigate(path: string, opts?: { replace?: boolean }): void
```

Pushes (or replaces) a history entry and triggers route matching. Set `opts.replace` to `true` to use `history.replaceState` instead of `pushState`.

#### `routeTo(path)`

```ts
routeTo(path: string): void
```

Matches the given path against all routes and calls the first matching handler. Does not modify browser history. Falls back to the `fallback` function if no route matches.

#### `start()`

```ts
start(): void
```

Routes to `location.pathname`, which triggers the handler for the current URL. Call this once after setting up your app.

#### `destroy()`

```ts
destroy(): void
```

Removes the `popstate` event listener.

### Route Interface

```ts
interface Route {
  pattern: RegExp;                          // Regex to match against the path
  handler: (match: RegExpMatchArray) => void; // Called with the regex match result
}
```

### Usage Example

```js
const router = new Router([
  {
    pattern: /^\/$/,
    handler: () => showHomePage(),
  },
  {
    pattern: /^\/notes\/(\d+)$/,
    handler: (match) => showNote(match[1]),
  },
], () => {
  showNotFound();
});

router.start();

// Programmatic navigation
router.navigate('/notes/42');
```

---

## LinkInterceptor

The `LinkInterceptor` captures clicks on `<a href="...">` elements within a container and converts them into SPA navigations instead of full page loads. It only intercepts links that point to the same origin.

### Constructor

```ts
new LinkInterceptor(container: HTMLElement, navigate: (path: string) => void)
```

| Parameter   | Type                        | Description                          |
|-------------|-----------------------------|--------------------------------------|
| `container` | `HTMLElement`               | DOM element to listen for clicks on  |
| `navigate`  | `(path: string) => void`   | Function called with the link's pathname |

### Methods

#### `destroy()`

```ts
destroy(): void
```

Removes the click event listener from the container.

### Usage Example

```js
const interceptor = new LinkInterceptor(
  document.getElementById('desktop'),
  (path) => router.navigate(path),
);

// Links inside #desktop now trigger SPA navigation:
// <a href="/notes/1">Note 1</a>  -->  router.navigate('/notes/1')

// Cleanup
interceptor.destroy();
```

---

## Using with createApp

When you use `createApp`, both `Router` and `LinkInterceptor` are set up automatically. The link interceptor is bound to the desktop element, and the router is available as `app.router`:

```js
import { createApp } from 'osx-ui';

const app = createApp({
  container: document.getElementById('root'),
  routes: [
    { pattern: /^\/$/, handler: () => showHome() },
    { pattern: /^\/settings$/, handler: () => showSettings() },
  ],
});

app.router.start();
app.router.navigate('/settings');
```
