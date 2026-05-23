<script lang="ts">
	import { enhance } from '$app/forms';

	import { toast } from 'svelte-sonner';

	import * as Dialog from '@/components/ui/dialog';

	import { Button } from '@/components/ui/button';

	import type { Role } from '@/db/schemas';

	let {
		open = $bindable(false),

		role,

		onDeleted
	}: {
		open?: boolean;

		role: Role | null;

		onDeleted?: () => void;
	} = $props();

	let deleting = $state(false);
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-sm">
		<form
			method="POST"
			action="?/delete"
			use:enhance={() => {
				deleting = true;

				return async ({ result, update }) => {
					deleting = false;

					if (result.type === 'success') {
						toast.success(
							(
								result.data as {
									message?: string;
								}
							)?.message ?? 'Role deleted successfully'
						);

						open = false;

						onDeleted?.();

						await update();
					} else if (result.type === 'failure') {
						toast.error(
							(
								result.data as {
									message?: string;
								}
							)?.message ?? 'Failed to delete role'
						);
					}
				};
			}}
		>
			<input type="hidden" name="id" value={role?.id ?? ''} />

			<Dialog.Header>
				<Dialog.Title>Delete Role</Dialog.Title>

				<Dialog.Description>
					Are you sure you want to delete "<strong>
						{role?.name ?? ''}
					</strong>"? This cannot be undone. Roles with assigned users cannot be deleted.
				</Dialog.Description>
			</Dialog.Header>

			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={() => (open = false)}>Cancel</Button>

				<Button type="submit" variant="destructive" disabled={deleting}>
					{#if deleting}
						Deleting...
					{:else}
						Delete Role
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
