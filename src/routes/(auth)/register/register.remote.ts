import { form } from '$app/server';
import * as v from 'valibot';
import { auth } from '@/server/auth';
import { redirect } from '@sveltejs/kit';

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
			confirmPassword: v.string()
		}),
		v.check((input) => input.password === input.confirmPassword, 'Passwords do not match')
	),
	async ({ name, email, password }) => {
		const response = await auth.api.signUpEmail({
			body: { name, email, password }
		});

		if (!response.token) {
			return { error: 'Registration failed' };
		}

		throw redirect(303, '/login');
	}
);
