import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const token = (await locals.logtoClient.getIdToken()) ?? '';
	return { user: locals.user, token };
};
