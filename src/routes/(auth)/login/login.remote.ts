import { form } from '$app/server';
import * as v from 'valibot';
import { auth } from '@/server/auth';

export const login = form(
	v.object({
		email: v.pipe(v.string(), v.email('Invalid email address')),
		password: v.pipe(v.string(), v.minLength(8, 'Password must be at least 8 characters')),
		remember: v.optional(v.boolean(), false)
	}),
	async ({ email, password, remember }) => {
		try {
			await auth.api.signInEmail({
				body: {
					email,
					password,
					rememberMe: remember
				}
			});
			return { success: true };
		} catch {
			return { error: 'Invalid email or password' };
		}
	}
);
