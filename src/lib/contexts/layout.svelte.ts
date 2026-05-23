import { createContext } from 'svelte';
import { COOKIE } from '@/utils/config';

export type Collapsible = 'offcanvas' | 'icon' | 'none';
export type Variant = 'inset' | 'sidebar' | 'floating';
export type ContentLayout = 'centered' | 'full-width';
export type NavbarStyle = 'sticky' | 'scroll';

export class LayoutState {
	readonly defaultCollapsible: Collapsible = COOKIE.defaults.collapsible;
	readonly defaultVariant: Variant = COOKIE.defaults.variant;
	readonly defaultContentLayout: ContentLayout = COOKIE.defaults.contentLayout ?? 'centered';
	readonly defaultNavbarStyle: NavbarStyle = COOKIE.defaults.navbarStyle ?? 'sticky';

	collapsible: Collapsible = $state(COOKIE.defaults.collapsible);
	variant: Variant = $state(COOKIE.defaults.variant);
	contentLayout: ContentLayout = $state(COOKIE.defaults.contentLayout ?? 'centered');
	navbarStyle: NavbarStyle = $state(COOKIE.defaults.navbarStyle ?? 'sticky');

	static readonly validCollapsibles: Collapsible[] = ['offcanvas', 'icon', 'none'];
	static readonly validVariants: Variant[] = ['inset', 'sidebar', 'floating'];
	static readonly validContentLayouts: ContentLayout[] = ['centered', 'full-width'];
	static readonly validNavbarStyles: NavbarStyle[] = ['sticky', 'scroll'];

	constructor(initial: {
		collapsible: string;
		variant: string;
		contentLayout?: string;
		navbarStyle?: string;
	}) {
		this.collapsible = LayoutState.validCollapsibles.includes(initial.collapsible as Collapsible)
			? (initial.collapsible as Collapsible)
			: this.defaultCollapsible;
		this.variant = LayoutState.validVariants.includes(initial.variant as Variant)
			? (initial.variant as Variant)
			: this.defaultVariant;
		this.contentLayout = LayoutState.validContentLayouts.includes(
			initial.contentLayout as ContentLayout
		)
			? (initial.contentLayout as ContentLayout)
			: this.defaultContentLayout;
		this.navbarStyle = LayoutState.validNavbarStyles.includes(initial.navbarStyle as NavbarStyle)
			? (initial.navbarStyle as NavbarStyle)
			: this.defaultNavbarStyle;
	}

	setCollapsible = (value: Collapsible) => {
		this.collapsible = value;
		document.cookie = `${COOKIE.layoutCollapsible}=${value}; path=/; max-age=${COOKIE.maxAge.short}; SameSite=Lax`;
	};

	setVariant = (value: Variant) => {
		this.variant = value;
		document.cookie = `${COOKIE.layoutVariant}=${value}; path=/; max-age=${COOKIE.maxAge.short}; SameSite=Lax`;
	};

	setContentLayout = (value: ContentLayout) => {
		this.contentLayout = value;
		document.cookie = `${COOKIE.contentLayout}=${value}; path=/; max-age=${COOKIE.maxAge.short}; SameSite=Lax`;
	};

	setNavbarStyle = (value: NavbarStyle) => {
		this.navbarStyle = value;
		document.cookie = `${COOKIE.navbarStyle}=${value}; path=/; max-age=${COOKIE.maxAge.short}; SameSite=Lax`;
	};

	reset = () => {
		this.setCollapsible(this.defaultCollapsible);
		this.setVariant(this.defaultVariant);
		this.setContentLayout(this.defaultContentLayout);
		this.setNavbarStyle(this.defaultNavbarStyle);
	};
}

export const [getLayout, setLayout] = createContext<LayoutState>();
