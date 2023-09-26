<script lang="ts">
	let timestampKV = '';

	async function readFromKV() {
		timestampKV = await (await fetch(`/api/kv/Timestamp`)).json();
	}

	async function writeToKV() {
		await fetch(`/api/kv/Timestamp?value=${new Date().toISOString()}`, { method: 'PUT' });
		await readFromKV();
	}

	let timestampD1 = '';

	async function readFromD1() {
		timestampD1 = await (await fetch(`/api/d1/1`)).json();
	}

	async function writeToD1() {
		await fetch(`/api/d1/Timestamp?value=${new Date().toISOString()}`, { method: 'PUT' });
		await readFromD1();
	}

	async function deleteFromD1() {
		await fetch(`/api/d1/1`, { method: 'DELETE' });
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p>
	<button on:click={readFromKV}>Read from KV</button>
	<button on:click={writeToKV}>Write to KV</button>
</p>
<p>KV Timestamp: {timestampKV}</p>

<p>
	<button on:click={readFromD1}>Read from D1</button>
	<button on:click={writeToD1}>Write to D1</button>
	<button on:click={deleteFromD1}>Delete from D1</button>
</p>
<p>D1 Record: {JSON.stringify(timestampD1)}</p>
