import { Actions } from '../../.svelte-kit/types/src/routes/$types.d.ts';

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
