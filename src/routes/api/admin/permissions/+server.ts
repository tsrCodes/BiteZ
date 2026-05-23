import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { requirePermission } from '@/server/permissions';
import { getPermissionTree } from '@/server/services/rbac.service';
import { AppError } from '@/server/errors';

export async function GET(event: RequestEvent) {
	try {
		await requirePermission(event, 'settings');
		const tree = await getPermissionTree();
		return json({ data: tree });
	} catch (err) {
		if (err instanceof AppError) {
			return json({ error: err.message, code: err.code }, { status: err.status });
		}
		throw err;
	}
}
