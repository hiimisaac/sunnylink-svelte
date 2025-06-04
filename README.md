# sunnylink

This repo hosts the SvelteKit code for the sunnylink SPA. The project is
published via GitHub Pages under the `/sunnylink-svelte` path. To create a
build for GitHub Pages run:

```bash
pnpm install
pnpm build
```

The `adapter-static` configuration uses `404.html` as the fallback file and
server-side rendering is disabled. This allows GitHub Pages to serve the app as
a single page application without server side routing.
