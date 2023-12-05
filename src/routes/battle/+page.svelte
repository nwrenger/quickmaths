<svelte:head>
	<title>Battle</title>
	<meta name="description" content="Battle with a Friend" />
</svelte:head>

<!--  Introduction to Battle Mode  -->
<div class="container h-full mx-auto flex justify-center">
	<div class="space-y-5 flex flex-col items-center text-center lg:w-2/3 w-11/12 pt-4 pb-4">
		<h2 class="h2">Battle!</h2>
		<p>
			Get your friend to play one round of ultimate QuickMaths. You both have a buzzer which you
			need to press when you know the answer. For Player 1 Press S to answer and for Player 2 Press
			L to answer. This won't work great on mobile devices without Keyboards! Now Start and beat you
			other Asses!
		</p>
		<div class="flex">
			<a href="/" class="btn variant-ghost me-2">Back</a>
			<a href="/battle/play" class="btn variant-filled">Start</a>
		</div>
	</div>
</div>
