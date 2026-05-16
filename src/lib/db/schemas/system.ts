import { pgTable, text, timestamp, uuid, boolean, unique, decimal } from 'drizzle-orm/pg-core';
import { appStatus } from './enums';

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

export const systemSettings = pgTable('system_settings', {
	id: uuid('id').primaryKey().defaultRandom(),
	isOnboarded: boolean('is_onboarded').notNull().default(false),
	maintenanceMode: boolean('maintenance_mode').notNull().default(false),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export const currencies = pgTable('currencies', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	symbol: text('symbol').notNull(),
	code: text('code').notNull().unique(),
	exchangeRate: decimal('exchange_rate', { precision: 19, scale: 6 }),
	status: appStatus('status').default('ACTIVE'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export const languages = pgTable('languages', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	code: text('code').notNull().unique(),
	displayMode: text('display_mode').default('LTR'),
	status: appStatus('status').default('ACTIVE'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export type Currency = typeof currencies.$inferSelect;

export type Language = typeof languages.$inferSelect;
