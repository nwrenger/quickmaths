<script lang="ts">
	import LearnView, { Quests } from '../../../components/LearnView.svelte';
	import { getRandomInt } from '../../../lib/utils';

	function gen(count: number): Quests[] {
		let quests: Quests[] = [];
		for (let i = 1; i < count + 1; i++) {
			let a = getRandomInt(0, 300);
			let b = getRandomInt(0, 200);
			quests.push({ question: `${a} - ${b}`, answer: a - b });
		}
		return quests;
	}
</script>

<svelte:head>
	<title>Subtraction</title>
	<meta name="description" content="Learning Subtraction" />
</svelte:head>

<section>
	<LearnView quests={gen(5)} />
</section>
