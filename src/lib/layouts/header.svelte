<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Sidebar from '@/components/ui/sidebar';
	import { Separator } from '@/components/ui/separator';
	import { cn } from '@/utils';

	let {
		fixed = true,
		leftChildren,
		rightChildren,
		class: className,
		children
	}: {
		fixed?: boolean;
		leftChildren?: Snippet;
		rightChildren?: Snippet;
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<header
	class={cn(
		'flex h-16 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear',
		fixed && 'sticky top-0 z-30',
		'group-has-data-[collapsible=icon]/sidebar-wrapper:h-12',
		className
	)}
	data-layout={fixed ? 'fixed' : undefined}
>
	<div class="flex items-center gap-2 px-4">
		<Sidebar.Trigger variant="outline" class="-ms-1" />
		<Separator orientation="vertical" class="h-4" />
		{#if leftChildren}
			{@render leftChildren()}
		{/if}
	</div>

	<div class="flex flex-1 items-center justify-end gap-2 px-4">
		{#if rightChildren}
			{@render rightChildren()}
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
</header>
