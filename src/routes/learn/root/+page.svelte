<script lang="ts">
	import LearnView, { Quests } from "../LearnView.svelte";
	import { difCount, getRandomInt } from "../../../lib/utils";
	import { page } from "$app/stores";

	let difficulty = parseInt($page.url.searchParams.get("dif") || "2");

	// Generates random questions
	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i < count + 1; i++) {
			let a = getRandomInt(2, 12 * difficulty);
			while (quests.find((quest) => quest.answer == Math.sqrt(a ** 2))) {
				a = getRandomInt(2, 12 * difficulty);
			}
			quests.push({ question: `√${a ** 2}`, answer: Math.sqrt(a ** 2) });
		}
		return quests;
	}
</script>

<svelte:head>
	<title>Square Root</title>
	<meta name="description" content="Learning Square Root" />
</svelte:head>

<!--  Giving the generated questions to the view component  -->
<section>
	<LearnView quests={gen(difCount(difficulty))} {difficulty} />
</section>
