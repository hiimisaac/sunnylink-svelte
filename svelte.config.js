import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
               adapter: adapter({
                       // Use a 404.html fallback so Github Pages can serve
                       // our single page application without server routing
                       fallback: '404.html'
               }),
               paths: {
                       base: '/sunnylink-svelte'
               },

               // Build purely static files. SSR is disabled at the route level

       }
};

export default config;
