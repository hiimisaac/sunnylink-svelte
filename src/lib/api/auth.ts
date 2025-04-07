import type { Middleware } from 'openapi-fetch';

// Factory function to create middleware with a token
export const createAuthMiddleware = (token: string): Middleware => ({
	async onRequest({ request }) {
		request.headers.set('Authorization', `Bearer ${token ?? ''}`);
		console.log(request.headers.get('Authorization'));
		console.log(request);
		return request;
	}
});
