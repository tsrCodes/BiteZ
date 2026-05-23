import type { Component } from 'svelte';

type BaseNavItem = {
	title: string;
	badge?: string;
	icon?: Component;
	comingSoon?: boolean;
	newTab?: boolean;
};

export type NavLink = BaseNavItem & {
	url: string;
	items?: never;
};

export type NavCollapsible = BaseNavItem & {
	items: (BaseNavItem & { url: string })[];
	url?: never;
};

export type NavItem = NavLink | NavCollapsible;

export type NavGroup = {
	title: string;
	items: NavItem[];
};
