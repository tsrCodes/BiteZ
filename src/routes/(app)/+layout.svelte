<script lang="ts">
	import { online } from 'svelte/reactivity/window';
	import WifiOff from '@lucide/svelte/icons/wifi-off';
	import * as Sidebar from '@/components/ui/sidebar';
	import AppSidebar from '@/layouts/app-sidebar.svelte';
	import SkipToMain from '@/layouts/skip-to-main.svelte';
	import ScrollToTop from '@/components/common/scroll-to-top.svelte';
	import { getLayout } from '@/contexts/layout.svelte';
	import { setAppData } from '@/contexts/app.svelte';
	import { cn } from '@/utils';
	import AppHeader from '@/layouts/app-header.svelte';
	import type { LayoutProps } from './$types';
	import { setBranch } from '@/contexts/branch.svelte';
	import { COOKIE } from '@/utils/config';

	let { data, children }: LayoutProps = $props();

	const activeBranch = $derived(
		data.branches.find((b) => b.id === data.activeBranchId) ?? data.branches[0]
	);
	const branches = $derived(data.branches);
	const currentUser = $derived(data.currentUser);

	setBranch({
		branches,
		activeBranch
	});
	setAppData({
		currentUser,
		branches,
		activeBranch
	});

	$effect(() => {
		if (activeBranch) {
			document.cookie = `${COOKIE.activeBranch}=${activeBranch.id}; path=/; max-age=${COOKIE.maxAge.long}; SameSite=Lax`;
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

		<div
			class="h-full w-full p-4 has-data-[content-padding=false]:p-0 md:p-6 md:has-data-[content-padding=false]:p-0"
		>
			{@render children()}
		</div>

		<ScrollToTop />
	</Sidebar.Inset>
</Sidebar.Provider>
