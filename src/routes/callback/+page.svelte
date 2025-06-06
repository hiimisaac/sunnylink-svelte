<script lang="ts">
	import { PUBLIC_CALLBACK } from '$env/static/public';
	import { onMount } from 'svelte';

	let { data } = $props();
	let loading = true;
	let error = null;

	onMount(async () => {
		try {
			await data.logtoClient?.handleSignInCallback(PUBLIC_CALLBACK);

			window.location.assign('/');
		} catch (err) {
			console.log(err);
			loading = false;
		}
	});
</script>

<div>Redirection...</div>
