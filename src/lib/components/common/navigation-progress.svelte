<script lang="ts">
	import { navigating } from '$app/state';
</script>

{#if navigating.from}
	<div
		class="fixed top-0 right-0 left-0 z-9999 h-0.5 animate-pulse bg-primary"
		role="progressbar"
		aria-valuemin={0}
		aria-valuemax={100}
		aria-label="Loading..."
	></div>
{/if}
