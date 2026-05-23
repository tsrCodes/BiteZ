import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { hasPermission } from '@/server/permissions';
import {
	listRoles,
	getPermissionTree,
	createRole,
	updateRole,
	deleteRole,
	setRolePermissions
} from '@/server/services/rbac.service';
import { seedRbacDefaults } from '@/db/seed-rbac';
import { clearPermissionCache } from '@/server/permissions';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(303, '/login/');

	const [roles, permissionTree] = await Promise.all([listRoles(), getPermissionTree()]);
	const isSeeded = roles.some((r) => r.isSystem);

	if (!isSeeded) return { roles, permissionTree, isSeeded };

	const canManage = await hasPermission(locals.user.id, 'settings');
	if (!canManage) throw redirect(303, '/');

	return { roles, permissionTree, isSeeded };
};

export const actions: Actions = {
	seedDefaults: async ({ locals }) => {
		if (!locals.user) {
			return fail(401, { success: false, message: 'Unauthorized' });
		}

		const allowed = await hasPermission(locals.user.id, 'settings');
		if (!allowed) {
			return fail(403, { success: false, message: 'Insufficient permissions' });
		}

		try {
			const result = await seedRbacDefaults();
			clearPermissionCache();

			return {
				success: true,
				message: `Seeded ${result.permissions} permissions and ${result.roles} roles successfully`
			};
		} catch (error) {
			console.error('RBAC seed failed:', error);
			return fail(500, { success: false, message: 'Failed to seed RBAC defaults' });
		}
	},
	create: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}

		const allowed = await hasPermission(locals.user.id, 'settings');

		if (!allowed) return fail(403, { message: 'Insufficient permissions' });

		const formData = await request.formData();

		const name = formData.get('name')?.toString().trim() ?? '';

		const description = formData.get('description')?.toString().trim() || null;

		if (!name) return fail(400, { message: 'Role name is required' });

		try {
			await createRole({
				name,
				...(description ? { description } : {})
			});

			clearPermissionCache();

			return {
				success: true,
				message: 'Role created successfully'
			};
		} catch (error) {
			console.error('Create role failed:', error);

			return fail(500, {
				message: 'Failed to create role'
			});
		}
	},
	update: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}

		const allowed = await hasPermission(locals.user.id, 'settings');

		if (!allowed) {
			return fail(403, {
				message: 'Insufficient permissions'
			});
		}

		const formData = await request.formData();

		const id = formData.get('id')?.toString() ?? '';

		const name = formData.get('name')?.toString().trim() ?? '';

		const description = formData.get('description')?.toString().trim() || null;

		if (!id || !name) {
			return fail(400, {
				message: 'Invalid role data'
			});
		}

		try {
			await updateRole(id, {
				...(name ? { name } : {}),
				...(description ? { description } : {})
			});

			clearPermissionCache();

			return {
				success: true,
				message: 'Role updated successfully'
			};
		} catch (error) {
			console.error('Update role failed:', error);

			return fail(500, {
				message: 'Failed to update role'
			});
		}
	},
	delete: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}

		const allowed = await hasPermission(locals.user.id, 'settings');

		if (!allowed) {
			return fail(403, {
				message: 'Insufficient permissions'
			});
		}

		const formData = await request.formData();

		const id = formData.get('id')?.toString() ?? '';

		if (!id) {
			return fail(400, {
				message: 'Role ID is required'
			});
		}

		try {
			await deleteRole(id);

			clearPermissionCache();

			return {
				success: true,
				message: 'Role deleted successfully'
			};
		} catch (error) {
			console.error('Delete role failed:', error);

			return fail(500, {
				message: 'Failed to delete role'
			});
		}
	},
	updatePermissions: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}
		const allowed = await hasPermission(locals.user.id, 'settings');

		if (!allowed) {
			return fail(403, {
				message: 'Insufficient permissions'
			});
		}

		const formData = await request.formData();

		const roleId = formData.get('roleId')?.toString() ?? '';

		const permissionIds = formData.getAll('permissionIds') as string[];

		if (!roleId) {
			return fail(400, {
				message: 'Role ID is required'
			});
		}

		try {
			await setRolePermissions(roleId, permissionIds);

			clearPermissionCache();

			return {
				success: true,
				message: 'Permissions updated successfully'
			};
		} catch (error) {
			console.error('Permission update failed:', error);

			return fail(500, {
				message: 'Failed to update permissions'
			});
		}
	}
};
