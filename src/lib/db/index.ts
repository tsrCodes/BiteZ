import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schemas';
import { DATABASE_URL } from '$env/static/private';

const connectionString = DATABASE_URL;

if (!connectionString) {
	console.log('DATABASE_URL present:', !!DATABASE_URL);
}

const client = postgres(connectionString, { max: 1 });

export const db = drizzle(client, { schema });
