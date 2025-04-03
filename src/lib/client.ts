import { up } from "up-fetch";
import { env } from '$env/dynamic/private';


export const upfetch = up(fetch, () => ({
    baseUrl: env.API_URL,
    timeout: 30000,
}))