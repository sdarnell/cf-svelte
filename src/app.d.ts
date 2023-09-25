// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
	namespace App {
		interface Platform {
			env: {
				// COUNTER: DurableObjectNamespace;
				KV: KVNamespace;
				DB: D1Database;
			};
			context: {
				waitUntil(promise: Promise<unknown>): void;
			};
			caches: CacheStorage & { default: Cache }
			cf?: IncomingRequestCfProperties;
		}
	}
}

export {};
