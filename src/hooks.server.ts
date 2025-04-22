import { handleLogto, UserScope } from '@logto/sveltekit';
import { env } from '$env/dynamic/private';
import { sequence } from '@sveltejs/kit/hooks';
import { Buffer } from 'node:buffer';

// Logto configuration
const logtoConfig = {
	endpoint: env.LOGTO_ENDPOINT ?? '',
	appId: env.LOGTO_APP_ID ?? '',
	appSecret: env.LOGTO_APP_SECRET,
	scopes: [UserScope.Identities]
};

const logtoOptions = {
	encryptionKey: env.LOGTO_COOKIE_ENCRYPTION_KEY ?? ''
};

// Custom hook to log JWT details
async function logJwt({ event, resolve }) {
	const response = await resolve(event);

	// Check if token is available (adjust based on actual SDK property)
	const token = event.locals.logto?.token; // This may vary; consult SDK docs
	if (token) {
		try {
			const header = JSON.parse(Buffer.from(token.split('.')[0], 'base64').toString());
			console.log('JWT Header:', header); // Logs alg, kid, etc.
			console.log('Token Length:', token.length); // Check for truncation
		} catch (error) {
			console.error('Error decoding JWT header:', error);
		}
	}

	return response;
}

// Combine hooks
export const handle = sequence(handleLogto(logtoConfig, logtoOptions), logJwt);
