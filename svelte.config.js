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
               // Disable server side rendering so the build works as a pure SPA
               ssr: false
       }
};

export default config;
