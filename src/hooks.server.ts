// /src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	// TODO: Implement hooks such as auth checks etc. here

	return resolve(event);
}) satisfies Handle;
