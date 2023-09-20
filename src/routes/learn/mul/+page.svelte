<script lang="ts">
	import LearnView, { Quests } from "../LearnView.svelte";
	import { getRandomInt } from "../../../lib/utils";

	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i < count + 1; i++) {
			let a = getRandomInt(0, 200);
			let b = getRandomInt(0, 40);
			quests.push({ question: `${a} * ${b}`, answer: a * b });
		}
		return quests;
	}
</script>

<svelte:head>
	<title>Multiplication</title>
	<meta name="description" content="Learning Multiplication" />
</svelte:head>

<section>
	<LearnView quests={gen(5)} />
</section>
