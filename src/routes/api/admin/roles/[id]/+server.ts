import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { requirePermission } from '@/server/permissions';
import { getRoleById, updateRole, deleteRole } from '@/server/services/rbac.service';
import { UpdateRoleSchema } from '@/schemas/roles';
import { AppError } from '@/server/errors';
import * as v from 'valibot';

export async function GET(event: RequestEvent) {
	try {
		await requirePermission(event, 'settings');
		const { id } = event.params as { id: string };
		const role = await getRoleById(id);
		return json({ data: role });
	} catch (err) {
		if (err instanceof AppError) {
			return json({ error: err.message, code: err.code }, { status: err.status });
		}
		throw err;
	}
}

export async function PUT(event: RequestEvent) {
	try {
		await requirePermission(event, 'settings');
		const { id } = event.params as { id: string };
		const body = await event.request.json();
		const input = v.parse(UpdateRoleSchema, body);
		const updated = await updateRole(id, input);
		return json({ data: updated });
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

export async function DELETE(event: RequestEvent) {
	try {
		await requirePermission(event, 'settings');
		const { id } = event.params as { id: string };
		const result = await deleteRole(id);
		return json({ data: result });
	} catch (err) {
		if (err instanceof AppError) {
			return json({ error: err.message, code: err.code }, { status: err.status });
		}
		throw err;
	}
}
