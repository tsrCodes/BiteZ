<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import type { Currency } from '@/db/schemas/system';

	let {
		value = $bindable<string>(),
		currencies,
		placeholder = 'Select currency...'
	}: {
		value?: string;
		currencies: Pick<Currency, 'id' | 'name' | 'symbol'>[];
		placeholder?: string;
	} = $props();

	const selected = $derived(currencies.find((c) => c.id === value));
</script>

<Select.Root type="single" bind:value>
	<Select.Trigger class="w-full">
		{#if selected}
			{selected.name} ({selected.symbol})
		{:else}
			<span class="text-muted-foreground">{placeholder}</span>
		{/if}
	</Select.Trigger>

	<Select.Content>
		{#each currencies as currency (currency.id)}
			<Select.Item value={currency.id}>
				{currency.name} ({currency.symbol})
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
