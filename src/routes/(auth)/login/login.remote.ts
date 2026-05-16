import { form, getRequestEvent } from '$app/server';
import { isRedirect } from '@sveltejs/kit';

import * as v from 'valibot';

import { redirect } from 'sveltekit-flash-message/server';
import { isAPIError } from 'better-auth/api';

import { auth } from '@/server/auth';

export const login = form(
	v.object({
		email: v.pipe(v.string(), v.email('Invalid email address')),

		password: v.pipe(v.string(), v.minLength(8, 'Password must be at least 8 characters')),

		remember: v.optional(v.boolean(), false)
	}),

	async ({ email, password, remember }) => {
		const { cookies, request } = getRequestEvent();

		try {
			await auth.api.signInEmail({
				body: {
					email,
					password,
					rememberMe: remember
				},

				headers: request.headers
			});

			redirect(
				303,
				'/',
				{
					id: 'login',
					type: 'success',
					message: 'Login successful'
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
					'/login',
					{
						id: 'login',
						type: 'error',
						message: error.message || 'Invalid email or password'
					},
					cookies
				);
			}

			console.error('Login Error:', error);

			redirect(
				303,
				'/login',
				{
					id: 'login',
					type: 'error',
					message: 'Something went wrong. Please try again later.'
				},
				cookies
			);
		}
	}
);
