<script lang="ts">
	import type { Permission } from '@/db/schemas';
	import Module from './module.svelte';

	let {
		permissionTree,
		selectedIds = $bindable(new Set<string>())
	}: {
		permissionTree: (Permission & { children: Permission[] })[];
		selectedIds?: Set<string>;
	} = $props();
</script>

<div class="divide-y">
	{#each permissionTree as node (node.id)}
		<Module bind:selectedIds module={node} />
	{/each}
</div>
