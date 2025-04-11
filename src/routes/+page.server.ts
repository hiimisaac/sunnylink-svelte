import { env } from '$env/dynamic/private';
import type { Actions } from './$types';
import { Buffer } from 'node:buffer';

globalThis.Buffer = Buffer;

export const actions: Actions = {
	signIn: async ({ locals }) => {
		// Or use the following code to redirect after the callback is done.
		await locals.logtoClient.signIn({
			redirectUri: env.LOGTO_REDIRECT,
			postRedirectUri: env.LOGTO_ENDPOINT
		});
	},
	signOut: async ({ locals }) => {
		await locals.logtoClient.signOut('http://localhost:5173/');
	}
};
