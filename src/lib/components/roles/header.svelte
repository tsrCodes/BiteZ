<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { Button } from '@/components/ui/button';
	import * as Tooltip from '@/components/ui/tooltip';
	import Download from '@lucide/svelte/icons/download';
	import Plus from '@lucide/svelte/icons/plus';

	let {
		isSeeded = false,
		onNewRole
	}: {
		isSeeded?: boolean;
		onNewRole: () => void;
	} = $props();

	let seeding = $state(false);

	async function handleSeed({ result, update }: any) {
		seeding = false;
		if (result.type === 'success') {
			toast.success((result.data as { message?: string })?.message ?? 'RBAC defaults seeded');
			await update();
			await invalidateAll();
		} else if (result.type === 'failure') {
			toast.error((result.data as { message?: string })?.message ?? 'Failed to seed defaults');
		}
	}
</script>

<div class="flex items-start justify-between gap-4">
	<div class="space-y-1">
		<h1 class="text-2xl font-semibold tracking-tight">Roles & Permissions</h1>
		<p class="text-sm text-muted-foreground">
			Manage system roles and configure granular permission assignments.
		</p>
	</div>
	<div class="flex items-center gap-2">
		<form
			method="POST"
			action="?/seedDefaults"
			use:enhance={() => {
				seeding = true;
				return handleSeed;
			}}
		>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Button
						type="submit"
						variant={isSeeded ? 'outline' : 'secondary'}
						size="sm"
						disabled={seeding}
						class="gap-2"
					>
						<Download class="size-4" />
						{seeding ? 'Seeding...' : isSeeded ? 'Re-seed Defaults' : 'Seed Defaults'}
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					{isSeeded
						? 'Re-run seed — idempotent, safe to repeat'
						: 'Import all system roles and permissions'}
				</Tooltip.Content>
			</Tooltip.Root>
		</form>

		<Button onclick={onNewRole}>
			<Plus class="size-4" />
			New Role
		</Button>
	</div>
</div>
