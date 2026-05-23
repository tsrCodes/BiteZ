<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import Monitor from '@lucide/svelte/icons/monitor';
	import { Badge } from '@/components/ui/badge';
	import * as Command from '@/components/ui/command';
	import { ScrollArea } from '@/components/ui/scroll-area';
	import { getSearch } from '@/contexts/search.svelte';
	import { getTheme } from '@/contexts/theme.svelte';
	import { getNavGroups } from '@/utils/menus';
	import type { NavItem } from '@/types';

	const search = getSearch();
	const theme = getTheme();

	function runCommand(command: () => unknown) {
		search.setOpen(false);
		command();
	}

	// Flatten all searchable items (both top-level and nested)
	function getAllSearchableItems(): Array<{
		group: string;
		label: string;
		url: string;
		icon?: NavItem['icon'];
		comingSoon?: boolean;
		newTab?: boolean;
	}> {
		const items: Array<{
			group: string;
			label: string;
			url: string;
			icon?: NavItem['icon'];
			comingSoon?: boolean;
			newTab?: boolean;
		}> = [];

		for (const group of getNavGroups()) {
			for (const item of group.items) {
				if ('url' in item && item.url) {
					// Top-level link
					items.push({
						group: group.title,
						label: item.title,
						url: item.url,
						icon: item.icon,
						comingSoon: (item as any).comingSoon,
						newTab: (item as any).newTab
					});
				} else if ('items' in item && item.items) {
					// Nested items
					for (const sub of item.items) {
						items.push({
							group: group.title,
							label: `${item.title} › ${sub.title}`,
							url: sub.url,
							icon: sub.icon || item.icon,
							comingSoon: (sub as any).comingSoon,
							newTab: (sub as any).newTab
						});
					}
				}
			}
		}
		return items;
	}

	const searchItems = getAllSearchableItems();
	const enabledItems = searchItems.filter((item) => !item.comingSoon);
</script>

<Command.Dialog bind:open={search.open}>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<ScrollArea class="h-72 pe-1">
			<Command.Empty>No results found.</Command.Empty>

			{#each Array.from(new Set(searchItems.map((i) => i.group))) as groupTitle (groupTitle)}
				{@const groupItems = searchItems.filter((i) => i.group === groupTitle)}
				<Command.Group heading={groupTitle}>
					{#each groupItems as item (item.url)}
						<Command.Item
							value={`${item.group} ${item.label}`}
							disabled={item.comingSoon}
							onSelect={() => {
								if (item.comingSoon) return;
								if (item.newTab) {
									window.open(item.url, '_blank', 'noopener,noreferrer');
								} else {
									runCommand(() => goto(resolve(item.url)));
								}
							}}
						>
							{#if item.icon}
								<svelte:component this={item.icon} class="size-4" />
							{:else}
								<div class="flex size-4 items-center justify-center">
									<ArrowRight class="size-2 text-muted-foreground/80" />
								</div>
							{/if}
							<span>{item.label}</span>
							{#if item.comingSoon}
								<Badge variant="outline" class="ml-auto text-xs">Soon</Badge>
							{/if}
						</Command.Item>
					{/each}
				</Command.Group>
			{/each}

			<Command.Separator />

			<!-- Theme Group -->
			<Command.Group heading="Theme">
				<Command.Item onSelect={() => runCommand(() => theme.setMode('light'))}>
					<Sun class="size-4" />
					<span>Light</span>
				</Command.Item>
				<Command.Item onSelect={() => runCommand(() => theme.setMode('dark'))}>
					<Moon class="size-4 scale-90" />
					<span>Dark</span>
				</Command.Item>
				<Command.Item onSelect={() => runCommand(() => theme.setMode('system'))}>
					<Monitor class="size-4" />
					<span>System</span>
				</Command.Item>
			</Command.Group>
		</ScrollArea>
	</Command.List>
</Command.Dialog>
