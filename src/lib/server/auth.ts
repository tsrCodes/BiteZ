import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL } from '$env/static/private';
import { emailService } from '$lib/server/email';

export const auth = betterAuth({
	secret: BETTER_AUTH_SECRET,
	baseURL: BETTER_AUTH_URL,
	database: drizzleAdapter(db, { provider: 'pg', usePlural: true }),
	advanced: {
		database: {
			generateId: () => {
				return crypto.randomUUID();
			}
		}
	},

	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		autoSignInAfterVerification: true,
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
			balance: { type: 'string', defaultValue: '0' },
			countryCode: { type: 'string', required: false },
			deviceToken: { type: 'string', required: false },
			webToken: { type: 'string', required: false }
		}
	},

	plugins: []
});
