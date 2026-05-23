<script lang="ts">
	import { enhance } from '$app/forms';

	import { toast } from 'svelte-sonner';

	import * as Dialog from '@/components/ui/dialog';

	import { Button } from '@/components/ui/button';
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import { Textarea } from '@/components/ui/textarea';

	import Lock from '@lucide/svelte/icons/lock';

	import type { Role } from '@/db/schemas';

	let {
		open = $bindable(false),

		role,

		onUpdated
	}: {
		open?: boolean;

		role: Role | null;

		onUpdated?: () => void;
	} = $props();

	let name = $state('');
	let description = $state('');

	let editing = $state(false);

	$effect(() => {
		if (role) {
			name = role.name;

			description = role.description ?? '';
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[85vh] sm:max-w-md">
		<form
			method="POST"
			action="?/update"
			use:enhance={() => {
				editing = true;

				return async ({ result, update }) => {
					editing = false;

					if (result.type === 'success') {
						toast.success(
							(
								result.data as {
									message?: string;
								}
							)?.message ?? 'Role updated successfully'
						);

						open = false;

						onUpdated?.();

						await update();
					} else if (result.type === 'failure') {
						toast.error(
							(
								result.data as {
									message?: string;
								}
							)?.message ?? 'Failed to update role'
						);
					}
				};
			}}
		>
			<input type="hidden" name="id" value={role?.id ?? ''} />

			<Dialog.Header>
				<Dialog.Title>Edit Role</Dialog.Title>

				<Dialog.Description>
					Update role details. System role names cannot be changed.
				</Dialog.Description>
			</Dialog.Header>

			<div class="space-y-4 py-4">
				<div class="space-y-2">
					<Label for="edit-name">Name</Label>

					<Input id="edit-name" name="name" bind:value={name} readonly={role?.isSystem ?? false} />

					{#if role?.isSystem}
						<p class="flex items-center gap-1 text-xs text-muted-foreground">
							<Lock class="size-3" />

							System role names are locked
						</p>
					{/if}
				</div>

				<div class="space-y-2">
					<Label for="edit-desc">Description</Label>

					<Textarea rows={2} id="edit-desc" name="description" bind:value={description} />
				</div>
			</div>

			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={() => (open = false)}>Cancel</Button>

				<Button type="submit" disabled={editing || !name.trim()}>
					{#if editing}
						Saving...
					{:else}
						Save Changes
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
