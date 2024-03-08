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
			caches: CacheStorage & { default: Cache } | CacheStorage_3;
			cf: CfProperties;
			ctx: ExecutionContext;
		}
	}
}

export {};
