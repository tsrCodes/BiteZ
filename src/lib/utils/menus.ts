import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
import ShoppingCart from '@lucide/svelte/icons/shopping-cart';
import Salad from '@lucide/svelte/icons/salad';
import Users from '@lucide/svelte/icons/users';
import Settings from '@lucide/svelte/icons/settings';
import type { NavGroup } from '@/types';

export function getNavGroups(): NavGroup[] {
	return [
		{
			title: 'Main',
			items: [
				{ title: 'Dashboard', url: '/', icon: LayoutDashboard },
				{ title: 'Orders', url: '/orders', icon: ShoppingCart },
				{ title: 'Catalog', url: '/catalog', icon: Salad },
				{ title: 'Staff', url: '/staff', icon: Users }
			]
		},
		{
			title: 'System',
			items: [
				{
					title: 'Settings',
					icon: Settings,
					items: [
						{ title: 'Branches', url: '/settings/branches' },
						{ title: 'Taxes', url: '/settings/taxes' },
						{ title: 'General', url: '/settings/general' }
					]
				}
			]
		}
	];
}
