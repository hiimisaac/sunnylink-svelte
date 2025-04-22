import { env } from '$env/dynamic/private';
import { Actions } from '../../.svelte-kit/types/src/routes/$types.d.ts';

export const actions: Actions = {
	signIn: async ({ locals }) => {
		await locals.logtoClient.signIn({
			redirectUri: env.LOGTO_REDIRECT,
			postRedirectUri: '/'
		});
	},
	signOut: async ({ locals }) => {
		const baseUrl = 'https://sunnylink-svelte.netlify.app/';

		await locals.logtoClient.signOut(baseUrl);
	}
};
