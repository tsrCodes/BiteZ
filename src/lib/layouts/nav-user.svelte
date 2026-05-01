<script lang="ts">
	import * as Sidebar from '@/components/ui/sidebar';
	import * as DropdownMenu from '@/components/ui/dropdown-menu';
	import { ChevronsUpDown, LogOut, Settings, User } from '@lucide/svelte/icons';
	import type { User as UserType } from '@/types';

	let { user }: { user: UserType } = $props();
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
							<span class="text-xs font-bold">{user.name.charAt(0)}</span>
						</div>
						<div class="grid flex-1 text-start text-sm leading-tight">
							<span class="truncate font-semibold">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
						<ChevronsUpDown class="ms-auto" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-(--bits-dropdown-menu-anchor-width) min-w-56"
				align="end"
				side="top"
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
						<div
							class="flex aspect-square size-8 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground"
						>
							<span class="text-xs font-bold">{user.name.charAt(0)}</span>
						</div>
						<div class="grid flex-1 text-start text-sm leading-tight">
							<span class="truncate font-semibold">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<User /> Profile
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<Settings /> Settings
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item class="text-destructive">
					<LogOut /> Log out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
