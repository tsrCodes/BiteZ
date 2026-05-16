import { form, getRequestEvent } from '$app/server';
import { isRedirect } from '@sveltejs/kit';

import * as v from 'valibot';

import { redirect } from 'sveltekit-flash-message/server';
import { isAPIError } from 'better-auth/api';

import { auth } from '@/server/auth';

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
		const { cookies, request } = getRequestEvent();

		try {
			await auth.api.signUpEmail({
				body: {
					name,
					email,
					password
				},

				headers: request.headers
			});

			redirect(
				303,
				'/login',
				{
					id: 'register',
					type: 'success',
					message: 'Account created successfully. Please verify your email.'
				},
				cookies
			);
		} catch (error: unknown) {
			if (isRedirect(error)) {
				throw error;
			}

			if (isAPIError(error)) {
				redirect(
					303,
					'/register',
					{
						id: 'register',
						type: 'error',
						message: error.message || 'Registration failed. Please try again.'
					},
					cookies
				);
			}

			console.error('Registration Error:', error);

			redirect(
				303,
				'/register',
				{
					id: 'register',
					type: 'error',
					message: 'Something went wrong. Please try again later.'
				},
				cookies
			);
		}
	}
);
