<script lang="ts">
	import { page } from "$app/stores";

	let difficulty: number;

	difficulty = parseInt($page.url.searchParams.get("dif") || "2") || 2;

	// gets a Difficulty Name by a Number
	function getDif(number: number): string {
		switch (number) {
			case 1:
				return "Easy";
			case 2:
				return "Medium";
			case 3:
				return "Hard";
			case 4:
				return "Unbeatable";
			default:
				return "???";
		}
	}
</script>

<svelte:head>
	<title>Learn</title>
	<meta name="description" content="Learn Calculating" />
</svelte:head>

<!--  Type Selection  -->
<section class="p-0">
	<!-- svelte-ignore a11y-missing-content -->
	<a class="btn btn-close" aria-label="Close" href="/" />

	<h3 class="d-flex justify-content-center mb-3">Learn</h3>
	<p class="text-center">
		Welcome to the Learn Mode! You have in total {3 - (difficulty > 2 ? 1 : 0)} Lives and therefore {4 -
			(difficulty > 2 ? 1 : 0)} tries. On wrong answers you'll get hints! Select below which kind of
		Calculating you want to improve and what difficulty you want to exceed in.
	</p>
	<label for="difficulty-range" class="form-label">Difficulty: {getDif(difficulty)}</label>
	<input
		type="range"
		class="form-range"
		min="1"
		max="4"
		id="difficulty-range"
		bind:value={difficulty}
	/>
	<div class="row pb-3 mx-auto m-0">
		<div class="col-sm-6 mb-3 mb-sm-0 d-grid gap-3 p-0 pe-sm-2">
			<a class="btn btn-primary" type="button" href="/learn/add?dif={difficulty}">Addition</a>
		</div>
		<div class="col-sm-6 d-grid gap-3 p-0 p-0 ps-sm-2">
			<a class="btn btn-primary" type="button" href="/learn/sub?dif={difficulty}">Subtraction</a>
		</div>
	</div>
	<div class="row pb-3 mx-auto">
		<div class="col-sm-6 mb-3 mb-sm-0 d-grid gap-3 p-0 pe-sm-2">
			<a class="btn btn-primary" type="button" href="/learn/mul?dif={difficulty}">Multiplication</a>
		</div>
		<div class="col-sm-6 d-grid gap-3 p-0 ps-sm-2">
			<a class="btn btn-primary" type="button" href="/learn/div?dif={difficulty}">Division</a>
		</div>
	</div>
	<div class="row mx-auto">
		<div class="col-sm-6 mb-3 mb-sm-0 d-grid gap-3 p-0 pe-sm-2">
			<a class="btn btn-primary" type="button" href="/learn/pow?dif={difficulty}">Power</a>
		</div>
		<div class="col-sm-6 d-grid gap-3 p-0 ps-sm-2">
			<a class="btn btn-primary" type="button" href="/learn/root?dif={difficulty}">Square Root</a>
		</div>
	</div>
</section>

<style>
</style>
