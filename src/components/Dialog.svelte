<script lang="ts">
	let dialog: HTMLDialogElement;

	export function open() {
		if (!dialog.attributes.getNamedItem("open")) {
			dialog.showModal();
		}
	}
</script>

<dialog class="custom-dialog" bind:this={dialog} on:close>
	<div class="card">
		<div class="card-header d-flex justify-content-between">
			<slot name="header" />
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-missing-attribute -->
			<a
				type="button"
				class="btn-close justify-content-end"
				data-bs-dismiss="modal"
				aria-label="Close"
				on:click={() => dialog.close()}
			/>
		</div>
		<div class="card-body">
			<slot name="body" />
		</div>
	</div>
</dialog>

<style>
	.custom-dialog {
		padding: 0px;
		height: fit-content;
		width: 20rem;
		border: none;
		position: relative;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.4);
	}
	.card-body {
		overflow-y: auto;
	}
</style>
