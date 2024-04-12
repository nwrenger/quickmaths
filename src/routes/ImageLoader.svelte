<script lang="ts">
	export let src: string;
	export let alt = '';
	export let width = 'w-full';
	export let height = 'h-full';
	export let rounded = 'rounded-lg';

	const base = `${width} ${height} ${rounded}`;
	let loaded = false;

	function handleLoad() {
		loaded = true;
	}
</script>

{#if !loaded}
	<div class="{base} aspect-square placeholder animate-pulse" />
{/if}
<img
	{src}
	{alt}
	on:load={handleLoad}
	class="{base} object-cover shadow-md {!loaded ? 'hidden' : ''}"
/>
