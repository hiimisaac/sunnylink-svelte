import type { operations } from './v1';

export type Device =
	operations['GetDevicesForUser']['responses']['200']['content']['application/json'];
