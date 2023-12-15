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
	setHeaders({'Cache-Control': 'max-age=0'})
	return json(result);
};

export const PUT: RequestHandler = async ({params, platform}) => {
	console.log(`D1 PUT called ${params.id}`);
	if (params.id == null) error(400, 'Missing id');
	const DB: D1Database = platform?.env.DB;
	const result = await DB.prepare('INSERT INTO users (id, email) VALUES(?, ?)')
		.bind(1, 'test@example.com').run();
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
