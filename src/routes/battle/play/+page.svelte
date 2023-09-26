<script lang="ts">
	import { getRandomInt } from "$lib/utils";
	import BattleView, { Answer } from "./BattleView.svelte";

	// Generates random questions
	function gen(count: number): Answer[] {
		let quests: Answer[] = [];
		for (let i = 1; i < count + 1; i++) {
			let a = getRandomInt(0, 300);
			let b = getRandomInt(0, 300);
			let type = getRandomInt(0, 3);
			let question = "";
			let answer = 0;
			switch (type) {
				case 0:
					question = `${a} + ${b}`;
					answer = a + b;
					break;
				case 1:
					question = `${a} - ${b}`;
					answer = a - b;
					break;
				case 2:
					question = `${a} * ${b}`;
					answer = a * b;
					break;
				case 3:
					while (a !== 0 && b !== 0 && a % b !== 0) {
						a = getRandomInt(0, 300);
						b = getRandomInt(1, 300);
					}
					question = `${a} / ${b}`;
					answer = a / b;
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
	<title>Playing</title>
	<meta name="description" content="Playing with a Friend" />
</svelte:head>

<section>
	<BattleView quests={gen(5)} />
</section>
