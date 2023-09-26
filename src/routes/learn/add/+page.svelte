<script lang="ts">
	import LearnView, { Quests } from "../LearnView.svelte";
	import { getRandomInt } from "../../../lib/utils";

	// Generates random questions
	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i < count + 1; i++) {
			let a = getRandomInt(0, 1000);
			let b = getRandomInt(0, 1000);
			quests.push({ question: `${a} + ${b}`, answer: a + b });
		}
		return quests;
	}
</script>

<svelte:head>
	<title>Addition</title>
	<meta name="description" content="Learning Addition" />
</svelte:head>

<!--  Giving the generated questions to the view component  -->
<section>
	<LearnView quests={gen(5)} />
</section>
