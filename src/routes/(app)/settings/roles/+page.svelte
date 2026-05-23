<script lang="ts">
	import type { PageProps } from './$types';
	import RolesHeader from '@/components/roles/header.svelte';
	import RolesTable from '@/components/roles/table.svelte';
	import CreateDialog from '@/components/roles/dialogs/create.svelte';
	import EditDialog from '@/components/roles/dialogs/edit.svelte';
	import DeleteDialog from '@/components/roles/dialogs/delete.svelte';
	import PermissionsDialog from '@/components/roles/dialogs/permissions.svelte';
	import type { RoleWithPermissions } from '@/types/roles';
	import { TriangleAlert } from '@lucide/svelte';

	let { data }: PageProps = $props();

	let createOpen = $state(false);
	let editOpen = $state(false);
	let deleteOpen = $state(false);
	let permissionsOpen = $state(false);
	let selectedRole = $state<RoleWithPermissions | null>(null);

	function handleNewRole() {
		createOpen = true;
	}

	function handleEdit(role: RoleWithPermissions) {
		selectedRole = role;
		editOpen = true;
	}

	function handleDelete(role: RoleWithPermissions) {
		selectedRole = role;
		deleteOpen = true;
	}

	function handlePermissions(role: RoleWithPermissions) {
		selectedRole = role;
		permissionsOpen = true;
	}
</script>

<main class="@container/main flex flex-1 flex-col gap-6 px-3 py-2">
	<RolesHeader isSeeded={data.isSeeded} onNewRole={handleNewRole} />

	{#if !data.isSeeded}
		<div
			class="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950"
		>
			<TriangleAlert class="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
			<div class="text-sm">
				<p class="font-medium text-amber-800 dark:text-amber-300">No system roles found</p>
				<p class="mt-0.5 text-amber-700 dark:text-amber-400">
					Click <strong>Seed Defaults</strong> to import the 8 system roles and full permission tree.
				</p>
			</div>
		</div>
	{/if}

	<RolesTable
		roles={data.roles}
		onEdit={handleEdit}
		onDelete={handleDelete}
		onPermissions={handlePermissions}
	/>

	<CreateDialog bind:open={createOpen} />
	<EditDialog bind:open={editOpen} role={selectedRole} />
	<DeleteDialog bind:open={deleteOpen} role={selectedRole} />
	<PermissionsDialog
		bind:open={permissionsOpen}
		role={selectedRole}
		permissionTree={data.permissionTree}
	/>
</main>
