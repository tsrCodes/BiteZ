import { db } from '@/db';
import { eq, inArray } from 'drizzle-orm';
import { permissions, roles, rolePermissions } from '@/db/schemas';
import { PERMISSION_TREE, SYSTEM_ROLES, getAllPermissionNames } from '@/server/rbac/seed-data';

export async function seedRbacDefaults(): Promise<{ permissions: number; roles: number }> {
	const parentValues = PERMISSION_TREE.map((p) => ({
		name: p.name,
		module: p.module,
		action: p.action,
		description: p.description,
		parentId: null as string | null
	}));

	for (const perm of parentValues) {
		await db.insert(permissions).values(perm).onConflictDoNothing({ target: permissions.name });
	}

	const parentNames = parentValues.map((p) => p.name);
	const insertedParents = await db
		.select({ id: permissions.id, name: permissions.name })
		.from(permissions)
		.where(inArray(permissions.name, parentNames));

	const parentIdMap = new Map(insertedParents.map((p) => [p.name, p.id]));

	let totalPerms = parentValues.length;

	for (const parent of PERMISSION_TREE) {
		if (!parent.children?.length) continue;
		const parentId = parentIdMap.get(parent.name) ?? null;

		for (const child of parent.children) {
			await db
				.insert(permissions)
				.values({
					name: child.name,
					module: child.module,
					action: child.action,
					description: child.description,
					parentId
				})
				.onConflictDoNothing({ target: permissions.name });

			totalPerms++;
		}
	}

	const allPermissions = await db
		.select({ id: permissions.id, name: permissions.name })
		.from(permissions);
	const permNameToId = new Map(allPermissions.map((p) => [p.name, p.id]));

	let rolesSeeded = 0;

	for (const roleSeed of SYSTEM_ROLES) {
		const [existing] = await db
			.select({ id: roles.id })
			.from(roles)
			.where(eq(roles.name, roleSeed.name))
			.limit(1);

		let roleId: string;

		if (existing) {
			await db
				.update(roles)
				.set({ isSystem: roleSeed.isSystem, description: roleSeed.description })
				.where(eq(roles.id, existing.id));
			roleId = existing.id;
		} else {
			const [inserted] = await db
				.insert(roles)
				.values({
					name: roleSeed.name,
					description: roleSeed.description,
					isSystem: roleSeed.isSystem
				})
				.returning({ id: roles.id });
			roleId = inserted.id;
			rolesSeeded++;
		}

		const permissionNames =
			roleSeed.name === 'Admin' ? getAllPermissionNames() : roleSeed.permissions;

		await db.delete(rolePermissions).where(eq(rolePermissions.roleId, roleId));

		const assignments = permissionNames
			.map((name) => permNameToId.get(name))
			.filter((id): id is string => id !== undefined)
			.map((permissionId) => ({ roleId, permissionId }));

		if (assignments.length > 0) {
			await db.insert(rolePermissions).values(assignments).onConflictDoNothing();
		}
	}

	console.log(`✅ RBAC seed complete — ${totalPerms} permissions, ${SYSTEM_ROLES.length} roles`);

	return { permissions: totalPerms, roles: SYSTEM_ROLES.length };
}
