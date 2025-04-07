// import { env } from '$env/static/private';
import createClient from 'openapi-fetch';
import type { paths } from '../types/v1';

export const sunnylinkClient = createClient<paths>({
	baseUrl: 'https://stg.api.sunnypilot.ai/'
});
