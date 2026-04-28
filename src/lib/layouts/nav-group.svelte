<script lang="ts">
	import { page } from '$app/state';
	import * as Sidebar from '@/components/ui/sidebar';
	import * as DropdownMenu from '@/components/ui/dropdown-menu';
	import { Badge } from '@/components/ui/badge';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import type { NavItem, NavLink, NavCollapsible } from '@/types';
    import { resolve } from '$app/paths'

	let { title, items }: { title: string; items: NavItem[] } = $props();

	const sidebar = Sidebar.useSidebar();
	const pathname = $derived(page.url.pathname);

	function checkIsActive(href: string, item: NavItem, mainNav = false): boolean {
		const cleanHref = href.split('?')[0];
		return (
			cleanHref === pathname ||
			!!item.items?.some((i) => i.url === cleanHref) ||
			(mainNav &&
				pathname.split('/')[1] !== '' &&
				pathname.split('/')[1] === cleanHref.split('/')[1])
		);
	}
</script>

{#snippet navBadge(badge: string, isActive: boolean)}
	<Badge variant={isActive ? 'secondary' : 'default'} class="rounded-full px-1 py-0 text-xs">
		{badge}
	</Badge>
{/snippet}

<Sidebar.Group>
	<Sidebar.GroupLabel>{title}</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#each items as item (`${item.title}-${item.url ?? ''}`)}
			{#if !item.items}
				{@const navLink = item as NavLink}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						isActive={checkIsActive(navLink.url, navLink)}
						tooltipContent={navLink.title}
					>
						{#snippet child({ props })}
							<a href={resolve(navLink.url)} {...props}>
								{#if navLink.icon}
									<navLink.icon />
								{/if}
								<span>{navLink.title}</span>
								{#if navLink.badge}
									{@render navBadge(navLink.badge, checkIsActive(navLink.url, navLink))}
								{/if}
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{:else if sidebar.state === 'collapsed' && !sidebar.isMobile}
				{@const navCollapsible = item as NavCollapsible}
				<Sidebar.MenuItem>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuButton
									tooltipContent={navCollapsible.title}
									isActive={checkIsActive('', navCollapsible)}
									{...props}
								>
									{#if navCollapsible.icon}
										<navCollapsible.icon />
									{/if}
									<span>{navCollapsible.title}</span>
									{#if navCollapsible.badge}
										{@render navBadge(navCollapsible.badge, false)}
									{/if}
									<ChevronRight class="ms-auto transition-transform duration-200" />
								</Sidebar.MenuButton>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content side="right" align="start" sideOffset={4}>
							<DropdownMenu.Label>
								{navCollapsible.title}
								{#if navCollapsible.badge}({navCollapsible.badge}){/if}
							</DropdownMenu.Label>
							<DropdownMenu.Separator />
							{#each navCollapsible.items as sub (`${sub.title}-${sub.url}`)}
								<DropdownMenu.Item>
									{#snippet child({ props })}
										<a href={sub.url} class={checkIsActive(sub.url, sub) ? 'bg-secondary' : ''} {...props}>
											{#if sub.icon}
												<sub.icon />
											{/if}
											<span class="max-w-52 text-wrap">{sub.title}</span>
											{#if sub.badge}
												<span class="ms-auto text-xs">{sub.badge}</span>
											{/if}
										</a>
									{/snippet}
								</DropdownMenu.Item>
							{/each}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Sidebar.MenuItem>
			{:else}
				{@const navCollapsible = item as NavCollapsible}
				<Sidebar.MenuItem
					data-state={checkIsActive('', navCollapsible, true) ? 'open' : 'closed'}
					data-slot="collapsible"
					class="group/collapsible"
					onclick={(e: MouseEvent) => {
						const node = e.currentTarget as HTMLElement;
						const btn = node.querySelector('[data-sidebar="menu-button"]');
						if (btn?.contains(e.target as Node)) {
							const isOpen = node.getAttribute('data-state') === 'open';
							node.setAttribute('data-state', isOpen ? 'closed' : 'open');
						}
					}}
				>
					<Sidebar.MenuButton tooltipContent={navCollapsible.title}>
						{#if navCollapsible.icon}
							<navCollapsible.icon />
						{/if}
						<span>{navCollapsible.title}</span>
						{#if navCollapsible.badge}
							{@render navBadge(navCollapsible.badge, false)}
						{/if}
						<ChevronRight class="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
					</Sidebar.MenuButton>
					<Sidebar.MenuSub class="group-data-[state=closed]/collapsible:hidden">
						{#each navCollapsible.items as subItem (subItem.title)}
							<Sidebar.MenuSubItem>
								<Sidebar.MenuSubButton isActive={checkIsActive(subItem.url, subItem)}>
									{#snippet child({ props })}
										<a href={subItem.url} {...props}>
											{#if subItem.icon}
												<subItem.icon />
											{/if}
											<span>{subItem.title}</span>
											{#if subItem.badge}
												{@render navBadge(subItem.badge, checkIsActive(subItem.url, subItem))}
											{/if}
										</a>
									{/snippet}
								</Sidebar.MenuSubButton>
							</Sidebar.MenuSubItem>
						{/each}
					</Sidebar.MenuSub>
				</Sidebar.MenuItem>
			{/if}
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>