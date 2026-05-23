import * as v from 'valibot';

export const CreateRoleSchema = v.object({
	name: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(2, 'Role name must be at least 2 characters'),
		v.maxLength(64, 'Role name must be at most 64 characters')
	),
	description: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(255)))
});

export const UpdateRoleSchema = v.object({
	name: v.optional(
		v.pipe(
			v.string(),
			v.trim(),
			v.minLength(2, 'Role name must be at least 2 characters'),
			v.maxLength(64, 'Role name must be at most 64 characters')
		)
	),
	description: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(255)))
});

export const AssignRoleSchema = v.object({
	userId: v.pipe(v.string(), v.uuid('Invalid user ID')),
	roleId: v.pipe(v.string(), v.uuid('Invalid role ID'))
});

export type CreateRoleInput = v.InferInput<typeof CreateRoleSchema>;
export type UpdateRoleInput = v.InferInput<typeof UpdateRoleSchema>;
