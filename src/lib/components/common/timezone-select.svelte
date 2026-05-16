<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { capitalizeFirst } from '@/utils';
	import spacetime, { type TimezoneSet } from 'spacetime';

	let {
		value = $bindable<string>(),
		placeholder = 'Select timezone...'
	}: {
		value?: string;
		placeholder?: string;
	} = $props();

	const rawTimezones: TimezoneSet = spacetime.timezones();

	const groupedTimeZones = $derived.by(() => {
		const groups = new Map<
			string,
			Array<{ key: string; name: string; offset: number; offsetLabel: string }>
		>();

		Object.entries(rawTimezones).forEach(([key, data]) => {
			const [region] = key.split('/');
			const formattedName = key.split('/').map(capitalizeFirst).join('/');
			const offsetLabel = formatOffset(data.offset);

			const entry = { key, name: formattedName, offset: data.offset, offsetLabel };

			if (!groups.has(region)) {
				groups.set(region, []);
			}
			groups.get(region)!.push(entry);
		});

		for (const group of groups.values()) {
			group.sort((a, b) => a.name.localeCompare(b.name));
		}

		return Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0]));
	});

	function formatOffset(offset: number): string {
		const sign = offset >= 0 ? '+' : '-';
		const abs = Math.abs(offset);
		const hours = Math.floor(abs);
		const minutes = Math.round((abs - hours) * 60);
		return `UTC${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
	}

	const selected = $derived(
		value
			? groupedTimeZones.flatMap(([_, zones]) => zones).find((tz) => tz.key === value)
			: undefined
	);
</script>

<Select.Root type="single" bind:value>
	<Select.Trigger class="w-full">
		{#if selected}
			{selected.name} ({selected.offsetLabel})
		{:else}
			<span class="text-muted-foreground">{placeholder}</span>
		{/if}
	</Select.Trigger>

	<Select.Content class="max-h-64">
		{#each groupedTimeZones as [region, timezones] (region)}
			<Select.Group>
				<Select.Label>{capitalizeFirst(region)}</Select.Label>
				{#each timezones as tz (tz.key)}
					<Select.Item value={tz.key}>
						{tz.name} ({tz.offsetLabel})
					</Select.Item>
				{/each}
			</Select.Group>
		{/each}
	</Select.Content>
</Select.Root>
