<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from './header.svelte';
	import { getAppData } from '@/contexts/app.svelte';
	import SearchTrigger from '@/components/common/search-trigger.svelte';
	import ThemeSwitch from '@/components/common/theme-switch.svelte';
	import ConfigDrawer from '@/components/common/config-drawer.svelte';
	import ProfileDropdown from '@/components/common/profile-dropdown.svelte';

	let { fixed = true, children }: { fixed?: boolean; children?: Snippet } = $props();

	const { activeBranch } = getAppData();
</script>

<Header {fixed}>
	{#snippet leftChildren()}
		<span class="max-w-[160px] truncate font-semibold">
			{activeBranch?.name ?? 'BiteZ Admin'}
		</span>
	{/snippet}

	{#snippet rightChildren()}
		<SearchTrigger />
		<ThemeSwitch />
		<ConfigDrawer />
		<ProfileDropdown />
	{/snippet}

	{#if children}
		{@render children()}
	{/if}
</Header>
