<script lang="ts">
	import * as Sidebar from '@/components/ui/sidebar';
	import { getNavGroups } from '@/utils/menus';
	import { getAppData } from '@/contexts/app.svelte';
	import BranchSwitcher from './switcher.svelte';
	import NavGroup from './nav-group.svelte';
	import NavUser from './nav-user.svelte';
	import type { Collapsible, Variant } from '@/contexts/layout.svelte';

	let {
		collapsible = 'icon',
		variant = 'sidebar'
	}: {
		collapsible?: Collapsible;
		variant?: Variant;
	} = $props();

	const { currentUser, branches } = getAppData();
</script>

<nav aria-label="Main navigation">
	<Sidebar.Root {collapsible} {variant}>
		<Sidebar.Header>
			<BranchSwitcher {branches} />
		</Sidebar.Header>
		<Sidebar.Content>
			{#each getNavGroups() as group (group.title)}
				<NavGroup title={group.title} items={group.items} />
			{/each}
		</Sidebar.Content>
		<Sidebar.Footer>
			<NavUser user={currentUser} />
		</Sidebar.Footer>
		<Sidebar.Rail />
	</Sidebar.Root>
</nav>