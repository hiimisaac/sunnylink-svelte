<script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props();
	let loading = true;
	let error = null;

	onMount(async () => {
		try {
			// Handle the callback
			await data.logtoClient?.handleSignInCallback(window.location.href);

			// Redirect to your main app
			window.location.assign('/'); // or wherever you want to go
		} catch (err) {
			console.log(err);
			loading = false;
		}
	});
</script>

<div>Redirection...</div>
