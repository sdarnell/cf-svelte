// /src/hooks.server.ts
import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	if (dev && !event.platform) {
		const mf = await import('./lib/server/miniflare');
		event.platform = await mf.setupPlatform();
	}
	return resolve(event);
}) satisfies Handle;
