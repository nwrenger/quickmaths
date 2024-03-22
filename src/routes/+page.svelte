<svelte:head>
	<title>Quickmaths</title>
	<meta name="description" content="Start your journey with QuickMaths by selecting a mode." />
</svelte:head>

<!--  Welcome Container with game selection  -->
<div class="container h-full mx-auto flex justify-center">
	<div class="space-y-5 flex flex-col items-center text-center lg:w-2/3 w-11/12 pt-4 pb-4">
		<h2 class="h2">Welcome to QuickMaths!</h2>
		<p>
			Embark on a fun journey to master calculations. Whether you want to learn at your own pace or
			challenge a friend, we've got you covered.
		</p>
		<h3 class="h3">Select Your Mode:</h3>
		<a href="/learn" class="btn variant-filled">Learn</a>
		<a href="/battle" class="btn variant-filled">Local Co-op</a>
	</div>
</div>
