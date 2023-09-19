<svelte:head>
	<title>Learn</title>
	<meta name="description" content="Learn Calculating" />
</svelte:head>

<section>
	<!-- svelte-ignore a11y-missing-content -->
	<a class="btn btn-close col text-start" href="/" />

	<h3 class="d-flex justify-content-center mb-3">Learn</h3>
	<p class="text-center">
		Welcome to the Learn Mode! Select below which kind of Calculating you want to improve. You have
		in total 3 Lives and therefore three tries. On wrong answers you'll get hints!
	</p>
	<div class="row pb-3 mx-auto m-0">
		<div class="col-sm-6 mb-3 mb-sm-0 d-grid gap-3">
			<a class="btn btn-primary" type="button" href="/learn/add">Addition</a>
		</div>
		<div class="col-sm-6 d-grid gap-3">
			<a class="btn btn-primary" type="button" href="/learn/sub">Subtraction</a>
		</div>
	</div>
	<div class="row mx-auto">
		<div class="col-sm-6 mb-3 mb-sm-0 d-grid gap-3">
			<a class="btn btn-primary" type="button" href="/learn/mul">Multiplication</a>
		</div>
		<div class="col-sm-6 d-grid gap-3">
			<a class="btn btn-primary" type="button" href="/learn/div">Division</a>
		</div>
	</div>
</section>
