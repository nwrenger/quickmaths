<script lang="ts">
	import LearnView, { type Quests } from '../LearnView.svelte';
	import { difCount, getRandomInt } from '../../../lib/utils';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let difficulty = 2;
	onMount(() => (difficulty = parseInt($page.url.searchParams.get('dif') || '2')));

	// Generates random questions
	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i < count + 1; i++) {
			let a = getRandomInt(0, 500 * difficulty);
			let b = getRandomInt(0, 500 * difficulty);
			let type = getRandomInt(0, 5);
			let question = '';
			let answer = 0;
			switch (type) {
				case 0:
					while (quests.find((quest) => quest.answer == a + b)) {
						a = getRandomInt(0, 500 * difficulty);
						b = getRandomInt(0, 500 * difficulty);
					}
					question = `${a} + ${b}`;
					answer = a + b;
					break;
				case 1:
					while (quests.find((quest) => quest.answer == a - b)) {
						a = getRandomInt(0, 500 * difficulty);
						b = getRandomInt(0, 500 * difficulty);
					}
					question = `${a} - ${b}`;
					answer = a - b;
					break;
				case 2:
					a = getRandomInt(0, 100 * difficulty);
					b = getRandomInt(0, 20 * difficulty);
					while (quests.find((quest) => quest.answer == a * b)) {
						a = getRandomInt(0, 100 * difficulty);
						b = getRandomInt(0, 20 * difficulty);
					}
					question = `${a} * ${b}`;
					answer = a * b;
					break;
				case 3:
					while (a % b !== 0 || a / b === 1 || quests.find((quest) => quest.answer == a / b)) {
						a = getRandomInt(2, 500 * difficulty);
						b = getRandomInt(2, 500 * difficulty);
					}
					question = `${a} / ${b}`;
					answer = a / b;
					break;
				case 4:
					a = getRandomInt(2 * difficulty, 6 * difficulty);
					b = getRandomInt(2, difficulty > 1 ? (difficulty > 3 ? 4 : 3) : 2);
					while (quests.find((quest) => quest.answer == a ** b)) {
						a = getRandomInt(2 * difficulty, 6 * difficulty);
						b = getRandomInt(2, difficulty > 1 ? (difficulty > 3 ? 4 : 3) : 2);
					}
					question = `${a} ^ ${b}`;
					answer = a ** b;
					break;
				case 5:
					a = getRandomInt(2 * difficulty, 12 * difficulty);
					while (quests.find((quest) => quest.answer == Math.sqrt(a ** 2))) {
						a = getRandomInt(2 * difficulty, 12 * difficulty);
					}
					question = `√${a ** 2}`;
					answer = Math.sqrt(a ** 2);
					break;
				default:
					break;
			}
			quests.push({ question, answer });
		}
		return quests;
	}
</script>

<svelte:head>
	<title>Random</title>
	<meta name="description" content="Learning Random Stuff" />
</svelte:head>

<!--  Giving the generated questions to the view component  -->
<section>
	<LearnView quests={gen(difCount(difficulty))} type="rand" />
</section>
