import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

// noinspection JSUnusedGlobalSymbols
export const handle = (async ({ event, resolve }) => {
	console.log(`building ${building} url ${event.url} event.platform.env.DB`, event.platform?.env.DB);
	if (!event.platform?.env.DB) {
		console.error('Missing platform DB');
	}

	return resolve(event);
}) satisfies Handle;
