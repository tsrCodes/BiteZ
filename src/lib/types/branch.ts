import type { Component } from 'svelte';

export type Branch = {
	id: string;
	name: string;
	logo: Component;
	location: string;
	isActive: boolean;
};
