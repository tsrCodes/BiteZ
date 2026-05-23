import * as v from 'valibot';

export const AssignPermissionsSchema = v.object({
	permissionIds: v.array(v.pipe(v.string(), v.uuid('Invalid permission ID')))
});

export type AssignPermissionsInput = v.InferInput<typeof AssignPermissionsSchema>;
