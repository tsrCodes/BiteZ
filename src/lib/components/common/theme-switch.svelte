<script lang="ts">
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import Monitor from '@lucide/svelte/icons/monitor';
	import { Button } from '@/components/ui/button';
	import * as DropdownMenu from '@/components/ui/dropdown-menu';
	import { getTheme } from '@/contexts/theme.svelte';
	import { tooltip } from '@/attachments/tooltip';

	const theme = getTheme();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				{@attach tooltip('Toggle theme', { side: 'bottom', delay: 200 })}
				variant="ghost"
				size="icon"
				class="size-7"
				aria-label="Toggle theme"
			>
				<Sun class="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
				<Moon
					class="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
				/>
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="z-50 min-w-[8rem]">
		<DropdownMenu.Item onclick={() => theme.setMode('light')}>
			<Sun class="mr-2 size-4" />
			<span>Light</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => theme.setMode('dark')}>
			<Moon class="mr-2 size-4" />
			<span>Dark</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => theme.setMode('system')}>
			<Monitor class="mr-2 size-4" />
			<span>System</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
