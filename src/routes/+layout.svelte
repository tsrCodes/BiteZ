<script lang="ts">
	import type { Snippet } from 'svelte';
	import './layout.css';
	import NavigationProgress from '@/components/common/navigation-progress.svelte';
	import CommandMenu from '@/components/common/command-menu.svelte';
	import { LayoutState, setLayout } from '@/contexts/layout.svelte';
	import { SearchState, setSearch } from '@/contexts/search.svelte';
	import { ThemeState, setTheme } from '@/contexts/theme.svelte';
	import { ShortcutRegistry, setShortcuts } from '@/contexts/shortcuts.svelte';
	import ShortcutsHelpDialog from '@/components/common/shortcuts-help-dialog.svelte';
	import type { LayoutData } from './$types';
	import { Toaster } from 'svelte-sonner';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/state';
	import { toastHandlers } from '@/utils/toast';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	const flash = getFlash(page);

	const layout = new LayoutState({
		collapsible: 'icon',
		variant: 'inset'
	});
	setLayout(layout);

	const search = new SearchState();
	setSearch(search);

	const theme = new ThemeState({
		preset: 'default',
		font: 'inter',
		mode: 'system'
	});
	setTheme(theme);

	const shortcuts = new ShortcutRegistry();
	setShortcuts(shortcuts);

	$effect(() => {
		layout.setCollapsible(data.sidebarCollapsible ?? 'icon');
		layout.setVariant(data.sidebarVariant ?? 'inset');
	});

	$effect(() => {
		theme.setPreset(data.themePreset ?? 'default');
		theme.setFont(data.font ?? 'inter');
		theme.setMode(data.colorMode ?? 'system');
	});

	$effect(() => {
		document.documentElement.classList.toggle('dark', theme.resolvedMode === 'dark');
	});

	$effect(() => {
		if (!$flash) return;

		toastHandlers[$flash.type]?.($flash.message, {
			id: $flash.id,
			duration: 2500,
			richColors: true
		});
	});

	$effect(() => {
		return shortcuts.register([
			{
				key: 'k',
				modifiers: ['ctrl'],
				label: 'Command palette',
				action: () => search.toggle(),
				scope: 'global'
			},
			{
				key: 'd',
				modifiers: ['ctrl'],
				label: 'Toggle theme',
				action: () => theme.setMode(theme.resolvedMode === 'dark' ? 'light' : 'dark'),
				scope: 'global'
			},
			{
				key: '?',
				label: 'Show keyboard shortcuts',
				action: () => (shortcuts.helpOpen = true),
				scope: 'global'
			}
		]);
	});
</script>

<svelte:window onkeydown={shortcuts.handleKeydown} />
<svelte:head>
	<title>BiteZ Admin</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<Toaster richColors position="top-right" />
	<NavigationProgress />
	<CommandMenu />
	<ShortcutsHelpDialog />
	{@render children()}
</QueryClientProvider>
