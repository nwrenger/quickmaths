<svelte:head>
	<title>Battle</title>
	<meta name="description" content="Battle with a Friend" />
</svelte:head>

<!--  Introduction to Battle Mode  -->
<div class="container space-y-8 flex flex-col items-center text-center !max-w-6xl mx-auto p-4">
	<h2 class="h2">Battle!</h2>
	<p>
		Get your friend to play one round of ultimate QuickMaths. You both have a buzzer which you need
		to press when you know the answer. For Player 1 Press S to answer and for Player 2 Press L to
		answer. This won't work great on mobile devices without Keyboards! Now Start and beat you other
		Asses!
	</p>
	<div class="flex">
		<a href="/" class="btn variant-ghost me-2">Back</a>
		<a href="/battle/play" class="btn variant-filled">Start</a>
	</div>
</div>
