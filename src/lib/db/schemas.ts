import {
	pgTable,
	text,
	timestamp,
	boolean,
	primaryKey,
	decimal,
	pgEnum,
	jsonb,
	unique,
	uuid
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const userStatus = pgEnum('user_status', ['ACTIVE', 'INACTIVE']);

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),

	emailVerified: boolean('email_verified').default(false),
	phoneVerified: boolean('phone_verified').default(false),
	isGuest: boolean('is_guest').default(false),

	image: text('image'),
	username: text('username').unique(),

	phone: text('phone'),
	branchId: uuid('branch_id').references(() => branches.id, { onDelete: 'set null' }),
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
	token: text('token').notNull().unique(),

	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at').notNull(),
	revokedAt: timestamp('revoked_at'),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export const accounts = pgTable('accounts', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	idToken: text('id_token'),
	password: text('password'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export const branches = pgTable('branches', {
	id: uuid('id').primaryKey().defaultRandom(),

	name: text('name').notNull(),
	email: text('email'),
	phone: text('phone'),
	latitude: decimal('latitude', { precision: 10, scale: 7 }),
	longitude: decimal('longitude', { precision: 10, scale: 7 }),
	zone: jsonb('zone'),
	address: text('address'),
	city: text('city'),
	state: text('state'),
	zipCode: text('zip_code'),
	status: userStatus('status').default('ACTIVE'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export const settings = pgTable(
	'settings',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		group: text('group').notNull(),
		key: text('key').notNull(),
		value: text('value'),
		valueType: text('value_type').default('string'),
		description: text('description'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(t) => [unique('settings_group_key_unique').on(t.group, t.key)]
);

export const roles = pgTable('roles', {
	id: uuid('id').primaryKey().defaultRandom(),

	name: text('name').notNull().unique(),
	description: text('description'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export const permissions = pgTable('permissions', {
	id: uuid('id').primaryKey().defaultRandom(),

	name: text('name').notNull().unique(),
	module: text('module'),
	description: text('description'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
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

// ─── Relations ────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ one, many }) => ({
	sessions: many(sessions),
	accounts: many(accounts),
	userRoles: many(userRoles),
	branch: one(branches, { fields: [users.branchId], references: [branches.id] })
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] })
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
