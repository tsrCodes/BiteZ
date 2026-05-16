import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { PermissionError, AuthError } from './errors';
import type { RequestEvent } from '@sveltejs/kit';
import { userRoles as userRolesTable } from '@/db/schemas';

const permissionCache = new Map<string, { permissions: Set<string>; ts: number }>();
const CACHE_TTL = 60_000;

async function loadUserPermissions(userId: string): Promise<Set<string>> {
	const cached = permissionCache.get(userId);
	if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.permissions;

	const rows = await db.query.userRoles.findMany({
		where: eq(userRolesTable.userId, userId),
		with: {
			role: {
				with: {
					permissions: {
						with: {
							permission: {}
						}
					}
				}
			}
		}
	});

	const perms = new Set<string>();
	for (const ur of rows) {
		for (const rp of ur.role.permissions) {
			perms.add(rp.permission.name);
		}
	}

	permissionCache.set(userId, { permissions: perms, ts: Date.now() });
	return perms;
}

export async function requirePermission(event: RequestEvent, permission: string): Promise<void> {
	if (!event.locals.user) throw new AuthError();
	const userPerms = await loadUserPermissions(event.locals.user.id);
	if (!userPerms.has(permission)) throw new PermissionError();
}

export async function hasPermission(userId: string, permission: string): Promise<boolean> {
	const userPerms = await loadUserPermissions(userId);
	return userPerms.has(permission);
}

export function invalidateUserPermissions(userId: string) {
	permissionCache.delete(userId);
}
