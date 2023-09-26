# Sveltekit starter for Cloudflare that allows easier local development

This starter was initially created with C3 (Create Cloudflare CLI),
and then enhanced with a few things:
- Allow `npm start` to start a local dev environment (same as `npm run dev`)
- Support for a trusted SSL cert using `mkcert`
- Add the Svelte Inspector
- Add an example migration for the database

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

# D1 Migration

To apply the recorded migrations, use:
```
$ npx wrangler d1 migrations apply DB --local
Migrations to be applied:
┌──────────────────┐
│ name             │
├──────────────────┤
│ 0000_initial.sql │
└──────────────────┘
? About to apply 1 migration(s)
Your database may not be available to serve requests during the migration, continue? › (Y/n)
o Mapping SQL input into an array of statements
o Loading f6c5717c-3866-45d3-b4e7-20b332e359e0 from .wrangler/state/v3/d1
┌──────────────────┬────────┐
│ name             │ status │
├──────────────────┼────────┤
│ 0000_initial.sql │ (tick) │
└──────────────────┴────────┘
```
