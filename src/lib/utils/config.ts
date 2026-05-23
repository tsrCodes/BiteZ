export const APP_NAME = 'BiteZ';

export function pageTitle(title: string): string {
	return `${title} | ${APP_NAME}`;
}

export const COOKIE = {
	sidebarState: 'sidebar:state',
	layoutCollapsible: 'layout:collapsible',
	layoutVariant: 'layout:variant',
	font: 'font',
	themePreset: 'theme:preset',

	contentLayout: 'layout:content',
	navbarStyle: 'layout:navbar',
	colorMode: 'color:mode',
	viewApps: 'view:apps',
	panePrefix: 'pane:',
	maxAge: {
		long: 60 * 60 * 24 * 365,
		short: 60 * 60 * 24 * 7
	},
	valid: {
		font: ['inter', 'manrope', 'system'] as const,
		colorMode: ['light', 'dark', 'system'] as const,
		themePreset: ['default', 'modern-minimal', 'notebook', 'darkmatter'] as const,
		collapsible: ['offcanvas', 'icon', 'none'] as const,
		variant: ['inset', 'sidebar', 'floating'] as const,
		viewApps: ['grid', 'list'] as const,
		contentLayout: ['centered', 'full-width'] as const,
		navbarStyle: ['sticky', 'scroll'] as const
	},
	defaults: {
		sidebarOpen: true,
		collapsible: 'icon' as const,
		variant: 'inset',
		font: 'inter',
		themePreset: 'default',
		colorMode: 'system' as const,
		viewApps: 'grid' as const,
		contentLayout: 'centered' as const,
		navbarStyle: 'sticky' as const
	},
	activeBranch: 'active:branch'
} as const;

export const BREAKPOINT = { sm: 640, md: 768, lg: 1024 } as const;

export const PASSWORD_MIN_LENGTH = 8;
