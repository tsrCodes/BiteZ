<script lang="ts">
	import * as Alert from '@/components/ui/alert';
	import { Button } from '@/components/ui/button';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';

	let {
		error,
		reset,
		compact = false
	}: {
		error: unknown;
		reset: () => void;
		compact?: boolean;
	} = $props();

	const errorMessage = $derived(error instanceof Error ? error.message : String(error));
</script>

{#if compact}
	<div class="text-muted-foreground flex items-center gap-2 px-2 py-1.5 text-sm">
		<TriangleAlert class="text-destructive size-4 shrink-0" />
		<span class="truncate">This section failed to render</span>
		<Button variant="ghost" size="sm" class="ml-auto h-7 shrink-0 px-2 text-xs" onclick={reset}>
			Try Again
		</Button>
	</div>
{:else}
	<Alert.Root variant="destructive">
		<TriangleAlert />
		<Alert.Title>Something went wrong</Alert.Title>
		<Alert.Description>
			<div class="flex items-center justify-between gap-4">
				<span>{errorMessage || "Something went wrong"}</span>
				<Button variant="outline" size="sm" class="shrink-0" onclick={reset}>
					Try Again
				</Button>
			</div>
		</Alert.Description>
	</Alert.Root>
{/if}
