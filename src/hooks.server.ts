import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';
import type { User } from '@/types';

const betterAuthHandle: Handle = ({ event, resolve }) => {
	return svelteKitHandler({ event, resolve, auth, building });
};

const PUBLIC_PATHS = [
	'/login',
	'/register',
	'/forgot-password',
	'/reset-password',
	'/terms',
	'/privacy',
	'/api/auth',
	'/api/email-test'
];

const authGuard: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	console.log('session', session);

	event.locals.user = (session?.user ?? null) as User | null;
	event.locals.session = session?.session ?? null;

	const pathname = event.url.pathname;
	const isPublic = PUBLIC_PATHS.some(
		(path) => pathname === path || pathname.startsWith(path + '/')
	);

	if (session && isPublic) {
		throw redirect(303, '/');
	}

	if (!session && !isPublic) {
		throw redirect(303, '/login');
	}

	return resolve(event);
};

export const handle = sequence(betterAuthHandle, authGuard);
