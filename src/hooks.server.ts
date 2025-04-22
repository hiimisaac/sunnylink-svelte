import { handleLogto, UserScope } from '@logto/sveltekit';
import { env } from '$env/dynamic/private';

// export const handleAuth = handleLogto(
// 	{
// 		endpoint: env.LOGTO_ENDPOINT ?? '',
// 		appId: env.LOGTO_APP_ID ?? '',
// 		appSecret: env.LOGTO_APP_SECRET,
// 		scopes: [UserScope.Identities]
// 	},
// 	{
// 		encryptionKey: env.LOGTO_COOKIE_ENCRYPTION_KEY ?? ''
// 	}
// );

export const handle = async ({ event, resolve }) => {
	const isCallback = event.url.pathname === '/callback';

	// Log incoming request details
	console.log('Handling request:', {
		pathname: event.url.pathname,
		search: event.url.search,
		method: event.request.method,
		headers: Object.fromEntries(event.request.headers),
		cookies: event.cookies.getAll(),
		logtoConfig: {
			endpoint: env.LOGTO_ENDPOINT,
			clientId: env.LOGTO_APP_ID,
			redirectUri: env.LOGTO_REDIRECT,
			scopes: [UserScope.Identities]
		}
	});

	try {
		// Only apply handleLogto for non-callback routes to test manual route
		if (!isCallback) {
			const response = await handleLogto(
				{
					endpoint: env.LOGTO_ENDPOINT,
					appId: env.LOGTO_APP_ID,
					appSecret: env.LOGTO_APP_SECRET,
					scopes: [UserScope.Identities]
				},
				{
					encryptionKey: env.LOGTO_COOKIE_ENCRYPTION_KEY ?? ''
				}
			)({ event, resolve });
			console.log('Logto response:', {
				status: response.status,
				headers: Object.fromEntries(response.headers),
				setCookies: response.headers.get('set-cookie')
			});
			return response;
		}

		// For /callback, let the route handle it
		const response = await resolve(event);
		console.log('Callback route response:', {
			status: response.status,
			headers: Object.fromEntries(response.headers)
		});
		return response;
	} catch (error) {
		console.error('Logto error:', {
			message: error.message,
			stack: error.stack,
			url: event.url.toString(),
			isCallback,
			queryParams: isCallback ? Object.fromEntries(event.url.searchParams) : null,
			cookies: event.cookies.getAll()
		});
		throw error;
	}
};
