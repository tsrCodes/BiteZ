import { sequence } from '@sveltejs/kit/hooks';
import { redirect, type Handle } from '@sveltejs/kit';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { auth } from '@/server/auth';
import type { User } from '@/types';
import type { Session } from '@/types';
import { isOnboarded } from '@/server/system-cache';

const betterAuthHandle: Handle = ({ event, resolve }) => {
	return svelteKitHandler({ event, resolve, auth, building });
};

const PUBLIC_PATHS = [
	'/login/',
	'/register/',
	'/forgot-password/',
	'/reset-password/',
	'/terms/',
	'/privacy/'
];

const BETTER_AUTH_API_PATHS = ['/api/auth/'];

const authGuard: Handle = async ({ event, resolve }) => {
	const user = event.locals.user as User;
	const session = event.locals.session as Session;

	const pathname = event.url.pathname;

	if (BETTER_AUTH_API_PATHS.some((path) => pathname.startsWith(path))) {
		return resolve(event);
	}

	const isOnboarding = pathname.startsWith('/onboarding/');
	const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

	if (!session && !isPublic) {
		throw redirect(303, '/login/');
	}

	if (session) {
		const isOnboardedValue = await isOnboarded();

		if (!isOnboardedValue && !isOnboarding) {
			throw redirect(303, '/onboarding/');
		}
		if (isOnboardedValue && isOnboarding) {
			throw redirect(303, '/');
		}
		if (isPublic) {
			throw redirect(303, '/');
		}
	}

	return resolve(event);
};

export const handle = sequence(betterAuthHandle, authGuard);
