import { handleLogto, UserScope } from '@logto/sveltekit';
import { env } from '$env/dynamic/private';

export const handle = handleLogto(
	{
		endpoint: env.LOGTO_ENDPOINT,
		appId: env.LOGTO_APP_ID,
		appSecret: env.LOGTO_APP_SECRET,
		scopes: [UserScope.Identities]
	},
	{
		encryptionKey: env.LOGTO_COOKIE_ENCRYPTION_KEY ?? ''
	},
	{
		onCallbackError: (error: unknown): Response => {
			// Initialize error details
			let errorMessage = 'Unknown error';
			let errorStack = '';
			let errorType = 'Unknown';

			// Extract error details if possible
			if (error instanceof Error) {
				errorMessage = error.message;
				errorStack = error.stack || '';
				errorType = error.name;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			// Log error details
			console.error('Logto Callback Error:', {
				errorType,
				errorMessage,
				errorStack,
				timestamp: new Date().toISOString(),
				logtoEndpoint: env.LOGTO_ENDPOINT,
				appId: env.LOGTO_APP_ID,
				// Avoid logging sensitive data like APP_SECRET
				requestUrl: typeof window === 'undefined' ? 'Server-side' : window.location.href
			});

			// Return a user-friendly response
			return new Response(
				JSON.stringify({
					error: 'Authentication callback failed',
					message: 'An error occurred during authentication. Please try again or contact support. '
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}
	}
);
