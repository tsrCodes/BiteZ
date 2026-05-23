import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
import ShoppingBag from '@lucide/svelte/icons/shopping-bag';
import ReceiptText from '@lucide/svelte/icons/receipt-text';
import Users from '@lucide/svelte/icons/users';
import Monitor from '@lucide/svelte/icons/monitor';
import ChefHat from '@lucide/svelte/icons/chef-hat';
import Tags from '@lucide/svelte/icons/tags';
import ListFilter from '@lucide/svelte/icons/list-filter';
import Ticket from '@lucide/svelte/icons/ticket';
import Gift from '@lucide/svelte/icons/gift';
import Bike from '@lucide/svelte/icons/bike';
import Briefcase from '@lucide/svelte/icons/briefcase';
import ShieldCheck from '@lucide/svelte/icons/shield-check';
import Banknote from '@lucide/svelte/icons/banknote';
import ChartBar from '@lucide/svelte/icons/chart-bar';
import MessageSquare from '@lucide/svelte/icons/message-square';
import Bell from '@lucide/svelte/icons/bell';
import Mail from '@lucide/svelte/icons/mail';
import Building2 from '@lucide/svelte/icons/building-2';
import Settings from '@lucide/svelte/icons/settings';
import CreditCard from '@lucide/svelte/icons/credit-card';
import Smartphone from '@lucide/svelte/icons/smartphone';
import Clock from '@lucide/svelte/icons/clock';
import Languages from '@lucide/svelte/icons/languages';
import FileText from '@lucide/svelte/icons/file-text';
import Palette from '@lucide/svelte/icons/palette';
import Menu from '@lucide/svelte/icons/menu';
import type { NavGroup } from '@/types';

export function getNavGroups(): NavGroup[] {
	return [
		{
			title: 'Dashboard',
			items: [{ title: 'Overview', url: '/dashboard', icon: LayoutDashboard }]
		},
		{
			title: 'Orders',
			items: [
				{ title: 'Online Orders', url: '/orders/online', icon: ShoppingBag },
				{ title: 'POS Orders', url: '/orders/pos', icon: ReceiptText },
				{ title: 'Table Orders', url: '/orders/table', icon: Users },
				{ title: 'Kitchen Display (KDS)', url: '/orders/kds', icon: Monitor, comingSoon: true },
				{ title: 'Order Status Screen', url: '/orders/oss', icon: Monitor, comingSoon: true }
			]
		},
		{
			title: 'Catalog',
			items: [
				{ title: 'Items', url: '/catalog/items', icon: ChefHat },
				{ title: 'Categories', url: '/catalog/categories', icon: Tags },
				{ title: 'Coupons', url: '/catalog/coupons', icon: Ticket },
				{ title: 'Offers', url: '/catalog/offers', icon: Gift }
			]
		},
		{
			title: 'People',
			items: [
				{ title: 'Customers', url: '/users/customers', icon: Users },
				{ title: 'Delivery Boys', url: '/users/delivery-boys', icon: Bike },
				{ title: 'Employees', url: '/users/employees', icon: Briefcase },
				{ title: 'Waiters', url: '/users/waiters', icon: Users },
				{ title: 'Chefs', url: '/users/chefs', icon: ChefHat },
				{ title: 'Administrators', url: '/users/admins', icon: ShieldCheck }
			]
		},
		{
			title: 'Channels',
			items: [
				{ title: 'Dining Tables', url: '/channels/tables', icon: Users },
				{ title: 'Kiosk Machines', url: '/channels/kiosks', icon: Monitor, comingSoon: true }
			]
		},
		{
			title: 'Finance & Reports',
			items: [
				{ title: 'Transactions', url: '/finance/transactions', icon: Banknote },
				{ title: 'Sales Report', url: '/reports/sales', icon: ChartBar },
				{ title: 'Items Report', url: '/reports/items', icon: ChartBar },
				{ title: 'Credit Balance', url: '/reports/credit-balance', icon: Banknote }
			]
		},
		{
			title: 'Settings',
			items: [
				{ title: 'Company & Site', url: '/settings/general', icon: Building2 },
				{ title: 'Order Setup', url: '/settings/order-setup', icon: Settings },
				{ title: 'Branches', url: '/settings/branches', icon: Building2 },
				{ title: 'Social Login', url: '/settings/social-login', icon: Users, comingSoon: true },
				{ title: 'Time Slots', url: '/settings/time-slots', icon: Clock },
				{ title: 'Roles & Permissions', url: '/settings/roles', icon: ShieldCheck }
			]
		}
	];
}
