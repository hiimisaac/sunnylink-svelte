<script lang="ts">
	import { createAuthMiddleware } from '$lib/api/auth';
	import { sunnylinkClient } from '$lib/api/client';
	import { Toaster, toast } from 'svelte-sonner';
	import { type Device } from '$lib/types/types';
	import '../app.css';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import { onMount } from 'svelte';
	import { getCurrentTheme } from '$lib/utils/themeFetcher';
	import darkLogo from '$lib/images/sp_white_transparent.png';
	import lightLogo from '$lib/images/sp_black_transparent.png';

	let isModalOpen = $state(false);
	let allDevices = $state<Device>([]);
	let selectedModel = $state<number>();
	let selectedDevice = $derived.by(() => {
		return allDevices.length === 1 ? allDevices[0].device_id : '';
	});
	let sendingModel = $state<Boolean>();
	let theme = $state('');

	let { data, children } = $props();

	async function checkForSubmit(e: MouseEvent) {
		if (data.user) {
			e.preventDefault();
			isModalOpen = !isModalOpen;
			const authMiddleware = createAuthMiddleware(data.token);
			sunnylinkClient.use(authMiddleware);
			const devices = await sunnylinkClient.GET('/users/{userId}/devices', {
				params: { path: { userId: 'self' } }
			});
			allDevices = devices.data!;
		}
	}

	async function sendNewModelToDevice() {
		try {
			sendingModel = true;
			const response = await sunnylinkClient.POST('/settings/{deviceId}', {
				params: {
					path: {
						deviceId: selectedDevice ?? ''
					}
				},
				body: [
					{
						key: 'ModelManager_DownloadIndex',
						value: btoa(selectedModel?.toString() ?? ''),
						is_compressed: false
					}
				]
			});

			if (response.error) {
				throw new Error(`HTTP error! Status: ${response.error.detail}`);
			}
			isModalOpen = !isModalOpen;

			toast.success('Download requested. Check your device for current status. Drive safely! 🚗💨');
			sendingModel = false;
			selectedModel = 0;
		} catch (error) {
			toast.error('Ah nuts 🔩. We encountered an error');
			console.error('Error:', error);
		}
	}

	function determineCurrentLogoColor() {
		theme = getCurrentTheme() ?? '';
		console.log(theme);
	}

	onMount(() => {
		determineCurrentLogoColor();
	});
</script>

<Toaster richColors />
<div class="navbar bg-base-100 shadow-sm">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/>
				</svg>
			</div>
			<ul
				tabindex="-1"
				class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
			>
				<li><a href="/">Homepage</a></li>
				<li><a href="/sunnylink">sunnylink</a></li>
				<li><a href="/dashboard">Dashboard</a></li>
			</ul>
		</div>
	</div>
	<div class="navbar-center">
		{#if theme === 'dark'}
			<img src={darkLogo} class="h-12" alt="darklogo" />
		{:else if theme === 'light'}
			<img src={lightLogo} class="h-12" alt="lightlogo" />
		{/if}
	</div>
	<div class="navbar-end">
		<form method="POST" action="?/{data.user ? 'signOut' : 'signIn'}" class="px-5">
			<button class="btn btn-ghost" type="submit" onclick={(event) => checkForSubmit(event)}
				>Change Driving Model</button
			>
		</form>

		<dialog id="my_modal_1" class="modal" class:modal-open={isModalOpen}>
			<div class="modal-box">
				{#if allDevices.length <= 0}
					<p>We're working to get your device and models! Bear with us!</p>
				{:else}
					<h3 class="text-lg font-bold">Change Driving Model</h3>
					<p class="py-4">
						<select class="select" bind:value={selectedDevice}>
							<option disabled selected>Device</option>
							{#each allDevices as device}
								<option value={device.device_id}>{device.device_id}</option>
							{/each}
						</select>
					</p>
					<p>
						{#if data.models}
							<select class="select" bind:value={selectedModel}>
								<option disabled selected>Model</option>
								{#each data.models as validatedModels}
									<option value={validatedModels.index}>{validatedModels.display_name}</option>
								{/each}
							</select>
						{/if}
					</p>
					<div class="modal-action">
						<form method="dialog">
							<!-- if there is a button in form, it will close the modal -->
							<button class="btn" onclick={() => (isModalOpen = !isModalOpen)}>Close</button>
							{#if sendingModel}
								<button class="btn btn-disabled">
									<span class="loading loading-spinner"></span>
									Making magic happen...
								</button>
							{:else}
								<button class="btn btn-primary" onclick={async () => await sendNewModelToDevice()}
									>Send it 🚀</button
								>
							{/if}
						</form>
					</div>
				{/if}
			</div>
		</dialog>
		{#if data.user}
			<div class="dropdown dropdown-left">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
					<img src={data.user.picture} alt="SSO avatar" class="rounded-4xl" />
				</div>

				<form method="POST" action="?/signOut">
					<button type="submit">Logout</button>
				</form>
				<ThemeToggle
					onThemeChanged={() => {
						determineCurrentLogoColor();
					}}
				/>
			</div>
		{/if}
	</div>
</div>
{@render children()}
<footer class="footer sm:footer-horizontal bg-base-100 text-base-content p-10">
	<aside>
		{#if theme === 'dark'}
			<img src={darkLogo} alt="dark-logo" class="h-24" />
		{:else if theme === 'light'}
			<img src={lightLogo} alt="dark-logo" class="h-24" />
		{:else}
			<img src={lightLogo} alt="dark-logo" class="h-24" />
		{/if}

		<p>
			sunnypilot
			<br />
			Built with ❤️ for you.
		</p>
	</aside>

	<nav>
		<h6 class="footer-title">Company</h6>
		<a class="link link-hover">About us</a>
		<a class="link link-hover" href="https://github.com/sunnypilot/sunnypilot">Github</a>
		<a class="link link-hover" href="https://discord.gg/sunnypilot">Discord</a>
	</nav>
	<nav>
		<h6 class="footer-title">Legal</h6>
		<a class="link link-hover">Terms of use</a>
		<a class="link link-hover">Privacy policy</a>
		<a class="link link-hover">Cookie policy</a>
	</nav>
</footer>
