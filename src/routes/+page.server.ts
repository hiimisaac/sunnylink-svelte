import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	signIn: async ({ locals }) => {
		await locals.logtoClient.signIn({
			redirectUri: 'https://sunnylink-svelte.netlify.app/callback',
			postRedirectUri: '/'
		});
	},
	signOut: async ({ locals }) => {
		const baseUrl = 'https://sunnylink-svelte.netlify.app/';

		await locals.logtoClient.signOut(baseUrl);
	}
};
