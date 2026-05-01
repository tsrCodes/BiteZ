import type { LayoutServerLoad } from './$types';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { branches } from '@/db/schemas';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const activeBranches = await db
		.select()
		.from(branches)
		.where(eq(branches.status, 'ACTIVE'))
		.orderBy(branches.name);

	const userBranchId = locals.user.branchId;
	const assignedBranch = activeBranches.find((b) => b.id === userBranchId);
	const defaultBranch = assignedBranch ?? activeBranches[0];

	return {
		currentUser: {
			...locals.user
		},
		branches: activeBranches.map((b) => ({
			id: b.id,
			name: b.name,
			location: b.city ?? b.address ?? '',
			isActive: b.status === 'ACTIVE'
		})),
		activeBranchId: defaultBranch?.id ?? null
	};
};
