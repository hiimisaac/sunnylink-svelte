import { LOGTO_REDIRECT, LOGTO_LOGOUT_URI } from '$env/static/private';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	signIn: async ({ locals }) => {
		await locals.logtoClient.signIn({
			redirectUri: LOGTO_REDIRECT,
			postRedirectUri: '/'
		});
	},
	signOut: async ({ locals }) => {
		console.log('Try');
		await locals.logtoClient.signOut(LOGTO_LOGOUT_URI);
	}
};
