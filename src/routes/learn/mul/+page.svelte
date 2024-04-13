<script lang="ts">
	import LearnView, { type Quests } from '../LearnView.svelte';
	import { difCount, getRandomInt } from '../../../lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	// Generates random questions
	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i < count + 1; i++) {
			let a = getRandomInt(0, 100 * data.difficulty);
			let b = getRandomInt(0, 20 * data.difficulty);
			while (quests.find((quest) => quest.answer == a * b)) {
				a = getRandomInt(0, 100 * data.difficulty);
				b = getRandomInt(0, 20 * data.difficulty);
			}
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
	<LearnView quests={gen(difCount(data.difficulty))} difficulty={data.difficulty} type="mul" />
</section>
