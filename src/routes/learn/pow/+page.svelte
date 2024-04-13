<script lang="ts">
	import LearnView, { type Quests } from '../LearnView.svelte';
	import { difCount, getRandomInt } from '../../../lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	// Generates random questions
	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i < count + 1; i++) {
			let a = getRandomInt(2 * data.difficulty, 6 * data.difficulty);
			let b = getRandomInt(2, data.difficulty > 1 ? (data.difficulty > 3 ? 4 : 3) : 2);
			while (quests.find((quest) => quest.answer == a ** b)) {
				a = getRandomInt(2 * data.difficulty, 6 * data.difficulty);
				b = getRandomInt(2, data.difficulty > 1 ? (data.difficulty > 3 ? 4 : 3) : 2);
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
	<LearnView quests={gen(difCount(data.difficulty))} difficulty={data.difficulty} type="pow" />
</section>
