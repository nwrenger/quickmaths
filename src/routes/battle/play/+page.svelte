<script lang="ts">
	import { getRandomInt } from "$lib/utils";
	import BattleView, { Answer } from "./BattleView.svelte";

	// Generates random questions
	function gen(count: number): Answer[] {
		let quests: Answer[] = [];
		for (let i = 1; i < count + 1; i++) {
			let a = getRandomInt(0, 300);
			let b = getRandomInt(0, 300);
			let type = getRandomInt(0, 5);
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
					a = getRandomInt(0, 20);
					b = getRandomInt(0, 20);
					question = `${a} * ${b}`;
					answer = a * b;
					break;
				case 3:
					while (a % b !== 0 || a / b === 1) {
						a = getRandomInt(2, 300);
						b = getRandomInt(2, 300);
					}
					question = `${a} / ${b}`;
					answer = a / b;
					break;
				case 4:
					a = getRandomInt(2, 12);
					b = getRandomInt(2, 3);
					question = `${a} ^ ${b}`;
					answer = a ** b;
					break;
				case 5:
					a = getRandomInt(2, 12);
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
	<title>Playing</title>
	<meta name="description" content="Playing with a Friend" />
</svelte:head>

<!--  Giving the generated questions to the view component  -->
<section>
	<BattleView quests={gen(getRandomInt(5, 7))} />
</section>
