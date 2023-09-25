# Sveltekit starter for Cloudflare that allows easier local development

This starter was initially created with C3 (Create Cloudflare CLI),
and then enhanced with a few things:
- Allow `npm start` to start a local dev environment (same as `npm run dev`)
- Support for a trusted SSL cert using `mkcert`
- Add the Svelte Inspector 

# create-svelte

The initial project was created with:

```bash
npm create cloudflare@latest cf-svelte -- --framework=svelte
```

# mkcert

To get a trusted SSL certificate when testing locally, we use the `mkcert` package,
see https://github.com/FiloSottile/mkcert

If you haven't used it before, you will need install it the first time.
```
$ mkcert -install
Created a new local CA
The local CA is now installed in the system trust store!
The local CA is now installed in the Firefox trust store (requires browser restart)!
```

Then your app can use a local cert with a shorter lifespan. These are stored in the
`.cert` directory, and can be setup or refreshed with:
```bash
npm run cert
```

# Svelte inspector

When running locally you can enable the inspector by pressing
<kbd>Cmd ⌘</kbd> + <kbd>Shift ⇧</kbd> on Mac, otherwise <kbd>Ctrl ⌃</kbd> + <kbd>Shift ⇧</kbd>.
Then highlight and click on components.

See https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/inspector.md
