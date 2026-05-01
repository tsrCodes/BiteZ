<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<main class="container grid h-svh max-w-none items-center justify-center bg-background">
	{@render children()}
</main>
