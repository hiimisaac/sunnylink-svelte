# sunnylink

This repo hosts the SvelteKit code for the sunnylink SPA. The project is
published via GitHub Pages under the `/sunnylink-svelte` path. To create a
build for GitHub Pages run:

```bash
pnpm install
pnpm build
```

The static adapter emits a `404.html` file so that GitHub Pages can redirect all
routes back to the SPA entry. Server-side rendering is disabled in
`src/routes/+layout.ts` to ensure the site runs completely on the client.
