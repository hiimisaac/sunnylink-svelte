// src/routes/callback/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
	// Assuming Logto SDK handles the callback automatically via its middleware or routing
	// Perform the redirect to root
	redirect(308, '/');
};
