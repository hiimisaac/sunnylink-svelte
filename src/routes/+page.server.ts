import { LOGTO_REDIRECT, NODE_ENV } from '$env/dynamic/private';
import { Actions } from '../../.svelte-kit/types/src/routes/$types.d.ts';

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
