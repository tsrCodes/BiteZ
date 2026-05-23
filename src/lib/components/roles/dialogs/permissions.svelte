<script lang="ts">
	import { enhance } from '$app/forms';

	import { toast } from 'svelte-sonner';

	import * as Dialog from '@/components/ui/dialog';

	import { Button } from '@/components/ui/button';

	import PermissionMatrix from '../permissions/matrix.svelte';

	import ShieldCheck from '@lucide/svelte/icons/shield-check';

	import type { Role, Permission } from '@/db/schemas';

	let {
		open = $bindable(false),

		role,

		permissionTree,

		onSaved
	}: {
		open?: boolean;

		role:
			| (Role & {
					permissions?: Permission[];
			  })
			| null;

		permissionTree: (Permission & {
			children: Permission[];
		})[];

		onSaved?: () => void;
	} = $props();

	let saving = $state(false);

	let selectedIds = $state<Set<string>>(new Set());

	$effect(() => {
		if (role && open) {
			selectedIds = new Set(role.permissions?.map((p) => p.id) ?? []);
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="no-scrollbar max-h-[85vh] overflow-y-auto sm:max-w-2xl">
		<form
			method="POST"
			action="?/updatePermissions"
			use:enhance={() => {
				saving = true;

				return async ({ result, update }) => {
					saving = false;

					if (result.type === 'success') {
						toast.success(
							(
								result.data as {
									message?: string;
								}
							)?.message ?? 'Permissions updated successfully'
						);

						open = false;

						onSaved?.();

						await update();
					} else if (result.type === 'failure') {
						toast.error(
							(
								result.data as {
									message?: string;
								}
							)?.message ?? 'Failed to update permissions'
						);
					}
				};
			}}
		>
			<input type="hidden" name="roleId" value={role?.id ?? ''} />

			{#each [...selectedIds] as id}
				<input type="hidden" name="permissionIds" value={id} />
			{/each}

			<Dialog.Header>
				<Dialog.Title>
					Edit Permissions —
					{role?.name ?? ''}
				</Dialog.Title>

				<Dialog.Description>
					Check modules to grant access. Check action permissions for granular control.
				</Dialog.Description>
			</Dialog.Header>

			{#if role?.name === 'Admin'}
				<div class="rounded-lg bg-muted px-4 py-3 text-sm">
					<p class="flex items-center gap-2 font-medium">
						<ShieldCheck class="size-4" />

						Admin role always has all permissions
					</p>

					<p class="mt-1 text-xs text-muted-foreground">
						This cannot be modified to ensure system integrity.
					</p>
				</div>
			{:else}
				<PermissionMatrix bind:selectedIds {permissionTree} />

				<Dialog.Footer class="pt-4">
					<div class="flex w-full items-center justify-between">
						<span class="text-sm text-muted-foreground">
							{selectedIds.size}
							permission{selectedIds.size !== 1 ? 's' : ''}
							selected
						</span>

						<div class="flex gap-2">
							<Button type="button" variant="outline" onclick={() => (open = false)}>Cancel</Button>

							<Button type="submit" disabled={saving}>
								{#if saving}
									Saving...
								{:else}
									Save Permissions
								{/if}
							</Button>
						</div>
					</div>
				</Dialog.Footer>
			{/if}
		</form>
	</Dialog.Content>
</Dialog.Root>
