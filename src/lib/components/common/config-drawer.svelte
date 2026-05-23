<script lang="ts">
	import Settings from '@lucide/svelte/icons/settings';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import { cn } from '$lib/utils';
	import { Button } from '@/components/ui/button';
	import * as Sheet from '@/components/ui/sheet';
	import { useSidebar } from '@/components/ui/sidebar';
	import {
		getLayout,
		type Collapsible,
		type Variant,
		type ContentLayout,
		type NavbarStyle
	} from '@/contexts/layout.svelte';
	import { getTheme } from '@/contexts/theme.svelte';
	import { presets } from '@/themes/preset-data';
	import PresetSwatch from './preset-swatch.svelte';
	import { tooltip } from '@/attachments/tooltip';
	import * as Select from '@/components/ui/select';
	import * as ToggleGroup from '@/components/ui/toggle-group';

	const layout = getLayout();
	const theme = getTheme();
	const sidebar = useSidebar();

	let open = $state(false);

	function handleReset() {
		sidebar.setOpen(true);
		layout.reset();
		theme.reset();
	}

	const themeOptions = [
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' },
		{ value: 'system', label: 'System' }
	];

	const variantOptions: { value: Variant; label: string }[] = [
		{ value: 'inset', label: 'Inset' },
		{ value: 'floating', label: 'Floating' },
		{ value: 'sidebar', label: 'Sidebar' }
	];

	const collapsibleOptions: { value: Collapsible; label: string }[] = [
		{ value: 'icon', label: 'Icon' },
		{ value: 'offcanvas', label: 'OffCanvas' }
	];

	const contentLayoutOptions: { value: ContentLayout; label: string }[] = [
		{ value: 'centered', label: 'Centered' },
		{ value: 'full-width', label: 'Full Width' }
	];

	const navbarStyleOptions: { value: NavbarStyle; label: string }[] = [
		{ value: 'sticky', label: 'Sticky' },
		{ value: 'scroll', label: 'Scroll' }
	];

	const fontOptions = [
		{ key: 'inter', label: 'Inter' },
		{ key: 'manrope', label: 'Manrope' },
		{ key: 'system', label: 'System' }
	];

	let layoutMode = $derived(
		sidebar.open ? 'default' : layout.collapsible === 'icon' ? 'compact' : 'full'
	);

	function handleLayoutModeChange(value: string) {
		if (value === 'default') {
			sidebar.setOpen(true);
		} else if (value === 'compact') {
			sidebar.setOpen(false);
			layout.setCollapsible('icon');
		} else if (value === 'full') {
			sidebar.setOpen(false);
			layout.setCollapsible('offcanvas');
		}
	}
</script>

