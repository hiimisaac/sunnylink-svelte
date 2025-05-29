import { env } from '$env/dynamic/public'; // Import from dynamic/public
import createClient from 'openapi-fetch';
import type { paths } from '../types/v1';

export const sunnylinkClient = createClient<paths>({
	baseUrl: env.PUBLIC_SUNNYLINK_API_BASE_URL ?? 'https://stg.api.sunnypilot.ai/' // Use the env variable
});
