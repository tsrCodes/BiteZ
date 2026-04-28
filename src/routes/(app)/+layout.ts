import type { LayoutLoad } from './$types';
import Store from '@lucide/svelte/icons/store';

const currentUser = {
	name: 'Aakash',
	email: 'hi@aakash.dev',
	avatar: ''
};

const branches = [
	{
		id: 'br-main',
		name: 'BiteZ Main',
		location: 'Downtown',
		logo: Store,
		isActive: true
	},
	{
		id: 'br-west',
		name: 'BiteZ West',
		location: 'Westside',
		logo: Store,
		isActive: false
	}
];

export const load: LayoutLoad = () => {
	return { currentUser, branches };
};
