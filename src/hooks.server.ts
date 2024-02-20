// /src/hooks.server.ts
import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

// When developing, this hook will add proxy objects to the `platform` object
// which will emulate any bindings defined in `wrangler.toml`.

let platform: App.Platform;

if (dev) {
	const { getPlatformProxy } = await import('wrangler');
	platform = await getPlatformProxy();
	console.log('Platform initialised for local development', platform);
}

export const handle = (async ({ event, resolve }) => {
	if (dev && platform) {
		event.platform = {
			...event.platform,
			...platform
		};
	}

	return resolve(event);
}) satisfies Handle;
