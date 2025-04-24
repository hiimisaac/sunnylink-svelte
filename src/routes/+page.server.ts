import { env } from '$env/dynamic/private';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	signIn: async ({ locals }) => {
		await locals.logtoClient.signIn({
			redirectUri: env.LOGTO_REDIRECT
		});
	},
	signOut: async ({ locals }) => {
		await locals.logtoClient.signOut();
	}
};
