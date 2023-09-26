<script>
	import BattleView from "./BattleView.svelte";
</script>

<svelte:head>
	<title>Playing</title>
	<meta name="description" content="Playing with a Friend" />
</svelte:head>

<section>
	<BattleView
		quests={[
			{ question: "1+1", answer: 2 },
			{ question: "1-1", answer: 0 },
			{ question: "1*1", answer: 1 }
		]}
	/>
</section>
