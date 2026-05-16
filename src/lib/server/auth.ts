import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import { AUTH_SECRET, APP_URL } from '$env/static/private';
import { emailService } from '$lib/server/email';
import { sql, eq } from 'drizzle-orm';
import { users, roles, userRoles } from '@/db/schemas';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';

export const auth = betterAuth({
	secret: AUTH_SECRET,
	baseURL: APP_URL,
	database: drizzleAdapter(db, { provider: 'pg', usePlural: true }),
	advanced: {
		database: {
			generateId: () => {
				return crypto.randomUUID();
			}
		}
	},

	databaseHooks: {
		user: {
			create: {
				after: async (user) => {
					const [{ count: total }] = await db.select({ count: sql<number>`count(*)` }).from(users);
					if (total === 1) {
						const adminRole = await db
							.select({ id: roles.id })
							.from(roles)
							.where(eq(roles.name, 'Admin'))
							.limit(1);
						if (adminRole.length) {
							await db.insert(userRoles).values({
								userId: user.id,
								roleId: adminRole[0].id
							});
						}
					}
				}
			}
		}
	},

	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		autoSignInAfterVerification: false,
		sendResetPassword: async ({ user, url }) => {
			await emailService.sendPasswordResetEmail({
				email: user.email,
				name: user.name,
				resetUrl: url
			});
		}
	},

	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 60 * 60 * 24,
		sendVerificationEmail: async ({ user, url }) => {
			await emailService.sendVerificationEmail({
				email: user.email,
				name: user.name,
				verificationUrl: url
			});
		}
	},

	session: {
		expiresIn: 60 * 60 * 24 * 30,
		updateAge: 60 * 60 * 24 * 7
	},

	user: {
		additionalFields: {
			branchId: { type: 'string', required: false },
			phone: { type: 'string', required: false },
			username: { type: 'string', required: false },
			isGuest: { type: 'boolean', defaultValue: false },
			status: { type: 'string', defaultValue: 'ACTIVE' },
			balance: { type: 'number', defaultValue: 0 },
			deviceToken: { type: 'string', required: false },
			webToken: { type: 'string', required: false }
		}
	},

	plugins: [sveltekitCookies(getRequestEvent)]
});
