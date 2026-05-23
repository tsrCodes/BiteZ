import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { requirePermission } from '@/server/permissions';
import { listRoles, createRole } from '@/server/services/rbac.service';
import { CreateRoleSchema } from '@/schemas/roles';
import { AppError } from '@/server/errors';
import * as v from 'valibot';

export async function GET(event: RequestEvent) {
	try {
		await requirePermission(event, 'settings');
		const roles = await listRoles();
		return json({ data: roles });
	} catch (err) {
		if (err instanceof AppError) {
			return json({ error: err.message, code: err.code }, { status: err.status });
		}
		throw err;
	}
}

export async function POST(event: RequestEvent) {
	try {
		await requirePermission(event, 'settings');
		const body = await event.request.json();
		const input = v.parse(CreateRoleSchema, body);
		const role = await createRole(input);
		return json({ data: role }, { status: 201 });
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
