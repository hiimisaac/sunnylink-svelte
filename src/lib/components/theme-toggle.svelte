<script lang="ts">
	let { onThemeChanged } = $props();
	import { browser } from '$app/environment';
	import { getCurrentTheme } from '$lib/utils/themeFetcher';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	let theme = $state('');

	function fetchTheme() {
		if (browser) {
			theme = capitalizeFirstLetter(getCurrentTheme());
		}
		onThemeChanged();
	}

	function capitalizeFirstLetter(word: String | undefined) {
		if (!word) return '';
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

	onMount(() => {
		fetchTheme();
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<label class="label">
	<input
		type="checkbox"
		onclick={fetchTheme}
		class="toggle theme-controller"
		data-toggle-theme="light,dark"
	/>
	{#if theme === 'Dark'}
		Disable
	{:else}
		Enable
	{/if}
	Dark Mode
</label>

<!-- <div class="w-full items-center justify-center">
	<label class="toggle text-base-content">
		<input type="checkbox" class="theme-controller" data-toggle-theme="light,dark" />

		<svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><g
				stroke-linejoin="round"
				stroke-linecap="round"
				stroke-width="2"
				fill="none"
				stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g
			></svg
		>
		<svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><g
				stroke-linejoin="round"
				stroke-linecap="round"
				stroke-width="2"
				fill="none"
				stroke="currentColor"
				><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"
				></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path
					d="M2 12h2"
				></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path
					d="m19.07 4.93-1.41 1.41"
				></path></g
			></svg
		>
	</label>
</div> -->

<!-- <label class="swap swap-rotate">
	<!-- this hidden checkbox controls the state -->
<!-- <button data-toggle-theme="dark,light" data-act-class="ACTIVECLASS">
		{#if theme === 'light'}
			<svg
				class="swap-off h-10 w-10 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path
					d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
				/>
			</svg>
		{:else}
			<svg
				class="swap-on h-10 w-10 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path
					d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
				/>
			</svg>
		{/if}

		<!-- moon icon -->
<!-- </button> -->
<!-- </label> -->
