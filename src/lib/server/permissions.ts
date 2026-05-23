import { db } from '@/db';
import { eq, inArray } from 'drizzle-orm';
import { PermissionError, AuthError } from './errors';
import type { RequestEvent } from '@sveltejs/kit';
import { userRoles, rolePermissions, permissions, roles } from '@/db/schemas';

const permissionCache = new Map<
	string,
	{ permissions: Set<string>; isAdmin: boolean; ts: number }
>();
const CACHE_TTL = 60_000;

async function loadUserPermissions(
	userId: string
): Promise<{ permissions: Set<string>; isAdmin: boolean }> {
	const cached = permissionCache.get(userId);
	if (cached && Date.now() - cached.ts < CACHE_TTL) {
		return { permissions: cached.permissions, isAdmin: cached.isAdmin };
	}

	const userRoleRows = await db
		.select({ roleId: userRoles.roleId, roleName: roles.name })
		.from(userRoles)
		.innerJoin(roles, eq(roles.id, userRoles.roleId))
		.where(eq(userRoles.userId, userId));

	if (userRoleRows.length === 0) {
		return { permissions: new Set(), isAdmin: false };
	}

	const isAdmin = userRoleRows.some((r) => r.roleName === 'Admin');
	const roleIds = userRoleRows.map((r) => r.roleId);

	const permRows = await db
		.select({ name: permissions.name })
		.from(rolePermissions)
		.innerJoin(permissions, eq(permissions.id, rolePermissions.permissionId))
		.where(inArray(rolePermissions.roleId, roleIds));

	const perms = new Set(permRows.map((p) => p.name));

	permissionCache.set(userId, { permissions: perms, isAdmin, ts: Date.now() });
	return { permissions: perms, isAdmin };
}

export async function requirePermission(event: RequestEvent, permission: string): Promise<void> {
	if (!event.locals.user) throw new AuthError();
	const { permissions, isAdmin } = await loadUserPermissions(event.locals.user.id);
	if (!isAdmin && !permissions.has(permission)) throw new PermissionError();
}

export async function hasPermission(userId: string, permission: string): Promise<boolean> {
	const { permissions, isAdmin } = await loadUserPermissions(userId);
	return isAdmin || permissions.has(permission);
}

export async function isAdmin(userId: string): Promise<boolean> {
	const { isAdmin } = await loadUserPermissions(userId);
	return isAdmin;
}

export async function getUserPermissions(userId: string): Promise<Set<string>> {
	const { permissions } = await loadUserPermissions(userId);
	return permissions;
}

export function invalidateUserPermissions(userId: string) {
	permissionCache.delete(userId);
}

export function clearPermissionCache() {
	permissionCache.clear();
}
