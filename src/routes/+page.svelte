<svelte:head>
	<title>Welcome to Quickmaths</title>
	<meta name="description" content="Start your journey with Quickmaths by selecting a mode." />
</svelte:head>

<!--  Welcome Container with game selection  -->
<section class="container mt-2">
	<div class="row">
		<div class="col-lg-8 mx-auto text-center">
			<h3>Welcome to Quickmaths!</h3>
			<p class="mb-4">
				Embark on a fun journey to master calculations. Whether you want to learn at your own pace
				or challenge a friend, we've got you covered.
			</p>
		</div>
	</div>

	<div class="row">
		<div class="text-center mb-3">
			<h4>Select Your Mode</h4>
		</div>
	</div>

	<div class="row">
		<div class="text-center mb-3">
			<a class="btn btn-primary" href="/learn">Learn</a>
		</div>
		<div class="text-center">
			<a class="btn btn-primary" href="/battle">Local Co-op</a>
		</div>
	</div>
</section>
