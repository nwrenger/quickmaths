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
		popup
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
	const year = new Date().getFullYear();
</script>

<!-- Modal Store -->
<Modal />

<!-- App Shell -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
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
								title="Repository"
								aria-label="Repository"><i class="fa-solid fa-up-right-from-square" /></a
							>
						</div>
						<div class="flex">
							<span class="opacity-50 flex-auto">nwrenger</span>
							<a
								class="anchor"
								href="https://github.com/nwrenger"
								target="_blank"
								title="Profile"
								aria-label="Profile"><i class="fa-solid fa-up-right-from-square" /></a
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

	<svelte:fragment slot="pageFooter">
		<footer class="dark:border-surface-800 border-surface-200 border-t">
			<div
				class="mx-auto flex max-w-6xl flex-row items-center justify-between gap-3 px-4 py-6 text-sm"
			>
				<p class="text-surface-600 text-center text-xs sm:text-sm">
					<span class="opacity-80">© {year}</span> · <span class="font-medium">Nils Wrenger</span>
				</p>

				<div class="flex flex-wrap items-center gap-4">
					<a href="https://nwrenger.dev/privacy-policy" class="anchor text-center">Privacy Policy</a
					>
				</div>
			</div>
		</footer>
	</svelte:fragment>
</AppShell>
