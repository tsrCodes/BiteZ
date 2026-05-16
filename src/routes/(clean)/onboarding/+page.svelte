<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';

	import * as Form from '@/components/ui/form';

	import { Input } from '@/components/ui/input';
	import { Button } from '@/components/ui/button';
	import { Progress } from '@/components/ui/progress';
	import CurrencySelect from '@/components/common/currency-select.svelte';

	import { onboardingSchema } from '@/schemas/onboarding';

	import type { PageData } from './$types';
	import LanguageSelect from '@/components/common/language-select.svelte';
	import TimezoneSelect from '@/components/common/timezone-select.svelte';
	import { enhance } from '$app/forms';
	import { TOAST_IDS } from '@/utils/toast';
	import { toast } from 'svelte-sonner';
	import { untrack } from 'svelte';

	let { data }: { data: PageData } = $props();

	const { reset, ...form } = superForm(
		untrack(() => data.form),
		{
			validators: valibotClient(onboardingSchema),
			dataType: 'json'
		}
	);

	const currencies = $derived(data.currencies);

	const languages = $derived(data.languages);

	const canShowImportDefaultsButton = $derived(!languages.length || !currencies.length);

	const formData = form.form;
	const errors = form.errors;
	const setupEnhance = form.enhance;
	const submitting = form.submitting;

	let step = $state(1);

	const totalSteps = 3;

	function next() {
		if (step < totalSteps) {
			step++;
		}
	}

	function prev() {
		if (step > 1) {
			step--;
		}
	}

	function canProceed() {
		const d = $formData;

		if (step === 1) {
			return !!d.companyName && !!d.companyEmail;
		}

		if (step === 2) {
			return !!d.branchName && !!d.branchAddress;
		}

		return !!d.defaultCurrencyId && !!d.defaultLanguage && !!d.timezone;
	}
</script>

<svelte:head>
	<title>Setup | BiteZ</title>
</svelte:head>

<div class="mx-auto max-w-3xl space-y-6 py-10">
	<div class="flex items-start justify-between gap-4">
		<div class="space-y-2">
			<h1 class="text-3xl font-semibold tracking-tight">Welcome to BiteZ</h1>

			<p class="text-muted-foreground">Let's configure your restaurant system.</p>
		</div>

		{#if canShowImportDefaultsButton}
			<form
				method="POST"
				action="?/importDefaults"
				use:enhance={() => {
					toast.loading('Importing defaults...', {
						id: TOAST_IDS.importingDefaults
					});

					return async ({ result, update }) => {
						await update({
							invalidateAll: true,
							reset: true
						});

						if (
							result.type === 'success' &&
							result.data &&
							typeof result.data.message === 'string'
						) {
							toast.success(result.data.message, {
								id: TOAST_IDS.importingDefaults
							});
						}

						if (
							result.type === 'failure' &&
							result.data &&
							typeof result.data.message === 'string'
						) {
							toast.error(result.data.message, {
								id: TOAST_IDS.importingDefaults
							});
						}
					};
				}}
			>
				<Button type="submit" variant="outline">Import Defaults</Button>
			</form>
		{/if}
	</div>

	<div class="flex items-center justify-between text-sm">
		<span>
			Step {step} of {totalSteps}
		</span>

		<span class="font-medium">
			{#if step === 1}
				Company Information
			{:else if step === 2}
				Branch Details
			{:else}
				Localization & Defaults
			{/if}
		</span>
	</div>

	<Progress value={(step / totalSteps) * 100} class="h-2" />

	<form
		method="POST"
		use:setupEnhance
		action="?/setup"
		class="space-y-6 rounded-xl border bg-card p-6 shadow-sm"
	>
		<!-- STEP 1 -->
		{#if step === 1}
			<div class="grid gap-4 sm:grid-cols-2">
				<div class="sm:col-span-2">
					<Form.Field {form} name="companyName">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Company Name</Form.Label>

								<Input
									{...props}
									bind:value={$formData.companyName}
									placeholder="BiteZ Restaurant"
								/>
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>

				<div>
					<Form.Field {form} name="companyEmail">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Company Email</Form.Label>

								<Input
									{...props}
									type="email"
									bind:value={$formData.companyEmail}
									placeholder="admin@bitez.com"
								/>
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>

				<div>
					<Form.Field {form} name="companyPhone">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Company Phone</Form.Label>

								<Input
									{...props}
									bind:value={$formData.companyPhone}
									placeholder="+91 9876543210"
								/>
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>

				<div class="sm:col-span-2">
					<Form.Field {form} name="companyAddress">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Company Address</Form.Label>

								<Input
									{...props}
									bind:value={$formData.companyAddress}
									placeholder="Company Address"
								/>
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>
			</div>
		{/if}

		<!-- STEP 2 -->
		{#if step === 2}
			<div class="grid gap-4 sm:grid-cols-2">
				<div class="sm:col-span-2">
					<Form.Field {form} name="branchName">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Branch Name</Form.Label>

								<Input {...props} bind:value={$formData.branchName} placeholder="Main Branch" />
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>

				<div>
					<Form.Field {form} name="branchEmail">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Branch Email</Form.Label>

								<Input
									{...props}
									type="email"
									bind:value={$formData.branchEmail}
									placeholder="branch@bitez.com"
								/>
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>

				<div>
					<Form.Field {form} name="branchPhone">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Branch Phone</Form.Label>

								<Input {...props} bind:value={$formData.branchPhone} placeholder="+91 9876543210" />
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>

				<div class="sm:col-span-2">
					<Form.Field {form} name="branchAddress">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Branch Address</Form.Label>

								<Input
									{...props}
									bind:value={$formData.branchAddress}
									placeholder="Branch Address"
								/>
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>
			</div>
		{/if}

		<!-- STEP 3 -->
		{#if step === 3}
			<div class="grid gap-4 sm:grid-cols-2">
				<div>
					<Form.Field {form} name="defaultCurrencyId">
						<Form.Control>
							<Form.Label>Default Currency</Form.Label>
							<CurrencySelect {currencies} bind:value={$formData.defaultCurrencyId} />
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>

				<div>
					<Form.Field {form} name="defaultLanguage">
						<Form.Control>
							<Form.Label>Default Language</Form.Label>
							<LanguageSelect {languages} bind:value={$formData.defaultLanguage} />
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>

				<div class="sm:col-span-2">
					<Form.Field {form} name="timezone">
						<Form.Control>
							<Form.Label>Timezone</Form.Label>
							<TimezoneSelect bind:value={$formData.timezone} />
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>

				<!-- <div class="sm:col-span-2">
					<Form.Field {form} name="taxEnabled">
						<Form.Control>
							{#snippet children()}
								<label class="flex items-center gap-3">
									<input type="checkbox" bind:checked={$formData.taxEnabled} />

									<span> Enable Tax </span>
								</label>
							{/snippet}
						</Form.Control>
					</Form.Field>
				</div> -->
			</div>
		{/if}

		<div class="flex items-center justify-between pt-4">
			{#if step > 1}
				<Button type="button" variant="outline" onclick={prev}>Back</Button>
			{:else}
				<div></div>
			{/if}

			{#if step < totalSteps}
				<Button type="button" onclick={next} disabled={!canProceed()}>Next</Button>
			{:else}
				<Button type="submit" disabled={$submitting || !canProceed()}>
					{$submitting ? 'Setting up...' : 'Finish Setup'}
				</Button>
			{/if}
		</div>

		{#if $errors?._errors}
			<div
				class="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
			>
				{$errors._errors}
			</div>
		{/if}
	</form>
</div>
