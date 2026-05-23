export interface PermissionSeed {
	name: string;
	module: string;
	action: string | null;
	description: string;
	children?: Omit<PermissionSeed, 'children'>[];
}

export interface RoleSeed {
	name: string;
	description: string;
	isSystem: boolean;
	permissions: string[];
}

export const PERMISSION_TREE: PermissionSeed[] = [
	{
		name: 'dashboard',
		module: 'dashboard',
		action: null,
		description: 'View the admin dashboard',
		children: []
	},
	{
		name: 'items',
		module: 'items',
		action: null,
		description: 'Manage food items',
		children: [
			{ name: 'items_create', module: 'items', action: 'create', description: 'Create food items' },
			{ name: 'items_edit', module: 'items', action: 'edit', description: 'Edit food items' },
			{ name: 'items_delete', module: 'items', action: 'delete', description: 'Delete food items' },
			{ name: 'items_show', module: 'items', action: 'show', description: 'View food item details' }
		]
	},
	{
		name: 'item-categories',
		module: 'item-categories',
		action: null,
		description: 'Manage item categories',
		children: [
			{
				name: 'item-categories_create',
				module: 'item-categories',
				action: 'create',
				description: 'Create item categories'
			},
			{
				name: 'item-categories_edit',
				module: 'item-categories',
				action: 'edit',
				description: 'Edit item categories'
			},
			{
				name: 'item-categories_delete',
				module: 'item-categories',
				action: 'delete',
				description: 'Delete item categories'
			},
			{
				name: 'item-categories_show',
				module: 'item-categories',
				action: 'show',
				description: 'View item category details'
			}
		]
	},
	{
		name: 'dining-tables',
		module: 'dining-tables',
		action: null,
		description: 'Manage dine-in tables',
		children: [
			{
				name: 'dining-tables_create',
				module: 'dining-tables',
				action: 'create',
				description: 'Create dining tables'
			},
			{
				name: 'dining-tables_edit',
				module: 'dining-tables',
				action: 'edit',
				description: 'Edit dining tables'
			},
			{
				name: 'dining-tables_delete',
				module: 'dining-tables',
				action: 'delete',
				description: 'Delete dining tables'
			},
			{
				name: 'dining-tables_show',
				module: 'dining-tables',
				action: 'show',
				description: 'View dining table details'
			}
		]
	},
	{
		name: 'pos',
		module: 'pos',
		action: null,
		description: 'Access the POS terminal interface',
		children: []
	},
	{
		name: 'pos-orders',
		module: 'pos-orders',
		action: null,
		description: 'View POS orders',
		children: []
	},
	{
		name: 'online-orders',
		module: 'online-orders',
		action: null,
		description: 'Manage online orders',
		children: []
	},
	{
		name: 'table-orders',
		module: 'table-orders',
		action: null,
		description: 'Manage table/dine-in orders',
		children: []
	},
	{
		name: 'kitchen-display-system',
		module: 'kitchen-display-system',
		action: null,
		description: 'Access the Kitchen Display System',
		children: []
	},
	{
		name: 'order-status-screen',
		module: 'order-status-screen',
		action: null,
		description: 'Access the Order Status Screen',
		children: []
	},
	{
		name: 'coupons',
		module: 'coupons',
		action: null,
		description: 'Manage discount coupons',
		children: [
			{
				name: 'coupons_create',
				module: 'coupons',
				action: 'create',
				description: 'Create coupons'
			},
			{ name: 'coupons_edit', module: 'coupons', action: 'edit', description: 'Edit coupons' },
			{
				name: 'coupons_delete',
				module: 'coupons',
				action: 'delete',
				description: 'Delete coupons'
			},
			{
				name: 'coupons_show',
				module: 'coupons',
				action: 'show',
				description: 'View coupon details'
			}
		]
	},
	{
		name: 'push-notifications',
		module: 'push-notifications',
		action: null,
		description: 'Manage push notifications',
		children: [
			{
				name: 'push-notifications_create',
				module: 'push-notifications',
				action: 'create',
				description: 'Create push notifications'
			},
			{
				name: 'push-notifications_edit',
				module: 'push-notifications',
				action: 'edit',
				description: 'Edit push notifications'
			},
			{
				name: 'push-notifications_delete',
				module: 'push-notifications',
				action: 'delete',
				description: 'Delete push notifications'
			},
			{
				name: 'push-notifications_show',
				module: 'push-notifications',
				action: 'show',
				description: 'View push notification details'
			}
		]
	},
	{
		name: 'messages',
		module: 'messages',
		action: null,
		description: 'Access customer-admin messages',
		children: []
	},
	{
		name: 'administrators',
		module: 'administrators',
		action: null,
		description: 'Manage administrator accounts',
		children: [
			{
				name: 'administrators_create',
				module: 'administrators',
				action: 'create',
				description: 'Create administrators'
			},
			{
				name: 'administrators_edit',
				module: 'administrators',
				action: 'edit',
				description: 'Edit administrators'
			},
			{
				name: 'administrators_delete',
				module: 'administrators',
				action: 'delete',
				description: 'Delete administrators'
			},
			{
				name: 'administrators_show',
				module: 'administrators',
				action: 'show',
				description: 'View administrator details'
			}
		]
	},
	{
		name: 'customers',
		module: 'customers',
		action: null,
		description: 'Manage customer accounts',
		children: [
			{
				name: 'customers_create',
				module: 'customers',
				action: 'create',
				description: 'Create customers'
			},
			{
				name: 'customers_edit',
				module: 'customers',
				action: 'edit',
				description: 'Edit customers'
			},
			{
				name: 'customers_delete',
				module: 'customers',
				action: 'delete',
				description: 'Delete customers'
			},
			{
				name: 'customers_show',
				module: 'customers',
				action: 'show',
				description: 'View customer details'
			}
		]
	},
	{
		name: 'delivery-boys',
		module: 'delivery-boys',
		action: null,
		description: 'Manage delivery boy accounts',
		children: [
			{
				name: 'delivery-boys_create',
				module: 'delivery-boys',
				action: 'create',
				description: 'Create delivery boys'
			},
			{
				name: 'delivery-boys_edit',
				module: 'delivery-boys',
				action: 'edit',
				description: 'Edit delivery boys'
			},
			{
				name: 'delivery-boys_delete',
				module: 'delivery-boys',
				action: 'delete',
				description: 'Delete delivery boys'
			},
			{
				name: 'delivery-boys_show',
				module: 'delivery-boys',
				action: 'show',
				description: 'View delivery boy details'
			}
		]
	},
	{
		name: 'employees',
		module: 'employees',
		action: null,
		description: 'Manage general staff accounts',
		children: [
			{
				name: 'employees_create',
				module: 'employees',
				action: 'create',
				description: 'Create employees'
			},
			{
				name: 'employees_edit',
				module: 'employees',
				action: 'edit',
				description: 'Edit employees'
			},
			{
				name: 'employees_delete',
				module: 'employees',
				action: 'delete',
				description: 'Delete employees'
			},
			{
				name: 'employees_show',
				module: 'employees',
				action: 'show',
				description: 'View employee details'
			}
		]
	},
	{
		name: 'waiters',
		module: 'waiters',
		action: null,
		description: 'Manage waiter accounts',
		children: [
			{
				name: 'waiters_create',
				module: 'waiters',
				action: 'create',
				description: 'Create waiters'
			},
			{ name: 'waiters_edit', module: 'waiters', action: 'edit', description: 'Edit waiters' },
			{
				name: 'waiters_delete',
				module: 'waiters',
				action: 'delete',
				description: 'Delete waiters'
			},
			{
				name: 'waiters_show',
				module: 'waiters',
				action: 'show',
				description: 'View waiter details'
			}
		]
	},
	{
		name: 'chefs',
		module: 'chefs',
		action: null,
		description: 'Manage chef accounts',
		children: [
			{ name: 'chefs_create', module: 'chefs', action: 'create', description: 'Create chefs' },
			{ name: 'chefs_edit', module: 'chefs', action: 'edit', description: 'Edit chefs' },
			{ name: 'chefs_delete', module: 'chefs', action: 'delete', description: 'Delete chefs' },
			{ name: 'chefs_show', module: 'chefs', action: 'show', description: 'View chef details' }
		]
	},
	{
		name: 'transactions',
		module: 'transactions',
		action: null,
		description: 'View payment transactions',
		children: []
	},
	{
		name: 'sales-report',
		module: 'sales-report',
		action: null,
		description: 'View sales reports',
		children: []
	},
	{
		name: 'items-report',
		module: 'items-report',
		action: null,
		description: 'View item performance reports',
		children: []
	},
	{
		name: 'credit-balance-report',
		module: 'credit-balance-report',
		action: null,
		description: 'View customer credit balance reports',
		children: []
	},
	{
		name: 'settings',
		module: 'settings',
		action: null,
		description: 'Access all system settings',
		children: []
	}
];

