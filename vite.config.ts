import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import fs from 'fs';

let certKey: string|Buffer|undefined;
let certCert: string|Buffer|undefined;

if (fs.existsSync('./.cert/key.pem')) {
	certKey = fs.readFileSync('./.cert/key.pem');
	certCert =  fs.readFileSync('./.cert/cert.pem');
} else {
	console.log('Missing HTTPS key/cert. You may need to run:  npm run cert');
}

export default defineConfig({
  plugins: [sveltekit()],
	server: {
		https: {
			// See https://stackoverflow.com/questions/69417788/vite-https-on-localhost
			key: certKey,
			cert: certCert,
		},
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});
