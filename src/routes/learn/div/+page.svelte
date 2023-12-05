<script lang="ts">
	import LearnView, { type Quests } from '../LearnView.svelte';
	import { difCount, getRandomInt } from '../../../lib/utils';
	import { page } from '$app/stores';

	let difficulty = parseInt($page.url.searchParams.get('dif') || '2');

	// Generates random questions
	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i <= count; i++) {
			let a = getRandomInt(2, 500 * difficulty);
			let b = getRandomInt(2, 500 * difficulty);
			while (a % b !== 0 || a / b === 1 || quests.find((quest) => quest.answer == a / b)) {
				a = getRandomInt(2, 500 * difficulty);
				b = getRandomInt(2, 500 * difficulty);
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
	<LearnView quests={gen(difCount(difficulty))} {difficulty} type="div" />
</section>
