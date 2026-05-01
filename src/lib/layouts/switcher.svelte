<script lang="ts">
	import * as Sidebar from '@/components/ui/sidebar';
	import * as DropdownMenu from '@/components/ui/dropdown-menu';
	import { ChevronsUpDown, Store, MapPin } from '@lucide/svelte/icons';
	import { isMac } from '@/utils';
	import type { Branch } from '@/types/branch';
	import { getAppData, setAppData } from '@/contexts/app.svelte';

	let { branches }: { branches: Branch[] } = $props();

	const app = getAppData();

	let activeBranch = $derived(app.activeBranch ?? branches[0]);

	const sidebar = Sidebar.useSidebar();
	const modifierKey = $derived(isMac() ? '\u2318' : 'Ctrl+');

	function handleSelect(branch: Branch) {
		setAppData({ ...app, activeBranch: branch });
	}
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						size="lg"
						class="border data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						{...props}
					>
						<div
							class="flex aspect-square size-8 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground"
						>
							<Store class="size-4" />
						</div>
						<div class="grid flex-1 text-start text-sm leading-tight">
							<span class="truncate font-semibold">{activeBranch.name}</span>
							<div class="flex items-center gap-1 text-xs text-muted-foreground">
								<MapPin class="size-3" />
								<span>{activeBranch.location}</span>
							</div>
						</div>
						<ChevronsUpDown class="ms-auto" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-xl"
				align="start"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				sideOffset={4}
			>
				<DropdownMenu.Label class="text-xs text-muted-foreground">Select Branch</DropdownMenu.Label>
				{#each branches as branch, index (branch.id)}
					<DropdownMenu.Item class="gap-2 p-2" onSelect={() => handleSelect(branch)}>
						<div class="flex size-6 items-center justify-center rounded-sm border">
							<Store class="size-3 shrink-0" />
						</div>
						<div class="flex flex-col">
							<span class="font-medium">{branch.name}</span>
							<span class="text-xs text-muted-foreground">{branch.location}</span>
						</div>
						<DropdownMenu.Shortcut>{modifierKey}{index + 1}</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
