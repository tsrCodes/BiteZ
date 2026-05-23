<script lang="ts">
	import * as Checkbox from '@/components/ui/checkbox';
	import { Badge } from '@/components/ui/badge';
	import { formatModuleName, moduleCheckState } from '@/utils/roles';
	import Action from './action.svelte';
	import type { Permission } from '@/db/schemas';

	let {
		module,
		selectedIds = $bindable(new Set<string>()),
		depth = 0
	}: {
		module: Permission & { children: Permission[] };
		selectedIds?: Set<string>;
		depth?: number;
	} = $props();

	const childIds = module.children.map((c) => c.id);
	const state = $derived(moduleCheckState(module.id, childIds, selectedIds));

	function toggleModule() {
		const allSelected = childIds.every((id) => selectedIds.has(id));
		if (allSelected) {
			selectedIds.delete(module.id);
			childIds.forEach((id) => selectedIds.delete(id));
		} else {
			selectedIds.add(module.id);
			childIds.forEach((id) => selectedIds.add(id));
		}
		selectedIds = new Set(selectedIds);
	}
</script>

<div class="py-2" style:margin-left={`${depth * 1.5}rem`}>
	<div class="flex items-center gap-3">
		<Checkbox.Root
			id={`module-${module.id}`}
			checked={state === 'checked'}
			indeterminate={state === 'indeterminate'}
			onCheckedChange={toggleModule}
			class="shrink-0"
		/>
		<label for={`module-${module.id}`} class="flex flex-1 cursor-pointer items-center gap-2">
			<span class="font-medium">{formatModuleName(module.module ?? module.name)}</span>
			{#if module.children.length === 0}
				<Badge variant="outline" class="text-[10px]">access only</Badge>
			{/if}
		</label>
	</div>

	{#if module.children.length > 0}
		<div class="mt-2 ml-7 flex flex-wrap gap-x-6 gap-y-2">
			{#each module.children as child (child.id)}
				<Action bind:selectedIds action={child} />
			{/each}
		</div>
	{/if}
</div>
