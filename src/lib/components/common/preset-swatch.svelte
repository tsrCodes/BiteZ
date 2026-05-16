<script lang="ts">
	import { cn } from '$lib/utils';
	import type { PresetMeta } from '$lib/themes/preset-data';

	let {
		preset,
		selected,
		onclick
	}: {
		preset: PresetMeta;
		selected: boolean;
		onclick: () => void;
	} = $props();
</script>

<button
	type="button"
	class="group flex w-full flex-col items-center gap-1.5 outline-none"
	aria-label={`Select Color Preset: ${preset.label}`}
	{onclick}
>
	<div
		class={cn(
			'flex size-10 items-center justify-center rounded-lg ring-1 ring-border transition-shadow',
			selected && 'shadow-md ring-2 ring-offset-2 ring-offset-background'
		)}
		style:background="linear-gradient(to right, {preset.primaryColor} 50%, {preset.secondaryColor} 50%)"
		style:--tw-ring-color={selected ? preset.primaryColor : undefined}
	>
		{#if selected}
			<div
				class="size-3 rounded-full shadow-sm"
				style="background-color: {preset.primaryForegroundColor}"
			></div>
		{/if}
	</div>
	<span class="w-full truncate text-center text-xs leading-tight">{preset.label}</span>
</button>
