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
	import Dialog from "../../components/Dialog.svelte";

	export let quests: Quests[];
	export let difficulty: number;

	let correctDialog: Dialog;
	let incorrectDialog: Dialog;

	// total lives
	let lives: number = difficulty > 2 ? 3 : 2;

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
	function validateAnswers(): boolean {
		let allValid = true;
		let jump = true;
		quests.forEach((quest, index) => {
			if (quest.userInput !== quest.answer) {
				if (jump && !(lives < 0)) {
					advance(`Question-${index}`);
					jump = false;
				}
				quest.isIncorrect = true;
				allValid = false;
			} else {
				quest.isIncorrect = false;
			}
		});
		return allValid;
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

<!--  Lives Counter  -->
<div class="row align-items-center mx-auto">
	<div class="col p-0">
		<!-- svelte-ignore a11y-missing-content -->
		<a class="btn btn-close" aria-label="Close" href="/learn?dif={difficulty}" />
	</div>
	<div class="text-center p-0 d-flex col justify-content-end">
		Lives:
		<span class="badge text-bg-danger text-wrap ms-2">
			{lives < 0 ? "No More lives! The answers will be Shown!" : lives}
		</span>
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
					id="Question-{index}-input"
					placeholder="Input answer..."
					required
					readonly={lives < 0}
					on:keypress={(e) => {
						if (e.key == "Enter")
							if (quests[index + 1]) {
								advance(`Question-${index + 1}`);
							} else {
								getAnswers(index);
								if (validateAnswers()) {
									correctDialog.open();
								} else {
									lives -= 1;
								}
								if (lives < -1) incorrectDialog.open();
							}
					}}
				/>
				<div class="valid-feedback">Looks good!</div>
				<div class="invalid-feedback">
					Wrong, The correct value would be {lives >= 0
						? quest.userInput
							? quest.answer > quest.userInput
								? "Bigger"
								: "Smaller"
							: "Idk, Wrong Input"
						: quest.answer}!
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
						if (validateAnswers()) {
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
		<p>You did it correct! Rating of your powers: {lives}/{difficulty > 2 ? 3 : 2}</p>
		<a class="btn btn-primary" href="/learn?dif={difficulty}">Ok!</a>
	</div>
</Dialog>

<!--  Dialog for losing  -->
<Dialog bind:this={incorrectDialog}>
	<span slot="header"> Info </span>
	<div class="text-center" slot="body">
		<h3 class="text-danger">No more Lives!</h3>
		<p>You couldn't do it..I know..</p>
		<a class="btn btn-primary" href="/learn?dif={difficulty}">Ok!</a>
	</div>
</Dialog>
