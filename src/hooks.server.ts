import { handleLogto, UserScope } from '@logto/sveltekit';
import { env } from '$env/dynamic/private';

export const handle = handleLogto(
	{
		endpoint: env.LOGTO_ENDPOINT ?? '',
		appId: env.LOGTO_APP_ID ?? '',
		appSecret: env.LOGTO_APP_SECRET,
		scopes: [UserScope.Identities]
	},
	{
		encryptionKey: env.LOGTO_COOKIE_ENCRYPTION_KEY ?? ''
	}
);

console.log(env.LOGTO_APP_ID);
console.log(env.LOGTO_ENDPOINT);
console.log(env.LOGTO_APP_SECRET);
console.log(env.LOGTO_COOKIE_ENCRYPTION_KEY);
