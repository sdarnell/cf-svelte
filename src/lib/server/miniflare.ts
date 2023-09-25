
// Adapted from:
// https://github.com/sveltejs/kit/issues/4292#issuecomment-1550596497

type StorageOptionsMemory = {
	type: 'memory';
};

type StorageOptionsFile = {
	type: 'file';
	path: string;
};

export type StorageOptions = StorageOptionsMemory | StorageOptionsFile;

export const createCache = async (storageOptions: StorageOptions) => {
	const { Cache } = await import('@miniflare/cache');

	if (storageOptions.type === 'memory') {
		const { MemoryStorage } = await import('@miniflare/storage-memory');
		return new Cache(new MemoryStorage());
	} else if (storageOptions.type === 'file') {
		const { FileStorage } = await import('@miniflare/storage-file');
		return new Cache(new FileStorage(storageOptions.path));
	}

	throw new Error('StorageType not found');
};

export const createD1 = async (storageOptions: StorageOptions) => {
	const { createSQLiteDB } = await import('@miniflare/shared');
	const { D1Database, D1DatabaseAPI } = await import('@miniflare/d1');

	if (storageOptions.type === 'memory') {
		const sqliteDb = await createSQLiteDB(':memory:');
		return new D1Database(new D1DatabaseAPI(sqliteDb));
	} else if (storageOptions.type === 'file') {
		const sqliteDb = await createSQLiteDB(storageOptions.path);
		return new D1Database(new D1DatabaseAPI(sqliteDb));
	}

	throw new Error('StorageType not found');
};

export const createR2 = async (storageOptions: StorageOptions) => {
	const { R2Bucket } = await import('@miniflare/r2');

	if (storageOptions.type === 'memory') {
		const { MemoryStorage } = await import('@miniflare/storage-memory');
		return new R2Bucket(new MemoryStorage());
	} else if (storageOptions.type === 'file') {
		const { FileStorage } = await import('@miniflare/storage-file');
		return new R2Bucket(new FileStorage(storageOptions.path));
	}

	throw new Error('StorageType not found');
};

export const createKV = async (storageOptions: StorageOptions) => {
	const { KVNamespace } = await import('@miniflare/kv');

	if (storageOptions.type === 'memory') {
		const { MemoryStorage } = await import('@miniflare/storage-memory');
		return new KVNamespace(new MemoryStorage());
	} else if (storageOptions.type === 'file') {
		const { FileStorage } = await import('@miniflare/storage-file');
		return new KVNamespace(new FileStorage(storageOptions.path));
	}

	throw new Error('StorageType not found');
};

export const createDOStorage = async (storageOptions: StorageOptions) => {
	const { DurableObjectStorage } = await import('@miniflare/durable-objects');

	if (storageOptions.type === 'memory') {
		const { MemoryStorage } = await import('@miniflare/storage-memory');
		return new DurableObjectStorage(new MemoryStorage());
	} else if (storageOptions.type === 'file') {
		const { FileStorage } = await import('@miniflare/storage-file');
		return new DurableObjectStorage(new FileStorage(storageOptions.path));
	}

	throw new Error('StorageType not found');
};

let savedPlatform: App.Platform;

export async function setupPlatform(): Promise<App.Platform> {
	if (savedPlatform) {
		return savedPlatform;
	}

	const platform = {
		env: {} as any,
		context: {},
		caches: {},
		cf: {
			// Example CF details can be retrieved from https://workers.cloudflare.com/cf.json
			// but use fixed details for now.
			colo: 'LHR', timezone: 'Europe/London', city: 'Reading', continent: 'EU',
			country: 'GB', region: 'England', regionCode: 'ENG', isEUCountry: "1",
		}
	};

	const fs = await import('fs')

	const lines = fs.readFileSync('src/app.d.ts', 'utf8').split(/\r?\n/);
	for (const line of lines) {
		const m = line.match(/^\s*(\w+)\s*:\s*(D1Database|KVNamespace)/);
		const binding = m && m[1];
		const type = m && m[2];

		if (binding && type === 'KVNamespace') {
			platform.env[binding] = await createKV({ type: 'file', path: `.mf/${binding}` });
		}
		// if (binding && type === 'D1Database') {
		// 	platform.env[binding] = await createD1({ type: 'file', path: `.mf/${binding}.sqlite3` });
		// }
	}

	const lines2 = fs.readFileSync('wrangler.toml', 'utf8').split(/\r?\n/);
	let section = '', binding = '';
	for (const line of lines2) {
		let m = line.match(/^\[\[(\w+)]]/);
		if (m && m[1]) {
		  section = m[1];
		}

		if (section === 'd1_databases') {
			m = line.match(/^\s*(\w+)\s*=\s*"([^"].*)"/);
			if (m && m[1] === 'binding') {
				binding = m[2];
			}
			if (m && m[1] === 'database_id') {
				platform.env[binding] = await createD1({
					type: 'file',
					path: `.wrangler/state/v3/d1/${m[2]}/db.sqlite`
				});
			}
		}
	}

	// TODO: Also setup
	// context: {
	// 	waitUntil(promise: Promise<any>): void;
	// };
	// caches: CacheStorage & { default: Cache }

	savedPlatform = platform as App.Platform;
	return savedPlatform;
}
