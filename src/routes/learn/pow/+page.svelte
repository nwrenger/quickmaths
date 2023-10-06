<script lang="ts">
	import LearnView, { Quests } from "../LearnView.svelte";
	import { difCount, getRandomInt } from "../../../lib/utils";
	import { page } from "$app/stores";

	let difficulty = parseInt($page.url.searchParams.get("dif") || "2");

	// Generates random questions
	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i < count + 1; i++) {
			let a = getRandomInt(2 * difficulty, 6 * difficulty);
			let b = getRandomInt(2, difficulty > 1 ? (difficulty > 3 ? 4 : 3) : 2);
			while (quests.find((quest) => quest.answer == a ** b)) {
				a = getRandomInt(2 * difficulty, 6 * difficulty);
				b = getRandomInt(2, difficulty > 1 ? (difficulty > 3 ? 4 : 3) : 2);
			}
			quests.push({ question: `${a} ^ ${b}`, answer: a ** b });
		}
		return quests;
	}
</script>

<svelte:head>
	<title>Power</title>
	<meta name="description" content="Learning Power" />
</svelte:head>

<!--  Giving the generated questions to the view component  -->
<section>
	<LearnView quests={gen(difCount(difficulty))} {difficulty} />
</section>
