import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schemas';

export async function resetDatabase() {
	const client = postgres(process.env.DATABASE_URL!, { max: 1 });
	const db = drizzle(client, { schema });

	await db.execute(`
    DO $$ 
    DECLARE
      r RECORD;
    BEGIN
      FOR r IN (
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
        AND tablename NOT IN ('drizzle', '__drizzle_migrations')
      ) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END $$;
  `);

	await client.end();
	console.log('✅ All tables dropped');
}
