<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<main class="flex min-h-svh flex-col items-center justify-center p-4 md:p-6">
	<div class="w-full max-w-2xl">
		{@render children()}
	</div>
</main>
