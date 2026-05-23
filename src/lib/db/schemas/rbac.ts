import {
	pgTable,
	text,
	timestamp,
	uuid,
	primaryKey,
	boolean,
	foreignKey
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './auth';

export const roles = pgTable('roles', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull().unique(),
	description: text('description'),
	isSystem: boolean('is_system').notNull().default(false),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export const permissions = pgTable(
	'permissions',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: text('name').notNull().unique(),
		module: text('module'),
		parentId: uuid('parent_id'),
		action: text('action'),
		description: text('description'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => ({
		parentFk: foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: 'permissions_parent_id_fkey'
		}).onDelete('set null')
	})
);

export const rolePermissions = pgTable(
	'role_permissions',
	{
		roleId: uuid('role_id')
			.notNull()
			.references(() => roles.id, { onDelete: 'cascade' }),
		permissionId: uuid('permission_id')
			.notNull()
			.references(() => permissions.id, { onDelete: 'cascade' })
	},
	(t) => ({ pk: primaryKey({ columns: [t.roleId, t.permissionId] }) })
);

export const userRoles = pgTable(
	'user_roles',
	{
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		roleId: uuid('role_id')
			.notNull()
			.references(() => roles.id, { onDelete: 'cascade' })
	},
	(t) => ({ pk: primaryKey({ columns: [t.userId, t.roleId] }) })
);

// ─── Relations ───────────────────────────────────────────────────────────────

export const rolesRelations = relations(roles, ({ many }) => ({
	permissions: many(rolePermissions),
	users: many(userRoles)
}));

export const permissionsRelations = relations(permissions, ({ many, one }) => ({
	roles: many(rolePermissions),
	parent: one(permissions, {
		fields: [permissions.parentId],
		references: [permissions.id],
		relationName: 'parent_child'
	}),
	children: many(permissions, { relationName: 'parent_child' })
}));

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
	role: one(roles, { fields: [rolePermissions.roleId], references: [roles.id] }),
	permission: one(permissions, {
		fields: [rolePermissions.permissionId],
		references: [permissions.id]
	})
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
	user: one(users, { fields: [userRoles.userId], references: [users.id] }),
	role: one(roles, { fields: [userRoles.roleId], references: [roles.id] })
}));

// ─── Types ──────────────────────────────────────────────────────────────────

export type Role = typeof roles.$inferSelect;
export type RoleInsert = typeof roles.$inferInsert;
export type Permission = typeof permissions.$inferSelect;
export type PermissionInsert = typeof permissions.$inferInsert;
export type RolePermission = typeof rolePermissions.$inferSelect;
export type UserRole = typeof userRoles.$inferSelect;
