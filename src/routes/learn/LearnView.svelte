<script lang="ts" context="module">
	export interface Quests {
		question: string;
		answer: number;
		isIncorrect?: boolean;
		userInput?: number;
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { Step, Stepper, type ModalSettings, focusTrap } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	export let quests: Quests[];
	export let difficulty: number;
	export let type: string;

	let lives: number = difficulty > 2 ? 2 : 3;
	let userInput: number[] = [];
	let state = {};
	let start = 0;

	// update all answers from all fields
	function updateAnswers() {
		for (let i = 0; i < userInput.length; i++) {
			quests[i].userInput = userInput[i];
		}
	}

	// validate all answers
	function validateAnswers(): boolean {
		let allValid = true;
		let jump = true;
		quests.forEach((quest, index) => {
			if (quest.userInput !== quest.answer) {
				if (jump && !(lives < 0)) {
					jump = false;
					if (lives > 0) {
						start = index;
					} else {
						start = quests.length - 1;
					}
					state = {};
				}
				quest.isIncorrect = true;
				allValid = false;
			} else {
				quest.isIncorrect = false;
			}
		});
		return allValid;
	}

	//end function
	function end() {
		updateAnswers();
		if (validateAnswers()) {
			correct();
		} else {
			lives -= 1;
			if (lives <= -1) {
				incorrect();
			} else {
				warn();
			}
		}
	}

	// macro for jumping to the tabs
	function advance() {
		start += 1;
		state = {};
	}

	// warn modal
	function warn() {
		const modal: ModalSettings = {
			type: 'alert',
			// Data
			title: 'Retry!',
			body: `You did ${
				quests.filter((obj) => obj.isIncorrect).length
			} wrong! Please review your answers and try again!`
		};
		modalStore.trigger(modal);
	}

	// incorrect modal
	function incorrect() {
		const modal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'No more Lives!',
			body: "I know...You couldn't do it!",
			response: (r: boolean) => {
				if (r) goto('/learn');
			}
		};
		modalStore.trigger(modal);
	}

	// incorrect modal
	function correct() {
		const modal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Congratulations!',
			body: `You did it correct! Rating of your powers: ${lives}/${difficulty > 2 ? 2 : 3}`,
			response: (r: boolean) => {
				if (r) goto(`/learn?dif=${difficulty}&type=${type}`);
			}
		};
		modalStore.trigger(modal);
	}
</script>

<!--  Questions View and Answer Input  -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-4 lg:w-2/3 w-11/12 pt-4 pb-4">
		{#key state}
			<Stepper stepTerm="Question" {start} on:complete={end}>
				{#each quests as quest, index}
					<Step>
						<svelte:fragment slot="navigation">
							{#if index == 0}
								<a class="btn variant-ghost" href="/learn?dif={difficulty}&type={type}">Cancel</a>
							{/if}
						</svelte:fragment>
						<svelte:fragment slot="header"
							><div class="flex items-center justify-between">
								<h3 class="h3">What is {quest.question}?</h3>
								<!--  Lives Counter  -->
								<div class="flex items-center">
									<h5 class="h5 mr-2">Lives:</h5>
									<span class="badge variant-filled{lives < 0 ? '-surface' : ''}"
										>{lives > 0 ? lives : 0}</span
									>
								</div>
							</div>
						</svelte:fragment>
						<form use:focusTrap={true}>
							<input
								bind:value={userInput[index]}
								class="input {quest.isIncorrect != undefined
									? quest.isIncorrect
										? 'input-error'
										: 'input-success'
									: ''}"
								type="number"
								placeholder="Input answer..."
								required
								use:focusTrap={true}
								disabled={lives < 0}
								on:keypress={(e) => {
									if (e.key == 'Enter')
										if (quests[index + 1]) {
											advance();
										} else {
											end();
										}
								}}
							/>
						</form>
						{#if quest.isIncorrect != undefined}
							{#if quest.isIncorrect}
								<p class="text-error-500 italic text-center">
									Wrong, The correct value would be {lives >= 0
										? quest.userInput
											? quest.answer > quest.userInput
												? 'Bigger'
												: 'Smaller'
											: 'Idk, Wrong Input'
										: quest.answer}!
								</p>
							{:else}
								<p class="text-success-500 italic text-center">Looks good!</p>
							{/if}
						{/if}
					</Step>
				{/each}
			</Stepper>
		{/key}
	</div>
</div>
