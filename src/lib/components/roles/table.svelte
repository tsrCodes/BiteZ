<script lang="ts">
	import * as Table from '@/components/ui/table';
	import RolesRow from './row.svelte';
	import type { RoleWithPermissions } from '@/types/roles';

	let {
		roles,
		onEdit,
		onDelete,
		onPermissions
	}: {
		roles: RoleWithPermissions[];
		onEdit: (role: RoleWithPermissions) => void;
		onDelete: (role: RoleWithPermissions) => void;
		onPermissions: (role: RoleWithPermissions) => void;
	} = $props();
</script>

<div class="rounded-lg border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Role</Table.Head>
				<Table.Head class="hidden sm:table-cell">Type</Table.Head>
				<Table.Head class="hidden md:table-cell">Permissions</Table.Head>
				<Table.Head class="hidden md:table-cell">Users</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each roles as role (role.id)}
				<RolesRow {role} {onEdit} {onDelete} {onPermissions} />
			{:else}
				<Table.Row>
					<Table.Cell colspan={5} class="py-10 text-center text-sm text-muted-foreground">
						No roles found. Click "Seed Defaults" to get started.
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
