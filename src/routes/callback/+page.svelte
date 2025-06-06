<script lang="ts">
	import { PUBLIC_CALLBACK, PUBLIC_LOGTO_APP_ID, PUBLIC_LOGTO_ENDPOINT } from '$env/static/public';
	import LogtoClient from '@logto/browser';
	import { onMount } from 'svelte';

	let { data } = $props();
	let loading = true;
	let error = null;

	onMount(async () => {
		try {
			const logtoClient = new LogtoClient({
				endpoint: PUBLIC_LOGTO_ENDPOINT,
				appId: PUBLIC_LOGTO_APP_ID
			});

			await logtoClient?.handleSignInCallback(PUBLIC_CALLBACK);

			window.location.assign('/');
		} catch (err) {
			console.log(err);
			loading = false;
		}
	});
</script>

<div>Redirecting...</div>
