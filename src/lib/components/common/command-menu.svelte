<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import Monitor from '@lucide/svelte/icons/monitor';
	import * as Command from '@/components/ui/command';
	import { ScrollArea } from '@/components/ui/scroll-area';
	import { getSearch } from '@/contexts/search.svelte';
	import { getTheme } from '@/contexts/theme.svelte';
	import { getNavGroups } from '@/utils/menus';

	const search = getSearch();
	const theme = getTheme();

	function runCommand(command: () => unknown) {
		search.setOpen(false);
		command();
	}
</script>

<Command.Dialog bind:open={search.open}>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<ScrollArea class="h-72 pe-1">
			<Command.Empty>No results found.</Command.Empty>
			{#each getNavGroups() as group (group.title)}
				<Command.Group heading={group.title}>
					{#each group.items as navItem (navItem.title)}
						{#if navItem.url}
							<Command.Item
								value={navItem.title}
								onSelect={() => runCommand(() => goto(resolve(navItem.url)))}
							>
								<div class="flex size-4 items-center justify-center">
									<ArrowRight class="text-muted-foreground/80 size-2" />
								</div>
								{navItem.title}
							</Command.Item>
						{:else if navItem.items}
							{#each navItem.items as subItem (subItem.url)}
								<Command.Item
									value={`${navItem.title}-${subItem.url}`}
									onSelect={() => runCommand(() => goto(resolve(subItem.url)))}
								>
									<div class="flex size-4 items-center justify-center">
										<ArrowRight class="text-muted-foreground/80 size-2" />
									</div>
									{navItem.title}
									<ChevronRight class="size-3" />
									{subItem.title}
								</Command.Item>
							{/each}
						{/if}
					{/each}
				</Command.Group>
			{/each}
			<Command.Separator />
			<!-- Theme Group -->
			<Command.Group heading="Theme">
				<Command.Item onSelect={() => runCommand(() => theme.setMode('light'))}>
					<Sun />
					<span>Light</span>
				</Command.Item>
				<Command.Item onSelect={() => runCommand(() => theme.setMode('dark'))}>
					<Moon class="scale-90" />
					<span>Dark</span>
				</Command.Item>
				<Command.Item onSelect={() => runCommand(() => theme.setMode('system'))}>
					<Monitor />
					<span>System</span>
				</Command.Item>
			</Command.Group>
		</ScrollArea>
	</Command.List>
</Command.Dialog>