import { error } from '@sveltejs/kit';

function NotFound() {
	error(404, 'API endpoint not found');
}

export {
	NotFound as GET,
	NotFound as POST,
	NotFound as PUT,
	NotFound as PATCH,
	NotFound as DELETE,
};
