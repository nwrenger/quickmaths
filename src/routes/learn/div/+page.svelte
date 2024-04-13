<script lang="ts">
	import LearnView, { type Quests } from '../LearnView.svelte';
	import { difCount, getRandomInt } from '../../../lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	// Generates random questions
	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i <= count; i++) {
			let a = getRandomInt(2, 500 * data.difficulty);
			let b = getRandomInt(2, 500 * data.difficulty);
			while (a % b !== 0 || a / b === 1 || quests.find((quest) => quest.answer == a / b)) {
				a = getRandomInt(2, 500 * data.difficulty);
				b = getRandomInt(2, 500 * data.difficulty);
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
	<LearnView quests={gen(difCount(data.difficulty))} difficulty={data.difficulty} type="div" />
</section>
