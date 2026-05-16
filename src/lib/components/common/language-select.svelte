<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import type { Language } from '@/db/schemas/system';

	let {
		value = $bindable<string>(),
		languages,
		placeholder = 'Select language...'
	}: {
		value?: string;
		languages: Pick<Language, 'id' | 'name' | 'code'>[];
		placeholder?: string;
	} = $props();

	const selected = $derived(languages.find((c) => c.id === value));
</script>

<Select.Root type="single" bind:value>
	<Select.Trigger class="w-full">
		{#if selected}
			{selected.name}
		{:else}
			<span class="text-muted-foreground">{placeholder}</span>
		{/if}
	</Select.Trigger>

	<Select.Content>
		{#each languages as language (language.id)}
			<Select.Item value={language.id}>
				{language.name}
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
