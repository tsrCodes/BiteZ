<script lang="ts">
	import * as DropdownMenu from '@/components/ui/dropdown-menu';
	import { User, Settings, LogOut } from '@lucide/svelte/icons';
	import type { User as UserType } from '@/types';

	let { user }: { user: UserType } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<button 
				class="flex items-center gap-2 rounded-full hover:bg-muted p-1"
				{...props}
			>
				<div class="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full">
					{user?.name?.charAt(0)}
				</div>
			</button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{user.name}</p>
				<p class="text-muted-foreground text-xs leading-none">{user.email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			<User class="mr-2 size-4" /> Profile
		</DropdownMenu.Item>
		<DropdownMenu.Item>
			<Settings class="mr-2 size-4" /> Settings
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item class="text-destructive">
			<LogOut class="mr-2 size-4" /> Log out
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>