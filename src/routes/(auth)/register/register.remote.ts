import { form, getRequestEvent } from '$app/server';
import * as v from 'valibot';
import { auth } from '@/server/auth';
import { redirect } from 'sveltekit-flash-message/server';

export const register = form(
	v.pipe(
		v.object({
			name: v.pipe(v.string(), v.minLength(2, 'Name must be at least 2 characters')),
			email: v.pipe(v.string(), v.email('Invalid email address')),
			password: v.pipe(
				v.string(),
				v.minLength(8, 'Password must be at least 8 characters'),
				v.regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
				v.regex(/[0-9]/, 'Password must contain at least one number'),
				v.regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
			),
			confirmPassword: v.pipe(v.string(), v.minLength(1, 'Please confirm your password'))
		}),
		v.check((input) => input.password === input.confirmPassword, 'Passwords do not match')
	),
	async ({ name, email, password }) => {
		const { cookies } = getRequestEvent();
		const response = await auth.api.signUpEmail({
			body: { name, email, password }
		});

		if (!response.user) {
			return { error: 'Registration failed' };
		}

		redirect(
			303,
			'/login',
			{
				type: 'success',
				message: 'Account created! A verification email has been sent to your inbox.'
			},
			cookies
		);
	}
);
