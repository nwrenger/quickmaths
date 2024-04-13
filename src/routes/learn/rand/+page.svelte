<script lang="ts">
	import LearnView, { type Quests } from '../LearnView.svelte';
	import { difCount, getRandomInt } from '../../../lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	// Generates random questions
	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i < count + 1; i++) {
			let a = getRandomInt(0, 500 * data.difficulty);
			let b = getRandomInt(0, 500 * data.difficulty);
			let type = getRandomInt(0, 5);
			let question = '';
			let answer = 0;
			switch (type) {
				case 0:
					while (quests.find((quest) => quest.answer == a + b)) {
						a = getRandomInt(0, 500 * data.difficulty);
						b = getRandomInt(0, 500 * data.difficulty);
					}
					question = `${a} + ${b}`;
					answer = a + b;
					break;
				case 1:
					while (quests.find((quest) => quest.answer == a - b)) {
						a = getRandomInt(0, 500 * data.difficulty);
						b = getRandomInt(0, 500 * data.difficulty);
					}
					question = `${a} - ${b}`;
					answer = a - b;
					break;
				case 2:
					a = getRandomInt(0, 100 * data.difficulty);
					b = getRandomInt(0, 20 * data.difficulty);
					while (quests.find((quest) => quest.answer == a * b)) {
						a = getRandomInt(0, 100 * data.difficulty);
						b = getRandomInt(0, 20 * data.difficulty);
					}
					question = `${a} * ${b}`;
					answer = a * b;
					break;
				case 3:
					while (a % b !== 0 || a / b === 1 || quests.find((quest) => quest.answer == a / b)) {
						a = getRandomInt(2, 500 * data.difficulty);
						b = getRandomInt(2, 500 * data.difficulty);
					}
					question = `${a} / ${b}`;
					answer = a / b;
					break;
				case 4:
					a = getRandomInt(2 * data.difficulty, 6 * data.difficulty);
					b = getRandomInt(2, data.difficulty > 1 ? (data.difficulty > 3 ? 4 : 3) : 2);
					while (quests.find((quest) => quest.answer == a ** b)) {
						a = getRandomInt(2 * data.difficulty, 6 * data.difficulty);
						b = getRandomInt(2, data.difficulty > 1 ? (data.difficulty > 3 ? 4 : 3) : 2);
					}
					question = `${a} ^ ${b}`;
					answer = a ** b;
					break;
				case 5:
					a = getRandomInt(2 * data.difficulty, 12 * data.difficulty);
					while (quests.find((quest) => quest.answer == Math.sqrt(a ** 2))) {
						a = getRandomInt(2 * data.difficulty, 12 * data.difficulty);
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
	<LearnView quests={gen(difCount(data.difficulty))} difficulty={data.difficulty} type="rand" />
</section>
