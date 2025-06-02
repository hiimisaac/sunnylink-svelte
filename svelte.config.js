import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
<<<<<<< HEAD
			base: '' // Changed to empty string for static deployments
=======
			base: 'sunnylink-svelte'
>>>>>>> dc63fe9 (Okay let's see)
		}
	}
};

export default config;
