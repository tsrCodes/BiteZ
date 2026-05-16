import { pgEnum } from 'drizzle-orm/pg-core';

export const userStatus = pgEnum('user_status', ['ACTIVE', 'INACTIVE']);
export const appStatus = pgEnum('app_status', ['ACTIVE', 'INACTIVE']);
export const taxType = pgEnum('tax_type', ['FIXED', 'PERCENTAGE']);
