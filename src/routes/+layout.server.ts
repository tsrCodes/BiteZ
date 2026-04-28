import type { LayoutServerLoad } from './$types';
import { COOKIE } from '@/utils/config';

function validate<T extends string>(
	value: string | undefined,
	allowed: readonly T[],
	fallback: T
): T {
	return allowed.includes(value as T) ? (value as T) : fallback;
}

export const load: LayoutServerLoad = ({ cookies }) => {
	return {
		sidebarOpen: cookies.get(COOKIE.sidebarState) !== 'false',
		sidebarCollapsible: validate(
			cookies.get(COOKIE.layoutCollapsible),
			COOKIE.valid.collapsible,
			COOKIE.defaults.collapsible
		),
		sidebarVariant: validate(
			cookies.get(COOKIE.layoutVariant),
			COOKIE.valid.variant,
			COOKIE.defaults.variant
		),
		font: validate(cookies.get(COOKIE.font), COOKIE.valid.font, COOKIE.defaults.font),
		themePreset: validate(
			cookies.get(COOKIE.themePreset),
			COOKIE.valid.themePreset,
			COOKIE.defaults.themePreset
		),
		colorMode: validate(
			cookies.get(COOKIE.colorMode),
			COOKIE.valid.colorMode,
			COOKIE.defaults.colorMode
		),
		viewApps: validate(
			cookies.get(COOKIE.viewApps),
			COOKIE.valid.viewApps,
			COOKIE.defaults.viewApps
		)
	};
};
