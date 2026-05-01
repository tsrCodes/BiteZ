import { form, getRequestEvent } from '$app/server';
import * as v from 'valibot';
import { auth } from '@/server/auth';
import { redirect } from 'sveltekit-flash-message/server';
import type { APIError } from 'better-auth';

export const login = form(
	v.object({
		email: v.pipe(v.string(), v.email('Invalid email address')),
		password: v.pipe(v.string(), v.minLength(8, 'Password must be at least 8 characters')),
		remember: v.optional(v.boolean(), false)
	}),
	async ({ email, password, remember }) => {
		const { cookies } = getRequestEvent();
		try {
			await auth.api.signInEmail({
				body: {
					email,
					password,
					rememberMe: remember
				}
			});

			redirect(303, '/dashboard', { type: 'success', message: 'Login successful' }, cookies);
		} catch (error: any) {
			console.log(error);
			redirect(
				303,
				'/login',
				{
					type: 'error',
					message: error?.body?.message || 'Invalid email or password'
				},
				cookies
			);
		}
	}
);
