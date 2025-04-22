import { env } from '$env/dynamic/private';
import { Actions } from '../../.svelte-kit/types/src/routes/$types.d.ts';

export const actions: Actions = {
	signIn: async ({ locals }) => {
		console.log(env.LOGTO_COOKIE_ENCRYPTION_KEY);
		try {
			await locals.logtoClient.signIn({
				redirectUri: env.LOGTO_REDIRECT,
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
