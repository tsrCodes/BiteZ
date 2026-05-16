import { pgTable, text, timestamp, boolean, uuid, decimal, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userStatus } from './enums';
import { branches } from './branches';
import { roles, userRoles } from './rbac';

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

// Relations
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
