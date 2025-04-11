import type { Actions } from './$types';
import { Buffer } from 'node:buffer';

globalThis.Buffer = Buffer;

export const actions: Actions = {
	signIn: async ({ locals }) => {
		// Or use the following code to redirect after the callback is done.
		await locals.logtoClient.signIn({
			redirectUri: 'http://localhost:5173/callback',
			postRedirectUri: 'http://localhost:5173/'
		});
	},
	signOut: async ({ locals }) => {
		await locals.logtoClient.signOut('http://localhost:5173/');
	}
};
