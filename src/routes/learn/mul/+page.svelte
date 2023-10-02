<script lang="ts">
	import LearnView, { Quests } from "../LearnView.svelte";
	import { difCount, getRandomInt } from "../../../lib/utils";
	import { page } from "$app/stores";

	let difficulty = parseInt($page.url.searchParams.get("dif") || "2");

	// Generates random questions
	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i < count + 1; i++) {
			let a = getRandomInt(0, 100 * difficulty);
			let b = getRandomInt(0, 20 * difficulty);
			quests.push({ question: `${a} * ${b}`, answer: a * b });
		}
		return quests;
	}
</script>

<svelte:head>
	<title>Multiplication</title>
	<meta name="description" content="Learning Multiplication" />
</svelte:head>

<!--  Giving the generated questions to the view component  -->
<section>
	<LearnView quests={gen(difCount(difficulty))} {difficulty} />
</section>
