// Base URL for the Sunnylink API (configurable via environment variable)
import { PUBLIC_SUNNYLINK_API_BASE_URL } from '$env/static/public';
import createClient from 'openapi-fetch';
import type { paths } from '../types/v1';

export const sunnylinkClient = createClient<paths>({
       baseUrl: PUBLIC_SUNNYLINK_API_BASE_URL ?? 'https://stg.api.sunnypilot.ai/'
});
