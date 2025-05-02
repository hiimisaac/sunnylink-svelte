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
		console.log('Try');
		await locals.logtoClient.signOut(env.LOGTO_LOGOUT_URI);
	}
};
