<script lang="ts">
	import { online } from 'svelte/reactivity/window';
	import WifiOff from '@lucide/svelte/icons/wifi-off';
	import * as Sidebar from '@/components/ui/sidebar';
	import AppSidebar from '@/layouts/app-sidebar.svelte';
	import SkipToMain from '@/layouts/skip-to-main.svelte';
	import ScrollToTop from '@/components/common/scroll-to-top.svelte';
	import { getLayout } from '@/contexts/layout.svelte';
	import { setAppData, type AppData } from '@/contexts/app.svelte';
	import { cn } from '@/utils';
	import AppHeader from '@/layouts/app-header.svelte';
	import type { LayoutProps } from './$types';
	import { setBranch, type BranchContext } from '@/contexts/branch.svelte';
	import { COOKIE } from '@/utils/config';

	let { data, children }: LayoutProps = $props();

	const branch: BranchContext = $state({ branches: [], activeBranch: null });

	const app: AppData = $state({
		currentUser: null,
		branches: [],
		activeBranch: undefined
	});

	setBranch(branch);
	setAppData(app);

	$effect(() => {
		branch.branches = data.branches;
		branch.activeBranch =
			data.branches.find((b) => b.id === data.activeBranchId) ?? data.branches[0] ?? null;

		app.currentUser = data.currentUser;
		app.branches = data.branches;
		app.activeBranch = branch.activeBranch ?? undefined;
	});

	$effect(() => {
		if (branch.activeBranch) {
			document.cookie = `${COOKIE.activeBranch}=${branch.activeBranch.id}; path=/; max-age=${COOKIE.maxAge.long}; SameSite=Lax`;
		}
	});

	const layout = getLayout();
</script>

<Sidebar.Provider open={data.sidebarOpen}>
	<SkipToMain />
	<AppSidebar collapsible={layout.collapsible} variant={layout.variant} />
	<Sidebar.Inset
		class={cn(
			'@container/content',
			'has-data-[layout=fixed]:h-svh',
			'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]'
		)}
	>
		{#if online.current === false}
			<div
				class="text-destructive-foreground flex items-center justify-center gap-2 bg-destructive px-4 py-2 text-sm font-medium"
				role="alert"
				aria-live="assertive"
			>
				<WifiOff class="size-4" />
				You are currently offline. Please check your connection.
			</div>
		{/if}

		<AppHeader />

		<main class="flex-1 px-4 py-2">
			{@render children()}
		</main>

		<ScrollToTop />
	</Sidebar.Inset>
</Sidebar.Provider>
