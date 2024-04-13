<script lang="ts">
	import '../app.postcss';
	import '@fortawesome/fontawesome-free/css/all.css';

	//app
	import {
		AppShell,
		LightSwitch,
		Modal,
		storePopup,
		type PopupSettings,
		popup,
		setInitialClassState
	} from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// stores
	import { initializeStores } from '@skeletonlabs/skeleton';
	import ImageLoader from './ImageLoader.svelte';
	initializeStores();

	const app: PopupSettings = {
		event: 'click',
		target: 'appContents',
		placement: 'bottom'
	};
</script>

<svelte:head>{@html '<script>(' + setInitialClassState.toString() + ')();</script>'}</svelte:head>

<!-- Modal Store -->
<Modal />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="pageHeader">
		<!-- Page Container -->
		<div class="page-container !max-w-6xl mx-auto grid grid-cols-[1fr_auto] items-center gap-4 p-4">
			<button type="button" class="btn-icon" use:popup={app} title="dashboard">
				<ImageLoader src="/favicon.png" alt="quickmaths" rounded="rounded-md" />
			</button>

			<div class="card p-4 w-72 shadow-xl z-10" data-popup="appContents">
				<div class="space-y-4">
					<div>
						<div class="flex">
							<span class="font-bold flex-auto">quickmaths</span>
							<a
								class="anchor"
								href="https://github.com/nwrenger/quickmaths"
								target="_blank"
								title="Repository"><i class="fa-solid fa-up-right-from-square" /></a
							>
						</div>
						<div class="flex">
							<span class="opacity-50 flex-auto">nwrenger</span>
							<a class="anchor" href="https://github.com/nwrenger" target="_blank" title="Profile"
								><i class="fa-solid fa-up-right-from-square" /></a
							>
						</div>
					</div>
					<p>A school project...QUICKMATHS!!!</p>
				</div>
				<div class="arrow bg-surface-100-800-token" />
			</div>
			<LightSwitch
				class="bg-surface-50/50 dark:bg-surface-900/50 backdrop-blur-xl shadow-xl"
				ring="ring-none"
			/>
		</div>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
