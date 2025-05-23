import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleLogto, UserScope } from '@logto/sveltekit';
import { env } from '$env/dynamic/private';

const comingSoonRoutes: string[] = ['/terms-of-use', '/cookie-policy']; // MODIFIED LINE

const handleRedirects: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url;

  if (comingSoonRoutes.includes(pathname)) {
    throw redirect(307, '/coming-soon');
  }

  // If no redirect, proceed as normal
  const response = await resolve(event);
  return response;
};

const handleLogtoAuth = handleLogto(
	{
		endpoint: env.LOGTO_ENDPOINT,
		appId: env.LOGTO_APP_ID,
		appSecret: env.LOGTO_APP_SECRET,
		scopes: [UserScope.Identities]
	},
	{
		encryptionKey: env.LOGTO_COOKIE_ENCRYPTION_KEY ?? ''
	}
);

export const handle = sequence(handleRedirects, handleLogtoAuth);
