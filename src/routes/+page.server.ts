import { env } from '$env/dynamic/private';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	signIn: async ({ locals }) => {
		await locals.logtoClient.signIn({
			redirectUri: env.LOGTO_REDIRECT,
			postRedirectUri: '/'
		});
	},
	signOut: async ({ locals }) => {
		const baseUrl = env.LOGTO_REDIRECT;
		await locals.logtoClient.signOut(baseUrl);
	}
};
