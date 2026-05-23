<script lang="ts">
	import { Badge } from '@/components/ui/badge';
	import { Button } from '@/components/ui/button';
	import * as Tooltip from '@/components/ui/tooltip';
	import Shield from '@lucide/svelte/icons/shield';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import Lock from '@lucide/svelte/icons/lock';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import Users from '@lucide/svelte/icons/users';
	import type { RoleWithPermissions } from '@/types/roles';
	import * as Table from '@/components/ui/table';

	let {
		role,
		onEdit,
		onDelete,
		onPermissions
	}: {
		role: RoleWithPermissions;
		onEdit: (role: RoleWithPermissions) => void;
		onDelete: (role: RoleWithPermissions) => void;
		onPermissions: (role: RoleWithPermissions) => void;
	} = $props();
</script>

<Table.Row>
	<Table.Cell>
		<div class="flex items-center gap-3">
			<div
				class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
			>
				{#if role.isSystem}
					<ShieldCheck class="size-4" />
				{:else}
					<Shield class="size-4" />
				{/if}
			</div>
			<div>
				<p class="font-medium">{role.name}</p>
				{#if role.description}
					<p class="line-clamp-1 text-xs text-muted-foreground">{role.description}</p>
				{/if}
			</div>
		</div>
	</Table.Cell>
	<Table.Cell class="hidden sm:table-cell">
		{#if role.isSystem}
			<Badge variant="secondary" class="gap-1 text-xs">
				<Lock class="size-3" />
				System
			</Badge>
		{:else}
			<Badge variant="outline" class="text-xs">Custom</Badge>
		{/if}
	</Table.Cell>
	<Table.Cell class="hidden md:table-cell">
		<span class="text-sm text-muted-foreground">{role.permissionCount}</span>
	</Table.Cell>
	<Table.Cell class="hidden md:table-cell">
		<div class="flex items-center gap-1.5">
			<Users class="size-3.5 text-muted-foreground" />
			<span class="text-sm text-muted-foreground">{role.userCount}</span>
		</div>
	</Table.Cell>
	<Table.Cell class="text-right">
		<div class="flex items-center justify-end gap-1">
			{#if role.name !== 'Admin'}
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button variant="ghost" size="icon" class="size-8" onclick={() => onPermissions(role)}>
							<ShieldCheck class="size-4" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Edit permissions</Tooltip.Content>
				</Tooltip.Root>
			{:else}
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button variant="ghost" size="icon" class="size-8 opacity-40" disabled>
							<ShieldCheck class="size-4" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Admin always has all permissions</Tooltip.Content>
				</Tooltip.Root>
			{/if}

			<Tooltip.Root>
				<Tooltip.Trigger>
					<Button variant="ghost" size="icon" class="size-8" onclick={() => onEdit(role)}>
						<Pencil class="size-4" />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					{role.isSystem ? 'Edit description' : 'Edit role'}
				</Tooltip.Content>
			</Tooltip.Root>

			{#if !role.isSystem}
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button
							variant="ghost"
							size="icon"
							class="size-8 text-destructive hover:text-destructive"
							onclick={() => onDelete(role)}
						>
							<Trash2 class="size-4" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Delete role</Tooltip.Content>
				</Tooltip.Root>
			{/if}
		</div>
	</Table.Cell>
</Table.Row>
