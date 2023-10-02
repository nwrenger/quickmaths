<script lang="ts">
	import LearnView, { Quests } from "../LearnView.svelte";
	import { getRandomInt } from "../../../lib/utils";
	import { page } from "$app/stores";

	let difficulty = parseInt($page.url.searchParams.get("dif") || "2");

	// Generates random questions
	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i < count + 1; i++) {
			let a = getRandomInt(0, 500 * difficulty);
			let b = getRandomInt(0, 500 * difficulty);
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
	<LearnView quests={gen(difficulty * 2)} {difficulty} />
</section>
