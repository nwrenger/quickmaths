<script lang="ts" context="module">
	export interface Answer extends Quests {
		player?: '1' | '2';
	}
</script>

<script lang="ts">
	import {
		ProgressBar,
		Step,
		Stepper,
		type ModalSettings,
		focusTrap
	} from '@skeletonlabs/skeleton';
	import type { Quests } from '../../learn/LearnView.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	const modalStore = getModalStore();

	export let quests: Answer[];

	let time = 0;
	let answering: undefined | '1' | '2';
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

	// Increases Player Points, with also looking to wrong and right criteria!
	function increasePlayerPoints(player: '1' | '2' | undefined, isIncorrect: boolean | undefined) {
		if (player == '1') {
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

	function login(quest: Answer, index: number) {
		getAnswer(index);
		validateAnswer(index);
		increasePlayerPoints(quest.player, quest.isIncorrect);
		finished = true;
	}

	function end() {
		const modal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Congratulations!',
			body: `${points1 == points2 ? 'both??' : points1 > points2 ? 'Player 1' : 'Player 2'} Won!`,
			response: (r: boolean) => {
				if (r) goto('/battle');
			}
		};
		modalStore.trigger(modal);
	}
</script>

<!--  Key Input Event Handler  -->
<svelte:window
	on:keydown={(e) => {
		if (!answering && !finished)
			if (e.key === 's') {
				answering = '1';
			} else if (e.key === 'l') {
				answering = '2';
			}
	}}
/>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="lg:w-2/3 w-11/12 pt-4 pb-4">
		<!--  Player Overview  -->
		<div class="flex items-center justify-between mx-auto mb-2">
			<div class="text-center p-0">
				<span class="badge px-2 py-1 variant-filled-{answering == '1' ? 'primary' : 'surface'}">
					Player 1: {points1}
				</span>
			</div>
			<div class="text-center p-0">
				<span class="badge px-2 py-1 variant-filled-{answering == '2' ? 'primary' : 'surface'}">
					Player 2: {points2}
				</span>
			</div>
		</div>

		<!--  Progress Bar  -->
		<ProgressBar
			class="mb-5"
			label="Progress Bar"
			value={time}
			max={100}
			meter={time >= 100 ? 'bg-error-500' : 'bg-surface-900-50-token'}
		/>
		<!--  Qustions View and Answer Input  -->
		<Stepper
			regionHeader="mt-6"
			stepTerm="Question"
			on:complete={end}
			on:next={() => {
				finished = false;
				time = 0;
			}}
		>
			{#each quests as quest, index}
				<Step
					buttonBack={'hidden'}
					buttonNext={finished || points1 + points2 >= quests.length
						? 'variant-filled mb-4'
						: 'hidden'}
					buttonComplete={finished || points1 + points2 >= quests.length
						? 'variant-filled-primary mb-4'
						: 'hidden'}
				>
					<svelte:fragment slot="header">
						<h3 class="h3">What is {quest.question}?</h3>
					</svelte:fragment>
					<form use:focusTrap={time > 0}>
						<input
							bind:value={quest.userInput}
							class="input {quest.isIncorrect != undefined
								? quest.isIncorrect
									? 'input-error'
									: 'input-success'
								: ''}"
							type="number"
							placeholder="Input answer..."
							required
							disabled={!answering || time >= 100}
						/>
					</form>
					{#if quest.isIncorrect != undefined}
						{#if quest.isIncorrect}
							<p class="text-error-500 italic text-center">
								Wrong, The correct value would be {quest.answer}!
							</p>
						{:else}
							<p class="text-success-500 italic text-center">Looks good!</p>
						{/if}
					{/if}
					{#if answering}
						<button type="button" class="btn variant-filled" on:click={() => login(quest, index)}
							>Log In</button
						>
					{:else if !finished && points1 + points2 < quests.length}
						<div class="flex items-center justify-between mx-auto pt-10">
							<div class="justify-start">
								<button class="btn variant-ghost" type="button" on:click={() => (answering = '1')}
									>Player 1 ("S" Key)</button
								>
							</div>
							<div class="justify-end">
								<button class="btn variant-ghost" type="button" on:click={() => (answering = '2')}
									>Player 2 ("L" Key)</button
								>
							</div>
						</div>
					{/if}
				</Step>
			{/each}
		</Stepper>
		<a class="btn variant-ghost justify-center flex-col items-center" href="/battle">Cancel</a>
	</div>
</div>
