// src/routes/callback/+page.server.ts
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function load({ url, fetch }) {
	try {
		const code = url.searchParams.get('code');
		const state = url.searchParams.get('state');
		const iss = url.searchParams.get('iss');

		console.log('Manual callback params:', {
			code,
			state,
			iss,
			redirectUri: env.LOGTO_REDIRECT,
			clientId: env.LOGTO_APP_ID
		});

		// Validate issuer
		if (iss !== env.LOGTO_ENDPOINT) {
			throw new Error(`Invalid issuer: expected ${env.LOGTO_ENDPOINT}, got ${iss}`);
		}

		// Perform token exchange
		const tokenResponse = await fetch(`${env.LOGTO_ENDPOINT}/token`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code,
				client_id: env.LOGTO_APP_ID,
				client_secret: env.LOGTO_APP_SECRET,
				redirect_uri: env.LOGTO_REDIRECT
			})
		});

		const tokenData = await tokenResponse.json();
		console.log('Token response:', {
			access_token: tokenData.access_token ? '[redacted]' : null,
			id_token: tokenData.id_token ? '[redacted]' : null,
			token_type: tokenData.token_type,
			expires_in: tokenData.expires_in,
			error: tokenData.error,
			error_description: tokenData.error_description
		});

		if (tokenData.id_token) {
			// Decode ID token header and payload
			const [headerB64, payloadB64] = tokenData.id_token.split('.');
			const header = JSON.parse(Buffer.from(headerB64, 'base64').toString());
			const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString());
			console.log('ID token header:', header);
			console.log('ID token payload:', payload);
		} else {
			console.log('No ID token in response');
		}

		if (tokenData.access_token) {
			console.log('Token exchange successful, redirecting...');
			throw redirect(302, '/');
		} else {
			throw new Error('Token exchange failed: ' + JSON.stringify(tokenData));
		}
	} catch (error) {
		console.error('Manual callback error:', {
			message: error.message,
			stack: error.stack,
			url: url.toString()
		});
		throw error;
	}
}
