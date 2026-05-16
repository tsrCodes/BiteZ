import { pgTable, text, timestamp, uuid, decimal, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { appStatus } from './enums';
import { users } from './auth';

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
	countryCode: text('country_code'),
	status: appStatus('status').default('ACTIVE'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export const branchesRelations = relations(branches, ({ many }) => ({
	users: many(users)
}));

export type Branch = typeof branches.$inferSelect;
export type BranchInsert = typeof branches.$inferInsert;
