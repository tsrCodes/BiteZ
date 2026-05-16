import type { LayoutServerLoad } from './$types';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { branches, type Branch } from '@/db/schemas';
import { redirect } from '@sveltejs/kit';
import { COOKIE } from '@/utils/config';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const activeBranches: Branch[] = await db
		.select()
		.from(branches)
		.where(eq(branches.status, 'ACTIVE'))
		.orderBy(branches.name);

	const cookieBranchId = cookies.get(COOKIE.activeBranch);
	const userBranchId = locals.user.branchId;

	let activeBranchId: string | null = null;

	if (cookieBranchId && activeBranches.some((b) => b.id === cookieBranchId)) {
		activeBranchId = cookieBranchId;
	} else if (userBranchId && activeBranches.some((b) => b.id === userBranchId)) {
		activeBranchId = userBranchId;
	} else {
		activeBranchId = activeBranches[0]?.id ?? null;
	}

	return {
		currentUser: locals.user,
		branches: activeBranches,
		activeBranchId
	};
};
