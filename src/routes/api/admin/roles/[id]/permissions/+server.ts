import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { requirePermission } from '@/server/permissions';
import { setRolePermissions } from '@/server/services/rbac.service';
import { AssignPermissionsSchema } from '@/schemas/permissions';
import { AppError } from '@/server/errors';
import * as v from 'valibot';

export async function PUT(event: RequestEvent) {
	try {
		await requirePermission(event, 'settings');
		const { id } = event.params as { id: string };
		const body = await event.request.json();
		const input = v.parse(AssignPermissionsSchema, body);
		const result = await setRolePermissions(id, input.permissionIds);
		return json({ data: result });
	} catch (err) {
		if (err instanceof v.ValiError) {
			return json({ error: 'Validation failed', issues: err.issues }, { status: 422 });
		}
		if (err instanceof AppError) {
			return json({ error: err.message, code: err.code }, { status: err.status });
		}
		throw err;
	}
}
