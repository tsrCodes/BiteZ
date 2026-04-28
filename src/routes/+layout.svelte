<script lang="ts">
	import type { Snippet } from 'svelte';
	import './layout.css';
	import { Toaster } from '@/components/ui/sonner';
	import NavigationProgress from '@/components/common/navigation-progress.svelte';
	import CommandMenu from '@/components/common/command-menu.svelte';
	import { LayoutState, setLayout } from '@/contexts/layout.svelte';
	import { SearchState, setSearch } from '@/contexts/search.svelte';
	import { ThemeState, setTheme } from '@/contexts/theme.svelte';
	import { ShortcutRegistry, setShortcuts } from '@/contexts/shortcuts.svelte';
	import ShortcutsHelpDialog from '@/components/common/shortcuts-help-dialog.svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();



	const layout = new LayoutState({ collapsible: data.sidebarCollapsible ?? 'icon', variant: data.sidebarVariant ?? 'inset' });
	setLayout(layout);

	const search = new SearchState();
	setSearch(search);

	const theme = new ThemeState({ preset: data.themePreset ?? 'default', font: data.font ?? 'inter', mode: data.colorMode ?? 'system' });
	setTheme(theme);

	const shortcuts = new ShortcutRegistry();
	setShortcuts(shortcuts);

	$effect(() => {
		document.documentElement.classList.toggle('dark', theme.resolvedMode === 'dark');
	});

	$effect(() => {
		return shortcuts.register([
			{ key: 'k', modifiers: ['ctrl'], label: 'Command palette', action: () => search.toggle(), scope: 'global' },
			{ key: 'd', modifiers: ['ctrl'], label: 'Toggle theme', action: () => theme.setMode(theme.resolvedMode === 'dark' ? 'light' : 'dark'), scope: 'global' },
			{ key: '?', label: 'Show keyboard shortcuts', action: () => (shortcuts.helpOpen = true), scope: 'global' }
		]);
	});
</script>

<svelte:window onkeydown={shortcuts.handleKeydown} />
<svelte:head>
	<title>BiteZ Admin</title>
</svelte:head>

<Toaster theme={theme.resolvedMode} />
<NavigationProgress />
<CommandMenu />
<ShortcutsHelpDialog />

{@render children()}