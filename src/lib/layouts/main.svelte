<script lang="ts">
	import type { Snippet } from 'svelte';
	
	let { children }: { children: Snippet } = $props();
</script>

<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
	{@render children()}
</main>