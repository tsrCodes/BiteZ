import {
	pgTable,
	uuid,
	varchar,
	text,
	timestamp,
	boolean,
	primaryKey,
	decimal,
	pgEnum,
	jsonb
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const userStatus = pgEnum('user_status', ['ACTIVE', 'INACTIVE']);
export const activity = pgEnum('activity', ['ENABLE', 'DISABLE']);

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),

	isEmailVerified: boolean('is_email_verified').default(false),
	isPhoneVerified: boolean('is_phone_verified').default(false),
	isGuest: boolean('is_guest').default(false),

	image: text('image'),
	username: varchar('username', { length: 255 }).unique(),
	password: varchar('password', { length: 255 }),

	phone: varchar('phone', { length: 50 }),
	branchId: uuid('branch_id'),
	status: userStatus('status').default('ACTIVE'),
	balance: decimal('balance', { precision: 19, scale: 6 }).default('0'),
	deviceToken: text('device_token'),
	webToken: text('web_token'),

	deletedAt: timestamp('deleted_at'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export const sessions = pgTable('sessions', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at').notNull(),
	ipAddress: varchar('ip_address', { length: 45 }),
	userAgent: text('user_agent'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export const branches = pgTable('branches', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }),
	phone: varchar('phone', { length: 50 }),
	latitude: decimal('latitude', { precision: 10, scale: 7 }),
	longitude: decimal('longitude', { precision: 10, scale: 7 }),
	zone: jsonb('zone'),
	address: text('address'),
	city: varchar('city', { length: 100 }),
	state: varchar('state', { length: 100 }),
	zipCode: varchar('zip_code', { length: 20 }),
	status: userStatus('status').default('ACTIVE'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export const settings = pgTable('settings', {
	key: varchar('key', { length: 255 }).primaryKey(),
	value: text('value').notNull(),
	group: varchar('group', { length: 100 }).notNull(),
	type: varchar('type', { length: 50 }).default('text')
});

export const roles = pgTable('roles', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 50 }).notNull().unique(),
	description: text('description'),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const permissions = pgTable('permissions', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 100 }).notNull().unique(),
	module: varchar('module', { length: 50 }),
	description: text('description')
});

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

export const usersRelations = relations(users, ({ one, many }) => ({
	sessions: many(sessions),
	userRoles: many(userRoles),
	branch: one(branches, { fields: [users.branchId], references: [branches.id] })
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] })
}));

export const branchesRelations = relations(branches, ({ many }) => ({
	users: many(users)
}));

export const rolesRelations = relations(roles, ({ many }) => ({
	users: many(userRoles),
	permissions: many(rolePermissions)
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
	roles: many(rolePermissions)
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
	user: one(users, { fields: [userRoles.userId], references: [users.id] }),
	role: one(roles, { fields: [userRoles.roleId], references: [roles.id] })
}));

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
	role: one(roles, { fields: [rolePermissions.roleId], references: [roles.id] }),
	permission: one(permissions, {
		fields: [rolePermissions.permissionId],
		references: [permissions.id]
	})
}));
