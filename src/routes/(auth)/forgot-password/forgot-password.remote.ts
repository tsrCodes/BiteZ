import { form, getRequestEvent } from '$app/server';
import * as v from 'valibot';
import { auth } from '@/server/auth';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { redirect } from 'sveltekit-flash-message/server';

const limiter = new RateLimiter({ IP: [3, 'h'] });

export const forgotPassword = form(
	v.object({ email: v.pipe(v.string(), v.email('Invalid email address')) }),
	async ({ email }) => {
		const event = getRequestEvent();
		const { cookies } = event;

		if (await limiter.isLimited(event)) {
			throw redirect(
				303,
				'/forgot-password',
				{ type: 'error', message: 'Too many requests. Please try again later.' },
				cookies
			);
		}

		try {
			await auth.api.requestPasswordReset({ body: { email, redirectTo: '/' } });
		} catch {}

		throw redirect(
			303,
			'/forgot-password',
			{ type: 'success', message: 'If an account exists, a reset link has been sent.' },
			cookies
		);
	}
);
