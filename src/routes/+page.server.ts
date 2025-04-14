import { LOGTO_REDIRECT, NODE_ENV } from '$env/static/private';
import type { Actions } from './$types';

export const actions: Actions = {
	signIn: async ({ locals }) => {
		await locals.logtoClient.signIn({
			redirectUri: LOGTO_REDIRECT,
			postRedirectUri: '/'
		});
	},
	signOut: async ({ locals }) => {
		const baseUrl =
			NODE_ENV === 'production'
				? 'https://sunnylink-svelte.netlify.app/'
				: 'http://localhost:5173/';
		await locals.logtoClient.signOut(baseUrl);
	}
};
