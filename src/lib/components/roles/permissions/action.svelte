<script lang="ts">
	import * as Checkbox from '@/components/ui/checkbox';
	import type { Permission } from '@/db/schemas';

	let {
		action,
		selectedIds = $bindable(new Set<string>())
	}: {
		action: Permission;
		selectedIds?: Set<string>;
	} = $props();

	function toggle() {
		if (selectedIds.has(action.id)) {
			selectedIds.delete(action.id);
		} else {
			selectedIds.add(action.id);
		}
		selectedIds = new Set(selectedIds);
	}
</script>

<div class="flex items-center gap-2">
	<Checkbox.Root
		id={`perm-${action.id}`}
		checked={selectedIds.has(action.id)}
		onCheckedChange={toggle}
	/>
	<label for={`perm-${action.id}`} class="cursor-pointer text-sm text-muted-foreground capitalize">
		{action.action ?? action.name}
	</label>
</div>
