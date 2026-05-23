<script lang="ts">
	import { enhance } from '$app/forms';

	import { toast } from 'svelte-sonner';

	import * as Dialog from '@/components/ui/dialog';

	import { Button } from '@/components/ui/button';
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import { Textarea } from '@/components/ui/textarea';

	let {
		open = $bindable(false),

		onCreated
	}: {
		open?: boolean;

		onCreated?: () => void;
	} = $props();

	let name = $state('');
	let description = $state('');

	let creating = $state(false);
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-md">
		<form
			method="POST"
			action="?/create"
			use:enhance={() => {
				creating = true;
				return async ({ result, update }) => {
					creating = false;

					if (result.type === 'success') {
						toast.success(
							(
								result.data as {
									message?: string;
								}
							)?.message ?? 'Role created successfully'
						);

						name = '';
						description = '';

						open = false;

						onCreated?.();

						await update();
					} else if (result.type === 'failure') {
						toast.error(
							(
								result.data as {
									message?: string;
								}
							)?.message ?? 'Failed to create role'
						);
					}
				};
			}}
		>
			<Dialog.Header>
				<Dialog.Title>Create Role</Dialog.Title>

				<Dialog.Description>
					Add a new custom role. You can assign permissions after creation.
				</Dialog.Description>
			</Dialog.Header>

			<div class="space-y-4 py-2">
				<div class="space-y-2">
					<Label for="create-name">
						Name

						<span class="text-destructive"> * </span>
					</Label>

					<Input
						id="create-name"
						name="name"
						bind:value={name}
						placeholder="e.g. Inventory Manager"
					/>
				</div>

				<div class="space-y-2">
					<Label for="create-desc">Description</Label>

					<Textarea
						rows={2}
						id="create-desc"
						name="description"
						bind:value={description}
						placeholder="What does this role allow?"
					/>
				</div>
			</div>

			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={() => (open = false)}>Cancel</Button>

				<Button type="submit" disabled={creating || !name.trim()}>
					{#if creating}
						Creating...
					{:else}
						Create Role
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
