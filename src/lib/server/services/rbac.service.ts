import { db } from '@/db';
import { eq, and, inArray, count, ne } from 'drizzle-orm';
import * as schema from '@/db/schemas';
import { ConflictError, NotFoundError, PermissionError, ValidationError } from '@/server/errors';
import { invalidateUserPermissions } from '@/server/permissions';
import type { CreateRoleInput, UpdateRoleInput } from '@/schemas/roles';

export async function getPermissionTree() {
	const all = await db
		.select()
		.from(schema.permissions)
		.orderBy(schema.permissions.module, schema.permissions.action);

	const parents = all.filter((p) => p.parentId === null);
	const childrenMap = new Map<string, typeof all>();

	for (const perm of all) {
		if (perm.parentId) {
			const existing = childrenMap.get(perm.parentId) ?? [];
			existing.push(perm);
			childrenMap.set(perm.parentId, existing);
		}
	}

	return parents.map((parent) => ({
		...parent,
		children: childrenMap.get(parent.id) ?? []
	}));
}

export async function getAllPermissions() {
	return db
		.select()
		.from(schema.permissions)
		.orderBy(schema.permissions.module, schema.permissions.action);
}

export async function listRoles() {
	const roles = await db.query.roles.findMany({
		with: {
			permissions: {
				with: { permission: true }
			},
			users: true
		},
		orderBy: (roles, { asc }) => [asc(roles.createdAt)]
	});

	return roles.map((role) => ({
		...role,
		permissionCount: role.permissions.length,
		userCount: role.users.length,
		permissions: role.permissions.map((rp) => rp.permission)
	}));
}

export async function getRoleById(id: string) {
	const role = await db.query.roles.findFirst({
		where: eq(schema.roles.id, id),
		with: {
			permissions: {
				with: { permission: true }
			},
			users: true
		}
	});

	if (!role) throw new NotFoundError(`Role not found`);

	return {
		...role,
		permissions: role.permissions.map((rp) => rp.permission),
		userCount: role.users.length
	};
}

export async function createRole(input: CreateRoleInput) {
	const existing = await db
		.select({ id: schema.roles.id })
		.from(schema.roles)
		.where(eq(schema.roles.name, input.name))
		.limit(1);

	if (existing.length > 0) {
		throw new ConflictError(`Role "${input.name}" already exists`);
	}

	const [role] = await db
		.insert(schema.roles)
		.values({
			name: input.name,
			description: input.description ?? null,
			isSystem: false
		})
		.returning();

	return role;
}

export async function updateRole(id: string, input: UpdateRoleInput) {
	const role = await db
		.select()
		.from(schema.roles)
		.where(eq(schema.roles.id, id))
		.limit(1)
		.then((r) => r[0]);

	if (!role) throw new NotFoundError('Role not found');

	if (role.isSystem && input.name && input.name !== role.name) {
		throw new PermissionError('System role names cannot be changed');
	}

	if (input.name && input.name !== role.name) {
		const existing = await db
			.select({ id: schema.roles.id })
			.from(schema.roles)
			.where(and(eq(schema.roles.name, input.name), ne(schema.roles.id, id)))
			.limit(1);

		if (existing.length > 0) {
			throw new ConflictError(`Role "${input.name}" already exists`);
		}
	}

	const [updated] = await db
		.update(schema.roles)
		.set({
			...(input.name !== undefined && { name: input.name }),
			...(input.description !== undefined && { description: input.description })
		})
		.where(eq(schema.roles.id, id))
		.returning();

	return updated;
}

export async function deleteRole(id: string) {
	const role = await db
		.select()
		.from(schema.roles)
		.where(eq(schema.roles.id, id))
		.limit(1)
		.then((r) => r[0]);

	if (!role) throw new NotFoundError('Role not found');
	if (role.isSystem) throw new PermissionError('System roles cannot be deleted');

	const [{ value: userCount }] = await db
		.select({ value: count() })
		.from(schema.userRoles)
		.where(eq(schema.userRoles.roleId, id));

	if (userCount > 0) {
		throw new ConflictError(
			`Cannot delete role "${role.name}" — ${userCount} user(s) are assigned to it`
		);
	}

	await db.delete(schema.roles).where(eq(schema.roles.id, id));
	return { deleted: true, id };
}

export async function setRolePermissions(roleId: string, permissionIds: string[]) {
	const role = await db
		.select()
		.from(schema.roles)
		.where(eq(schema.roles.id, roleId))
		.limit(1)
		.then((r) => r[0]);

	if (!role) throw new NotFoundError('Role not found');

	if (role.name === 'Admin') {
		throw new PermissionError(
			'Admin role permissions cannot be modified — Admin always has all permissions'
		);
	}

	if (permissionIds.length > 0) {
		const found = await db
			.select({ id: schema.permissions.id })
			.from(schema.permissions)
			.where(inArray(schema.permissions.id, permissionIds));

		if (found.length !== permissionIds.length) {
			throw new ValidationError('One or more permission IDs are invalid');
		}
	}

	await db.transaction(async (tx) => {
		await tx.delete(schema.rolePermissions).where(eq(schema.rolePermissions.roleId, roleId));

		if (permissionIds.length > 0) {
			await tx
				.insert(schema.rolePermissions)
				.values(permissionIds.map((permId) => ({ roleId, permissionId: permId })))
				.onConflictDoNothing();
		}
	});

	const affectedUsers = await db
		.select({ userId: schema.userRoles.userId })
		.from(schema.userRoles)
		.where(eq(schema.userRoles.roleId, roleId));

	for (const { userId } of affectedUsers) {
		invalidateUserPermissions(userId);
	}

	return { roleId, permissionCount: permissionIds.length };
}

export async function assignRoleToUser(userId: string, roleId: string) {
	const [userExists] = await db
		.select({ id: schema.roles.id })
		.from(schema.roles)
		.where(eq(schema.roles.id, roleId))
		.limit(1);
	if (!userExists) throw new NotFoundError('Role not found');

	await db.insert(schema.userRoles).values({ userId, roleId }).onConflictDoNothing();

	invalidateUserPermissions(userId);
	return { userId, roleId };
}

export async function removeRoleFromUser(userId: string, roleId: string) {
	await db
		.delete(schema.userRoles)
		.where(and(eq(schema.userRoles.userId, userId), eq(schema.userRoles.roleId, roleId)));

	invalidateUserPermissions(userId);
	return { userId, roleId };
}

export async function getUserRoles(userId: string) {
	const rows = await db.query.userRoles.findMany({
		where: eq(schema.userRoles.userId, userId),
		with: { role: true }
	});
	return rows.map((r) => r.role);
}
