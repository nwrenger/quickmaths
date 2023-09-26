<script lang="ts" context="module">
	export class Quests {
		question!: string;
		answer!: number;
		isIncorrect?: boolean;
		userInput?: number;
	}
</script>

<script lang="ts">
	import { Tab } from "bootstrap";
	import Dialog from "../../../components/Dialog.svelte";

	export let quests: Quests[];

	let correctDialog: Dialog;
	let incorrectDialog: Dialog;

	// total lives
	let lives: number = 3;

	// get all answers from all fields
	function getAnswers(end: number): number[] {
		let ret: number[] = [];
		for (let i = 0; i < end + 1; i++) {
			let element = document.getElementById(`Question-${i}-input`) as HTMLInputElement;
			if (element) {
				quests[i].userInput = parseInt(element.value);
			}
		}
		return ret;
	}

	// validate all answers
	function validateAnswer(quest: Quests): boolean {
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
</script>

<!--  Back Button  -->
<div class="row align-items-center mx-auto">
	<div class="col p-0">
		<!-- svelte-ignore a11y-missing-content -->
		<a class="btn btn-close" aria-label="Close" href="/battle" />
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
				aria-controls="Question-{index}"
				disabled>Question {index + 1}</button
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
				<p class="form-label">What is {quest.question}?</p>
				<div class="btn-group" role="group" id="Question-{index}-input">
					<input
						type="radio"
						class="btn-check"
						name="btnradio"
						id="answer1-{index}"
						autocomplete="off"
					/>
					<label class="btn btn-outline-primary" for="answer1-{index}">{quest.answer}</label>

					<input
						type="radio"
						class="btn-check"
						name="btnradio"
						id="answer2-{index}"
						autocomplete="off"
					/>
					<label class="btn btn-outline-primary" for="answer2-{index}">{quest.answer}</label>

					<input
						type="radio"
						class="btn-check"
						name="btnradio"
						id="answer3-{index}"
						autocomplete="off"
					/>
					<label class="btn btn-outline-primary" for="answer3-{index}">{quest.answer}</label>
				</div>
			</div>
			{#if quests[index + 1]}
				<button
					type="button"
					class="btn btn-primary"
					on:click={() => advance(`Question-${index + 1}`)}>Next</button
				>
			{:else}
				<button
					type="button"
					class="btn btn-danger"
					on:click={() => {
						getAnswers(index);
						if (validateAnswer(quest)) {
							correctDialog.open();
						} else {
							lives -= 1;
						}
						if (lives < -1) incorrectDialog.open();
					}}>Finish</button
				>
			{/if}
		</div>
	{/each}
</div>

<!--  Dialog for winning  -->
<Dialog bind:this={correctDialog}>
	<span slot="header"> Info </span>
	<div class="text-center" slot="body">
		<h3 class="text-success">Congratulations!</h3>
		<p>You did it correct! Rating of your powers: {lives}/3</p>
		<a class="btn btn-primary" href="/battle">Ok!</a>
	</div>
</Dialog>

<!--  Dialog for losing  -->
<Dialog bind:this={incorrectDialog}>
	<span slot="header"> Info </span>
	<div class="text-center" slot="body">
		<h3 class="text-danger">No more Lives!</h3>
		<p>You couldn't do it..I know..</p>
		<a class="btn btn-primary" href="/battle">Ok!</a>
	</div>
</Dialog>
