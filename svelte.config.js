// import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-netlify';

const config = {
	preprocess: vitePreprocess(),
	kit: { adapter: adapter() }
};

export default config;
