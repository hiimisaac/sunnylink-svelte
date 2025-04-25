import type { LayoutServerLoad } from './$types';
import { type Model } from '$lib/types/types';

export const load: LayoutServerLoad = async ({ locals }) => {
	try {
		await locals.logtoClient.getAccessToken();
	} catch (error) {
		console.log('Not authenticated ' + error);
	}

	const token = (await locals.logtoClient.getIdToken()) ?? '';
	const rawModels = await fetch('https://docs.sunnypilot.ai/driving_models.json');
	const jsonModels = await rawModels.json();
	const parsedModels: { [key: string]: Model } = jsonModels;
	const models: Model[] = [];
	for (const key in parsedModels) {
		if (Object.prototype.hasOwnProperty.call(parsedModels, key)) {
			const newObject = { ...parsedModels[key], model_name: key };
			if (newObject) {
				models.push(newObject);
			}
		}
	}
	models.reverse();
	return { user: locals.user, token, models };
};
