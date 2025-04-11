import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// export default defineConfig({
// 	plugins: [tailwindcss(), sveltekit()]
// });

export default defineConfig({
	plugins: [
		tailwindcss(),
		nodePolyfills({
			include: ['buffer'],
			globals: {
				Buffer: true
			}
		}),
		sveltekit()
	]
});
