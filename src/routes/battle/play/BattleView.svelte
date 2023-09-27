<script lang="ts" context="module">
	export class Answer extends Quests {
		player?: "1" | "2";
	}
</script>

<script lang="ts">
	import { Tab } from "bootstrap";
	import Dialog from "../../../components/Dialog.svelte";
	import { Quests } from "../../learn/LearnView.svelte";

	export let quests: Answer[];

	let time = 0;
	let answering: undefined | "1" | "2";
	let finished = false;

	let points1 = 0;
	let points2 = 0;

	// checking if answering reactively
	$: if (answering) {
		increaseTime();
	}

	// using sveltes intervall func, just a macro
	function increaseTime() {
		const interval = setInterval(() => {
			if (!answering) {
				clearInterval(interval);
				return;
			}
			time += 1;
			if (time >= 100) {
				clearInterval(interval);
			}
		}, 100);
	}

	let resultsDialog: Dialog;

	// get answer
	function getAnswer(i: number): boolean {
		quests[i].player = answering;
		answering = undefined;
		let element = document.getElementById(`answer-${i}`) as HTMLInputElement;
		if (element) {
			quests[i].userInput = parseInt(element.value);
		}
		return true;
	}

	// validate answer
	function validateAnswer(i: number) {
		if (quests[i].userInput !== quests[i].answer) {
			quests[i].isIncorrect = true;
		} else {
			quests[i].isIncorrect = false;
		}
	}

	// macro for jumping to the tabs
	function advance(string: string) {
		time = 0;
		const triggerEl = document.querySelector(`#tab button[data-bs-target="#${string}"]`);
		if (triggerEl) {
			const instance = Tab.getOrCreateInstance(triggerEl);
			if (instance) {
				instance.show();
			} else {
				return "wtf";
			}
		}
	}

	// Increases Player Points, with also looking to wrong and right criteria!
	function increasePlayerPoints(player: "1" | "2" | undefined, isIncorrect: boolean | undefined) {
		if (player == "1") {
			if (isIncorrect) {
				points2 = points2 + 1;
			} else {
				points1 = points1 + 1;
			}
		} else {
			if (isIncorrect) {
				points1 = points1 + 1;
			} else {
				points2 = points2 + 1;
			}
		}
	}
</script>

<!--  Back Button  -->
<div class="row align-items-center mx-auto">
	<div class="col p-0 mb-2">
		<!-- svelte-ignore a11y-missing-content -->
		<a class="btn btn-close" aria-label="Close" href="/battle" />
	</div>
</div>

<!--  Key Input Event Handler  -->
<svelte:window
	on:keydown={(e) => {
		if (!answering && !finished)
			if (e.key === "s") {
				answering = "1";
			} else if (e.key === "k") {
				answering = "2";
			}
	}}
/>
<!--  Player Overview  -->
<div class="row align-items-center mx-auto mb-2">
	<div class="text-center p-0 d-flex col justify-content-start">
		<span class="badge text-bg-{answering == '1' ? 'primary' : 'secondary'}"
			>Player 1: {points1}</span
		>
	</div>
	<div class="text-center p-0 d-flex col justify-content-end">
		<span class="badge text-bg-{answering == '2' ? 'primary' : 'secondary'}"
			>Player 2: {points2}</span
		>
	</div>
</div>
<!--  Progress Bar  -->
<div
	class="progress"
	role="progressbar"
	aria-label="Basic example"
	aria-valuenow={time}
	aria-valuemin={0}
	aria-valuemax={100}
>
	<div
		class="progress-bar {time >= 100 ? 'bg-danger' : ''} {answering
			? 'progress-bar-striped progress-bar-animated'
			: ''}"
		style="width: {time}%"
	>
		{time / 10}s
	</div>
</div>

<!--  Qustions View and Answer Input  -->
<ul class="nav nav-pills mb-3 mt-2" id="tab" role="tablist">
	{#each quests as _quest, index}
		<li class="nav-item" role="presentation">
			<button
				class="nav-link {index === 0 ? 'active' : ''}"
				id="Question-{index}-tab"
				data-bs-toggle="pill"
				data-bs-target="#Question-{index}"
				type="button"
				role="tab"
				disabled
				aria-controls="Question-{index}">Question {index + 1}</button
			>
		</li>
	{/each}
	<li class="nav-item" role="presentation" />
</ul>
<div class="tab-content" id="pills-tabContent">
	{#each quests as quest, index}
		<div
			class="tab-pane fade {index === 0 ? 'show active' : ''}"
			id="Question-{index}"
			role="tabpanel"
			aria-labelledby="Question-{index}-tab"
			tabindex="0"
		>
			<div class="mb-3">
				<label for="Question-{index}-input" class="form-label">What is {quest.question}?</label>
				<input
					type="number"
					class="form-control {quest.isIncorrect
						? 'is-invalid'
						: quest.isIncorrect === false
						? 'is-valid'
						: ''}"
					id="answer-{index}"
					placeholder="Input answer..."
					required
					disabled={!answering || time >= 100}
					on:keypress={(e) => {
						if (e.key == "Enter") {
							getAnswer(index);
							validateAnswer(index);
							increasePlayerPoints(quest.player, quest.isIncorrect);
							finished = true;
						}
					}}
				/>
				<div class="valid-feedback">Looks good!</div>
				<div class="invalid-feedback">Wrong! Correct would be {quest.answer}</div>
			</div>
			{#if answering}
				<button
					type="button"
					class="btn btn-primary"
					on:click={() => {
						getAnswer(index);
						validateAnswer(index);
						increasePlayerPoints(quest.player, quest.isIncorrect);
						finished = true;
					}}>Log In</button
				>
			{:else if !finished && points1 + points2 < quests.length}
				<div class="row align-items-center mx-auto pt-5">
					<div class="p-0 d-flex col justify-content-start">
						<button class="btn btn-primary" type="button" on:click={() => (answering = "1")}
							>Player 1 ("K" Key)</button
						>
					</div>
					<div class="p-0 d-flex col justify-content-end">
						<button class="btn btn-primary" type="button" on:click={() => (answering = "2")}
							>Player 2 ("S" Key)</button
						>
					</div>
				</div>
			{/if}
			{#if finished || points1 + points2 >= quests.length}
				{#if quests[index + 1]}
					<button
						type="button"
						class="btn btn-primary"
						on:click={() => {
							advance(`Question-${index + 1}`);
							finished = false;
						}}>Next</button
					>
				{:else}
					<button
						type="button"
						class="btn btn-danger"
						on:click={() => {
							resultsDialog.open();
							finished = false;
						}}>Finish</button
					>
				{/if}
			{/if}
		</div>
	{/each}
</div>

<!--  Dialog for results  -->
<Dialog bind:this={resultsDialog}>
	<span slot="header"> Info </span>
	<div class="text-center" slot="body">
		<h3 class="text-success">Congratulations!</h3>
		<p>{points1 == points2 ? "both??" : points1 > points2 ? "Player 1" : "Player 2"} Won!</p>
		<a class="btn btn-primary" href="/battle">Ok!</a>
	</div>
</Dialog>
