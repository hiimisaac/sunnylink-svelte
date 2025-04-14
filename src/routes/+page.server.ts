import { LOGTO_REDIRECT, env } from '$env/dynamic/private';
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
			env.NODE_ENV === 'production'
				? 'https://sunnylink-svelte.netlify.app/'
				: 'http://localhost:5173/';
		await locals.logtoClient.signOut(baseUrl);
	}
};
