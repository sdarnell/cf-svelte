import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit';
import type { D1Database } from '@cloudflare/workers-types';

export const GET: RequestHandler = async ({params, platform, setHeaders}) => {
	console.log(`D1 GET called ${params.id}`);
	if (params.id == null) error(400, 'Missing id');
	const DB: D1Database = platform?.env.DB;
	const result = await DB.prepare('SELECT * from users WHERE id = ?')
		.bind(params.id).first();
	if (result == null) error(404);
	console.dir(result);

	const data: any = result.data;

	console.log(`Data Typeof ${typeof data} isArray ${Array.isArray(data)} ctor ${data.constructor.name}`);
	console.log(`Instanceof ArrayBuffer ${data instanceof ArrayBuffer} isView ${ArrayBuffer.isView(data)}`);

	setHeaders({'Cache-Control': 'max-age=0'})
	return json(result);
};

export const PUT: RequestHandler = async ({params, platform}) => {
	console.log(`D1 PUT called ${params.id}`);
	if (params.id == null) error(400, 'Missing id');
	const DB: D1Database = platform?.env.DB;

	// Passing a Uint8Array works fine
	// const data = new Uint8Array([99, 88, 77]);

	const data = Buffer.from(new Uint8Array([99, 88, 77]));

	const result = await DB.prepare('INSERT INTO users (id, email, data) VALUES(?, ?, ?)')
		.bind(1, 'test@example.com', data).run();
	console.dir(result);
	return new Response(null, {status: 204});
};

export const DELETE: RequestHandler = async ({params, platform}) => {
	console.log(`D1 DELETE called ${params.id}`);
	if (params.id == null) error(400, 'Missing id');
	const DB: D1Database = platform?.env.DB;
	const result = await DB.prepare('DELETE FROM users WHERE id = ?')
		.bind(1).run();
	console.dir(result);
	return new Response(null, {status: 204});
};
