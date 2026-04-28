<script lang="ts">
	import { Button } from '@/components/ui/button';
	import * as Avatar from '@/components/ui/avatar';
	import * as DropdownMenu from '@/components/ui/dropdown-menu';
	import SignOutDialog from '@/layouts/sign-out-dialog.svelte';
	import { getAppData } from '@/contexts/app.svelte';

	let signOutOpen = $state(false);

	const { currentUser: user } = getAppData();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="ghost"
				class="relative h-8 w-8 rounded-full"
				aria-label="Open user menu"
			>
				<Avatar.Root class="h-8 w-8">
					<Avatar.Image src={user.avatar} alt={user.name} />
					<Avatar.Fallback>{user.name.slice(0, 2).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col gap-1.5">
				<p class="text-sm leading-none font-medium">{user.name}</p>
				<p class="text-xs leading-none text-muted-foreground">{user.email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				{#snippet child({ props })}
					<a href="/settings" {...props}>
						Profile
						<DropdownMenu.Shortcut>&#8679;&#8984;P</DropdownMenu.Shortcut>
					</a>
				{/snippet}
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				{#snippet child({ props })}
					<a href={'/settings/account'} {...props}>
						User Billing
						<DropdownMenu.Shortcut>&#8984;B</DropdownMenu.Shortcut>
					</a>
				{/snippet}
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				{#snippet child({ props })}
					<a href={'/settings/appearance'} {...props}>
						Appearance
						<DropdownMenu.Shortcut>&#8984;S</DropdownMenu.Shortcut>
					</a>
				{/snippet}
			</DropdownMenu.Item>
			<DropdownMenu.Item>New Team</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item variant="destructive" onclick={() => (signOutOpen = true)}>
			Sign Out
			<DropdownMenu.Shortcut class="text-current">&#8679;&#8984;Q</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<SignOutDialog bind:open={signOutOpen} />
