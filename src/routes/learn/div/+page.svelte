<script lang="ts">
	import LearnView, { Quests } from "../LearnView.svelte";
	import { getRandomInt } from "../../../lib/utils";

	// Generates random questions
	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i <= count; i++) {
			let a = getRandomInt(0, 1000);
			let b = getRandomInt(1, 1000);
			while (a !== 0 && b !== 0 && a % b !== 0) {
				a = getRandomInt(0, 1000);
				b = getRandomInt(1, 1000);
			}
			quests.push({ question: `${a} / ${b}`, answer: a / b });
		}
		return quests;
	}
</script>

<svelte:head>
	<title>Division</title>
	<meta name="description" content="Learning Division" />
</svelte:head>

<!--  Giving the generated questions to the view component  -->
<section>
	<LearnView quests={gen(getRandomInt(3, 6))} />
</section>
