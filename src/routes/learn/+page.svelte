<script lang="ts">
	import { page } from '$app/stores';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let difficulty: number = 2;
	let type: string = 'rand';

	onMount(() => {
		difficulty = parseInt($page.url.searchParams.get('dif') || '2') || 2;
		type = $page.url.searchParams.get('type') || 'rand';
	});
</script>

<svelte:head>
	<title>Learn</title>
	<meta name="description" content="Learn Calculating" />
</svelte:head>

<!--  Type Selection  -->
<div class="container space-y-8 flex flex-col items-center text-center !max-w-6xl mx-auto p-4">
	<h2 class="h2">Learn</h2>
	<p>
		Welcome to the Learn Mode! You have in total {3 - (difficulty > 2 ? 1 : 0)} Lives and therefore
		{4 - (difficulty > 2 ? 1 : 0)} tries. On wrong answers you'll get hints! Select below what difficulty
		you want to exceed in and which kind of Calculating you want to improve.
	</p>
	<div class="grid grid-cols-2 md:grid-cols-1 gap-4 w-full">
		<div>
			<h3 class="h3">Difficulty:</h3>
			<RadioGroup
				rounded="rounded-container-token md:rounded-token"
				display="!md:flex md:inline-flex"
			>
				<RadioItem bind:group={difficulty} name="justify" value={1}>Easy</RadioItem>
				<RadioItem bind:group={difficulty} name="justify" value={2}>Medium</RadioItem>
				<RadioItem bind:group={difficulty} name="justify" value={3}>Hard</RadioItem>
				<RadioItem bind:group={difficulty} name="justify" value={4}>Unbeatable</RadioItem>
			</RadioGroup>
		</div>

		<div>
			<h3 class="h3">Mode:</h3>
			<RadioGroup
				rounded="rounded-container-token md:rounded-token"
				display="!md:flex md:inline-flex"
			>
				<RadioItem bind:group={type} name="justify" value={'rand'}>Random</RadioItem>
				<RadioItem bind:group={type} name="justify" value={'add'}>Addition</RadioItem>
				<RadioItem bind:group={type} name="justify" value={'sub'}>Subtraction</RadioItem>
				<RadioItem bind:group={type} name="justify" value={'mul'}>Multiplication</RadioItem>
				<RadioItem bind:group={type} name="justify" value={'div'}>Division</RadioItem>
				<RadioItem bind:group={type} name="justify" value={'pow'}>Power</RadioItem>
				<RadioItem bind:group={type} name="justify" value={'root'}>Square Root</RadioItem>
			</RadioGroup>
		</div>
	</div>

	<div class="flex">
		<a href="/" class="btn variant-ghost me-2">Back</a>
		<a href="/learn/{type}?dif={difficulty}" class="btn variant-filled">Start</a>
	</div>
</div>
