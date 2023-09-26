<script lang="ts" context="module">
	export class Answer extends Quests {
		player?: "1" | "2";
	}
</script>

<script lang="ts">
	import { Carousel } from "bootstrap";
	import Dialog from "../../../components/Dialog.svelte";
	import { Quests } from "../../learn/LearnView.svelte";
	import { getRandomInt } from "$lib/utils";

	export let answer: Answer[];

	let time = 0;
	let answers: number[][];
	let answering = false;

	answers = answer.map((quest) => generateChoices(quest.answer));

	$: console.log(time);
	$: if (answering) {
		increaseTime();
	} else {
		time = 0;
	}

	function increaseTime() {
		const interval = setInterval(() => {
			if (answering) {
				time += 1;
				if (time >= 100) {
					clearInterval(interval);
				}
			}
		}, 100);
	}

	let resultsDialog: Dialog;

	// get answer
	function getAnswer(i: number): boolean {
		let elements = document.querySelectorAll(`.answer-${i}`) as NodeListOf<HTMLInputElement>;
		let selected = false;
		for (const element of elements) {
			if (element.checked) {
				answer[i].userInput = parseInt(element.value);
				selected = true;
			}
		}
		if (!selected) {
			return false;
		}
		return true;
	}

	// validate all answers
	function validateAnswer(quest: Answer): boolean {
		if (quest.userInput !== quest.answer) {
			quest.isIncorrect = true;
			return true;
		} else {
			quest.isIncorrect = false;
			return false;
		}
	}

	// macro for jumping to the tabs
	function advance(string: string) {
		const triggerEl = document.querySelector(`#${string}`);
		if (triggerEl) {
			const instance = new Carousel(triggerEl);
			if (instance) {
				instance.next();
			} else {
				return "wtf";
			}
		}
	}

	function generateChoices(correctAnswer: number): number[] {
		let choices: number[] = [];

		// Generate two unique wrong answers.
		const offset1 = getRandomInt(1, 5); // Change 1 and 5 to control the range of offset
		const offset2 = getRandomInt(1, 5);

		const wrongAnswer1 = correctAnswer + offset1;
		const wrongAnswer2 = correctAnswer - offset2;

		// Random position for correct answer
		const correctPosition = getRandomInt(0, 2);

		choices[correctPosition] = correctAnswer;
		choices[(correctPosition + 1) % 3] = wrongAnswer1;
		choices[(correctPosition + 2) % 3] = wrongAnswer2;

		return choices;
	}
</script>

<!--  Back Button  -->
<div class="row align-items-center mx-auto">
	<div class="col p-0 mb-2">
		<!-- svelte-ignore a11y-missing-content -->
		<a class="btn btn-close" aria-label="Close" href="/battle" />
	</div>
</div>

<svelte:window
	on:keydown={(e) => {
		if (!answering)
			if (e.key === "s") {
				console.log("Player 1");
				answering = true;
			} else if (e.key === "k") {
				console.log("Player 2");
				answering = true;
			}
	}}
/>

{#if answering}
	<div
		class="progress"
		role="progressbar"
		aria-label="Basic example"
		aria-valuenow={time}
		aria-valuemin={0}
		aria-valuemax={100}
	>
		<div class="progress-bar" style="width: {time}%" />
	</div>
{:else}
	<div>
		{"Player 1 Press 'S' Player 2 Press 'K' to answer"}
	</div>
{/if}
<div id="carousel" class="carousel slide">
	<div class="carousel-inner">
		{#each answer as quest, index}
			<div class="carousel-item {index == 0 ? 'active' : ''}">
				<div class="mb-3 mt-2">
					<p class="form-label">What is {quest.question}?</p>
				</div>
				{#each answers[index] as choice, i}
					<div class="input-group mb-3">
						<div class="input-group-text">
							<input
								class="form-check-input mt-0 answer-{index}"
								type="radio"
								name="answer-{index}"
								value={choice}
								aria-label="Radio button for following text input"
								disabled={!answering}
							/>
						</div>
						<input type="text" class="form-control" value={choice} disabled />
					</div>
				{/each}
				{#if answering}
					{#if answer[index + 1]}
						<button
							type="button"
							class="btn btn-primary"
							on:click={() => {
								answering = false;
								advance(`carousel`);
								getAnswer(index);
								validateAnswer(quest);
							}}>Next</button
						>
					{:else}
						<button
							type="button"
							class="btn btn-danger"
							on:click={() => {
								answering = false;
								getAnswer(index);
								validateAnswer(quest);
								resultsDialog.open();
							}}>Finish</button
						>
					{/if}
				{/if}
			</div>
		{/each}
	</div>
</div>

<!--  Dialog for results  -->
<Dialog bind:this={resultsDialog}>
	<span slot="header"> Info </span>
	<div class="text-center" slot="body">
		<h3 class="text-success">Congratulations!</h3>
		<p>Player ? Won!</p>
		<a class="btn btn-primary" href="/battle">Ok!</a>
	</div>
</Dialog>
