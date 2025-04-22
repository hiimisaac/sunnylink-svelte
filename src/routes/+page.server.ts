import { Actions } from '../../.svelte-kit/types/src/routes/$types.d.ts';

export const actions: Actions = {
	signIn: async ({ locals }) => {
		try {
			await locals.logtoClient.signIn({
				redirectUri: 'https://sunnylink-svelte.netlify.app/',
				postRedirectUri: '/'
			});
		} catch (error) {
			console.log(error);
		}
	},
	signOut: async ({ locals }) => {
		const baseUrl = 'https://sunnylink-svelte.netlify.app/';

		await locals.logtoClient.signOut(baseUrl);
	}
};
