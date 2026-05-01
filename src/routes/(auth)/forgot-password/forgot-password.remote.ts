import { form } from '$app/server';
import * as v from 'valibot';
import { auth } from '@/server/auth';

export const forgotPassword = form(
	v.object({
		email: v.pipe(v.string(), v.email('Invalid email address'))
	}),
	async ({ email }) => {
		try {
			await auth.api.requestPasswordReset({
				body: {
					email,
					redirectTo: '/'
				}
			});
		} catch {
			// Swallow error to prevent email enumeration attacks
		}
		return { success: true };
	}
);