{#snippet themePreviewLight()}
	<svg viewBox="0 0 100 70" class="w-full" aria-hidden="true">
		<rect width="100" height="70" fill="#f4f4f5" />
		<rect x="0" y="0" width="24" height="70" fill="#ffffff" stroke="#e4e4e7" stroke-width="0.5" />
		<rect x="4" y="6" width="16" height="3" rx="1" fill="#a1a1aa" />
		<rect x="4" y="13" width="12" height="2" rx="1" fill="#e4e4e7" />
		<rect x="4" y="18" width="14" height="2" rx="1" fill="#e4e4e7" />
		<rect x="4" y="23" width="10" height="2" rx="1" fill="#e4e4e7" />
		<rect x="28" y="6" width="40" height="4" rx="1" fill="#e4e4e7" />
		<rect
			x="28"
			y="14"
			width="68"
			height="20"
			rx="2"
			fill="#ffffff"
			stroke="#e4e4e7"
			stroke-width="0.5"
		/>
		<rect
			x="28"
			y="38"
			width="68"
			height="20"
			rx="2"
			fill="#ffffff"
			stroke="#e4e4e7"
			stroke-width="0.5"
		/>
	</svg>
{/snippet}

{#snippet themePreviewDark()}
	<svg viewBox="0 0 100 70" class="w-full" aria-hidden="true">
		<rect width="100" height="70" fill="#09090b" />
		<rect x="0" y="0" width="24" height="70" fill="#18181b" stroke="#27272a" stroke-width="0.5" />
		<rect x="4" y="6" width="16" height="3" rx="1" fill="#52525b" />
		<rect x="4" y="13" width="12" height="2" rx="1" fill="#3f3f46" />
		<rect x="4" y="18" width="14" height="2" rx="1" fill="#3f3f46" />
		<rect x="4" y="23" width="10" height="2" rx="1" fill="#3f3f46" />
		<rect x="28" y="6" width="40" height="4" rx="1" fill="#3f3f46" />
		<rect
			x="28"
			y="14"
			width="68"
			height="20"
			rx="2"
			fill="#18181b"
			stroke="#27272a"
			stroke-width="0.5"
		/>
		<rect
			x="28"
			y="38"
			width="68"
			height="20"
			rx="2"
			fill="#18181b"
			stroke="#27272a"
			stroke-width="0.5"
		/>
	</svg>
{/snippet}

{#snippet themePreviewSystem()}
	<svg viewBox="0 0 100 70" class="w-full" aria-hidden="true">
		<defs>
			<clipPath id="config-clip-left">
				<rect x="0" y="0" width="50" height="70" />
			</clipPath>
			<clipPath id="config-clip-right">
				<rect x="50" y="0" width="50" height="70" />
			</clipPath>
		</defs>
		<g clip-path="url(#config-clip-left)">
			<rect width="100" height="70" fill="#f4f4f5" />
			<rect x="0" y="0" width="24" height="70" fill="#ffffff" stroke="#e4e4e7" stroke-width="0.5" />
			<rect x="4" y="6" width="16" height="3" rx="1" fill="#a1a1aa" />
			<rect x="4" y="13" width="12" height="2" rx="1" fill="#e4e4e7" />
			<rect x="4" y="18" width="14" height="2" rx="1" fill="#e4e4e7" />
			<rect x="4" y="23" width="10" height="2" rx="1" fill="#e4e4e7" />
			<rect x="28" y="6" width="40" height="4" rx="1" fill="#e4e4e7" />
			<rect
				x="28"
				y="14"
				width="68"
				height="20"
				rx="2"
				fill="#ffffff"
				stroke="#e4e4e7"
				stroke-width="0.5"
			/>
			<rect
				x="28"
				y="38"
				width="68"
				height="20"
				rx="2"
				fill="#ffffff"
				stroke="#e4e4e7"
				stroke-width="0.5"
			/>
		</g>
		<g clip-path="url(#config-clip-right)">
			<rect width="100" height="70" fill="#09090b" />
			<rect x="0" y="0" width="24" height="70" fill="#18181b" stroke="#27272a" stroke-width="0.5" />
			<rect x="4" y="6" width="16" height="3" rx="1" fill="#52525b" />
			<rect x="4" y="13" width="12" height="2" rx="1" fill="#3f3f46" />
			<rect x="4" y="18" width="14" height="2" rx="1" fill="#3f3f46" />
			<rect x="4" y="23" width="10" height="2" rx="1" fill="#3f3f46" />
			<rect x="28" y="6" width="40" height="4" rx="1" fill="#3f3f46" />
			<rect
				x="28"
				y="14"
				width="68"
				height="20"
				rx="2"
				fill="#18181b"
				stroke="#27272a"
				stroke-width="0.5"
			/>
			<rect
				x="28"
				y="38"
				width="68"
				height="20"
				rx="2"
				fill="#18181b"
				stroke="#27272a"
				stroke-width="0.5"
			/>
		</g>
	</svg>
{/snippet}

{#snippet sidebarPreview(variant: string)}
	<svg viewBox="0 0 100 70" class="w-full" aria-hidden="true">
		{#if variant === 'inset'}
			<rect width="100" height="70" class="fill-muted" />
			<rect
				x="2"
				y="2"
				width="22"
				height="66"
				rx="4"
				class="fill-primary/20 stroke-primary"
				stroke-width="0.5"
			/>
			<rect x="5" y="6" width="16" height="3" rx="1" class="fill-primary" />
			<rect x="5" y="13" width="12" height="2" rx="1" class="fill-primary/40" />
			<rect x="5" y="18" width="14" height="2" rx="1" class="fill-primary/40" />
			<rect
				x="28"
				y="4"
				width="68"
				height="62"
				rx="4"
				class="fill-background stroke-border"
				stroke-width="0.5"
			/>
		{:else if variant === 'floating'}
			<rect width="100" height="70" class="fill-background" />
			<rect
				x="4"
				y="4"
				width="20"
				height="62"
				rx="4"
				class="fill-primary/20 stroke-primary"
				stroke-width="0.5"
			/>
			<rect x="7" y="8" width="14" height="3" rx="1" class="fill-primary" />
			<rect x="7" y="15" width="10" height="2" rx="1" class="fill-primary/40" />
			<rect x="7" y="20" width="12" height="2" rx="1" class="fill-primary/40" />
			<rect x="28" y="6" width="40" height="4" rx="1" class="fill-muted-foreground/20" />
			<rect
				x="28"
				y="14"
				width="68"
				height="20"
				rx="2"
				class="fill-muted/50 stroke-border"
				stroke-width="0.5"
			/>
		{:else}
			<rect width="100" height="70" class="fill-background" />
			<rect
				x="0"
				y="0"
				width="24"
				height="70"
				class="fill-primary/20 stroke-primary"
				stroke-width="0.5"
			/>
			<rect x="4" y="6" width="16" height="3" rx="1" class="fill-primary" />
			<rect x="4" y="13" width="12" height="2" rx="1" class="fill-primary/40" />
			<rect x="4" y="18" width="14" height="2" rx="1" class="fill-primary/40" />
			<rect x="28" y="6" width="40" height="4" rx="1" class="fill-muted-foreground/20" />
			<rect
				x="28"
				y="14"
				width="68"
				height="20"
				rx="2"
				class="fill-muted/50 stroke-border"
				stroke-width="0.5"
			/>
		{/if}
	</svg>
{/snippet}

{#snippet layoutPreview(mode: string)}
	<svg viewBox="0 0 100 70" class="w-full" aria-hidden="true">
		{#if mode === 'default'}
			<rect width="100" height="70" class="fill-background" />
			<rect
				x="0"
				y="0"
				width="24"
				height="70"
				class="fill-primary/20 stroke-primary"
				stroke-width="0.5"
			/>
			<rect x="4" y="6" width="16" height="3" rx="1" class="fill-primary" />
			<rect x="4" y="13" width="12" height="2" rx="1" class="fill-primary/40" />
			<rect x="4" y="18" width="14" height="2" rx="1" class="fill-primary/40" />
			<rect x="4" y="23" width="10" height="2" rx="1" class="fill-primary/40" />
			<rect x="28" y="6" width="40" height="4" rx="1" class="fill-muted-foreground/20" />
			<rect
				x="28"
				y="14"
				width="68"
				height="20"
				rx="2"
				class="fill-muted/50 stroke-border"
				stroke-width="0.5"
			/>
		{:else if mode === 'compact'}
			<rect width="100" height="70" class="fill-background" />
			<rect
				x="0"
				y="0"
				width="10"
				height="70"
				class="fill-primary/20 stroke-primary"
				stroke-width="0.5"
			/>
			<rect x="2" y="6" width="6" height="6" rx="1" class="fill-primary/40" />
			<rect x="2" y="16" width="6" height="6" rx="1" class="fill-primary/40" />
			<rect x="2" y="26" width="6" height="6" rx="1" class="fill-primary/40" />
			<rect x="14" y="6" width="40" height="4" rx="1" class="fill-muted-foreground/20" />
			<rect
				x="14"
				y="14"
				width="82"
				height="20"
				rx="2"
				class="fill-muted/50 stroke-border"
				stroke-width="0.5"
			/>
		{:else}
			<rect width="100" height="70" class="fill-background" />
			<rect x="4" y="6" width="40" height="4" rx="1" class="fill-muted-foreground/20" />
			<rect
				x="4"
				y="14"
				width="92"
				height="20"
				rx="2"
				class="fill-muted/50 stroke-border"
				stroke-width="0.5"
			/>
			<rect
				x="4"
				y="38"
				width="92"
				height="20"
				rx="2"
				class="fill-muted/50 stroke-border"
				stroke-width="0.5"
			/>
		{/if}
	</svg>
{/snippet}

<Sheet.Root bind:open>
	<Sheet.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				{@attach tooltip('Theme Settings')}
				size="icon"
				variant="ghost"
				aria-label="Open theme settings"
				class="size-7"
			>
				<Settings class="size-[1.2rem]" aria-hidden="true" />
			</Button>
		{/snippet}
	</Sheet.Trigger>
	<Sheet.Content class="flex flex-col" side="right">
		<Sheet.Header class="pb-0 text-start">
			<Sheet.Title>Theme Settings</Sheet.Title>
			<Sheet.Description>
				Adjust the appearance and layout to suit your preferences.
			</Sheet.Description>
		</Sheet.Header>
		<div class="space-y-6 overflow-y-auto px-4">
			<!-- Theme Preset (Color Preset) -->
			<div>
				<div class="mb-2 text-sm font-semibold text-muted-foreground">Color Preset</div>
				<div class="grid grid-cols-3 gap-2 sm:grid-cols-4">
					{#each presets as preset (preset.name)}
						<PresetSwatch
							{preset}
							selected={theme.preset === preset.name}
							onclick={() => theme.setPreset(preset.name)}
						/>
					{/each}
				</div>
			</div>

			<!-- Fonts -->
			<div>
				<div class="mb-2 text-sm font-semibold text-muted-foreground">Fonts</div>
				<Select.Root type="single" value={theme.font} onValueChange={(v) => theme.setFont(v)}>
					<Select.Trigger class="w-full">
						<Select.Label placeholder="Select font" />
					</Select.Trigger>
					<Select.Content>
						{#each fontOptions as font (font.key)}
							<Select.Item value={font.key}>{font.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>

			<!-- Theme Mode -->
			<div>
				<div class="mb-2 text-sm font-semibold text-muted-foreground">Theme Mode</div>
				<ToggleGroup.Root
					type="single"
					value={theme.mode}
					onValueChange={(v) => v && theme.setMode(v)}
					variant="outline"
					class="w-full"
				>
					{#each themeOptions as option (option.value)}
						<ToggleGroup.Item value={option.value} class="flex-1">
							{option.label}
						</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>
			</div>

			<!-- Page Layout -->
			<div>
				<div class="mb-2 text-sm font-semibold text-muted-foreground">Page Layout</div>
				<ToggleGroup.Root
					type="single"
					value={layout.contentLayout ?? 'centered'}
					onValueChange={(v) => v && layout.setContentLayout?.(v)}
					variant="outline"
					class="w-full"
				>
					{#each contentLayoutOptions as option (option.value)}
						<ToggleGroup.Item value={option.value} class="flex-1">
							{option.label}
						</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>
			</div>

			<!-- Navbar Behavior -->
			<div>
				<div class="mb-2 text-sm font-semibold text-muted-foreground">Navbar Behavior</div>
				<ToggleGroup.Root
					type="single"
					value={layout.navbarStyle ?? 'sticky'}
					onValueChange={(v) => v && layout.setNavbarStyle?.(v)}
					variant="outline"
					class="w-full"
				>
					{#each navbarStyleOptions as option (option.value)}
						<ToggleGroup.Item value={option.value} class="flex-1">
							{option.label}
						</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>
			</div>

			<!-- Sidebar Style -->
			<div class="max-md:hidden">
				<div class="mb-2 text-sm font-semibold text-muted-foreground">Sidebar Style</div>
				<ToggleGroup.Root
					type="single"
					value={layout.variant}
					onValueChange={(v) => v && layout.setVariant(v)}
					variant="outline"
					class="w-full"
				>
					{#each variantOptions as option (option.value)}
						<ToggleGroup.Item value={option.value} class="flex-1">
							{option.label}
						</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>
			</div>

			<!-- Sidebar Collapse Mode -->
			<div class="max-md:hidden">
				<div class="mb-2 text-sm font-semibold text-muted-foreground">Sidebar Collapse Mode</div>
				<ToggleGroup.Root
					type="single"
					value={layout.collapsible}
					onValueChange={(v) => v && layout.setCollapsible(v)}
					variant="outline"
					class="w-full"
				>
					{#each collapsibleOptions as option (option.value)}
						<ToggleGroup.Item value={option.value} class="flex-1">
							{option.label}
						</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>
			</div>

			<!-- Legacy Layout Mode (Default/Compact/Full) -->
			<div class="max-md:hidden">
				<div class="mb-2 text-sm font-semibold text-muted-foreground">Layout Mode</div>
				<ToggleGroup.Root
					type="single"
					value={layoutMode}
					onValueChange={handleLayoutModeChange}
					variant="outline"
					class="w-full"
				>
					<ToggleGroup.Item value="default" class="flex-1">Default</ToggleGroup.Item>
					<ToggleGroup.Item value="compact" class="flex-1">Compact</ToggleGroup.Item>
					<ToggleGroup.Item value="full" class="flex-1">Full Layout</ToggleGroup.Item>
				</ToggleGroup.Root>
			</div>
		</div>
		<Sheet.Footer class="gap-2">
			<Button
				variant="destructive"
				onclick={handleReset}
				aria-label="Reset all settings to default values"
			>
				<RotateCcw class="size-4" />
				Reset
			</Button>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
