import { db } from '@/db';
import { branches, type BranchInsert, type Branch } from '@/db/schemas';
import { eq } from 'drizzle-orm';
import { NotFoundError, ValidationError } from '../errors';

export const BranchService = {
	async findAll(activeOnly = true): Promise<Branch[]> {
		if (activeOnly) {
			return db.select().from(branches).where(eq(branches.status, 'ACTIVE'));
		}
		return db.select().from(branches);
	},

	async findById(id: string): Promise<Branch> {
		const branch = await db.query.branches.findFirst({
			where: eq(branches.id, id)
		});
		if (!branch) throw new NotFoundError('Branch not found');
		return branch;
	},

	async create(data: BranchInsert): Promise<Branch> {
		if (!data.name?.trim()) throw new ValidationError('Branch name is required');
		const [newBranch] = await db.insert(branches).values(data).returning();
		return newBranch;
	},

	async update(id: string, data: Partial<BranchInsert>): Promise<Branch> {
		const [updated] = await db.update(branches).set(data).where(eq(branches.id, id)).returning();
		if (!updated) throw new NotFoundError('Branch not found');
		return updated;
	},

	async delete(id: string): Promise<void> {
		const [deleted] = await db
			.delete(branches)
			.where(eq(branches.id, id))
			.returning({ id: branches.id });
		if (!deleted) throw new NotFoundError('Branch not found');
	}
};
