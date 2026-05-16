import { pgTable, uuid, text, decimal, timestamp } from 'drizzle-orm/pg-core';
import { taxType, appStatus } from './enums';

export const taxes = pgTable('taxes', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	type: taxType('type').notNull().default('PERCENTAGE'),
	rate: decimal('rate', { precision: 10, scale: 4 }).notNull(),
	status: appStatus('status').default('ACTIVE'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});
