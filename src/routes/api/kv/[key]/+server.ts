import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit';
import type { KVNamespace } from '@cloudflare/workers-types';

export const GET: RequestHandler = async ({params, platform, setHeaders}) => {
	console.log('KV GET called');
	if (params.key == null) error(400, 'Missing key');
	const KV: KVNamespace = platform?.env.KV;
	const result = await KV.get(params.key);
	if (result == null) error(404);
	setHeaders({'Cache-Control': 'max-age=0'})
	return json(result);
};

export const PUT: RequestHandler = async ({params, url, platform}) => {
	console.log('KV PUT called');
	if (params.key == null) error(400, 'Missing key');
	const KV: KVNamespace = platform?.env.KV;
	const value = url.searchParams.get('value') || 'VALUE';
	await KV.put(params.key, value);
	return new Response(null, {status: 204});
};
