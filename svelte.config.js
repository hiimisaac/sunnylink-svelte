import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		// default options are shown
		adapter: adapter({
			edge: false,
			split: true
		})
	}
};

export default config;
