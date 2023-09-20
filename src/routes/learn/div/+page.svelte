<script lang="ts">
	import LearnView, { Quests } from '../LearnView.svelte';
	import { getRandomInt } from '../../../lib/utils';

	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i <= count; i++) {
			let a = getRandomInt(0, 400);
			let b = getRandomInt(1, 80);
			while (a % b !== 0) {
				a = getRandomInt(0, 400);
				b = getRandomInt(1, 80);
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

<section>
	<LearnView quests={gen(5)} />
</section>
