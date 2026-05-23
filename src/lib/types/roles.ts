import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

import { roles, permissions } from '@/db/schemas';

export type Role = InferSelectModel<typeof roles>;

export type NewRole = InferInsertModel<typeof roles>;

export type Permission = InferSelectModel<typeof permissions>;

export type RoleWithPermissions = Role & {
	permissions: Permission[];
	permissionCount: number;
	userCount: number;
};

export type PermissionTree = Permission & {
	children: Permission[];
};