export function getAllPermissionNames(): string[] {
	const names: string[] = [];
	for (const perm of PERMISSION_TREE) {
		names.push(perm.name);
		if (perm.children) {
			for (const child of perm.children) {
				names.push(child.name);
			}
		}
	}
	return names;
}

export const SYSTEM_ROLES: RoleSeed[] = [
	{
		name: 'Admin',
		description: 'Full system access — all permissions granted automatically',
		isSystem: true,
		permissions: getAllPermissionNames()
	},
	{
		name: 'Customer',
		description: 'End-user who places orders via website or mobile app — no admin permissions',
		isSystem: true,
		permissions: []
	},
	{
		name: 'Delivery Boy',
		description: 'Handles order delivery with mobile app for tracking — no admin permissions',
		isSystem: true,
		permissions: []
	},
	{
		name: 'Waiter',
		description: 'Manages dine-in table service — configurable permissions',
		isSystem: true,
		permissions: []
	},
	{
		name: 'Chef',
		description: 'Kitchen staff — accesses Kitchen Display System and Order Status Screen',
		isSystem: true,
		permissions: ['dashboard', 'kitchen-display-system', 'order-status-screen']
	},
	{
		name: 'Branch Manager',
		description: 'Manages a specific branch — orders, staff, delivery boys, customers, reports',
		isSystem: true,
		permissions: [
			'dashboard',
			'dining-tables',
			'dining-tables_create',
			'dining-tables_edit',
			'dining-tables_delete',
			'dining-tables_show',
			'pos',
			'pos-orders',
			'online-orders',
			'table-orders',
			'kitchen-display-system',
			'order-status-screen',
			'push-notifications',
			'push-notifications_create',
			'push-notifications_edit',
			'push-notifications_delete',
			'push-notifications_show',
			'messages',
			'delivery-boys',
			'delivery-boys_create',
			'delivery-boys_edit',
			'delivery-boys_delete',
			'delivery-boys_show',
			'customers',
			'customers_create',
			'customers_edit',
			'customers_delete',
			'customers_show',
			'employees',
			'employees_create',
			'employees_edit',
			'employees_delete',
			'employees_show',
			'waiters',
			'waiters_create',
			'waiters_edit',
			'waiters_delete',
			'waiters_show',
			'chefs',
			'chefs_create',
			'chefs_edit',
			'chefs_delete',
			'chefs_show',
			'transactions',
			'sales-report'
		]
	},
	{
		name: 'POS Operator',
		description: 'Operates the point-of-sale terminal — POS and POS order access only',
		isSystem: true,
		permissions: ['dashboard', 'pos', 'pos-orders']
	},
	{
		name: 'Staff',
		description: 'General staff member — fully configurable permissions',
		isSystem: true,
		permissions: []
	}
];
