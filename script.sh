#!/usr/bin/env bash

set -e

echo "🚀 Setting up Roles architecture..."

# =============================================================================

# PATHS

# =============================================================================

BASE="src/lib/components/roles"

# =============================================================================

# CREATE FOLDERS

# =============================================================================

mkdir -p "$BASE/dialogs"
mkdir -p "$BASE/permissions"

mkdir -p "src/lib/types"
mkdir -p "src/lib/constants"
mkdir -p "src/lib/server/services"

# =============================================================================

# CREATE COMPONENT FILES

# =============================================================================

touch "$BASE/header.svelte"
touch "$BASE/table.svelte"
touch "$BASE/row.svelte"

touch "$BASE/dialogs/create.svelte"
touch "$BASE/dialogs/edit.svelte"
touch "$BASE/dialogs/delete.svelte"
touch "$BASE/dialogs/permissions.svelte"

touch "$BASE/permissions/module.svelte"
touch "$BASE/permissions/action.svelte"

# =============================================================================

# COMPONENT UTILS

# =============================================================================

cat > "$BASE/utils.ts" <<'EOF'
export function formatModuleName(name: string) {
return name
.replace(/-/g, ' ')
.replace(/\b\w/g, (l) => l.toUpperCase());
}

export function moduleCheckState(
moduleSelected: boolean,
childIds: string[],
selectedIds: Set<string>
) {
if (childIds.length === 0) {
return moduleSelected ? 'checked' : 'unchecked';
}

```
const childCount = childIds.filter((id) =>
	selectedIds.has(id)
).length;

if (childCount === 0 && !moduleSelected) {
	return 'unchecked';
}

if (
	childCount === childIds.length &&
	moduleSelected
) {
	return 'checked';
}

return 'indeterminate';
```

}
EOF

# =============================================================================

# TYPES

# =============================================================================

cat > "src/lib/types/roles.ts" <<'EOF'
import type {
InferInsertModel,
InferSelectModel
} from 'drizzle-orm';

import {
roles,
permissions
} from '@/db/schemas';

export type Role = InferSelectModel<typeof roles>;

export type NewRole =
InferInsertModel<typeof roles>;

export type Permission =
InferSelectModel<typeof permissions>;

export type RoleWithPermissions =
Role & {
permissions: Permission[];

```
	permissionCount: number;
	userCount: number;
};
```

export type PermissionTree =
Permission & {
children: Permission[];
};
EOF

# =============================================================================

# CONSTANTS

# =============================================================================

cat > "src/lib/constants/permissions.ts" <<'EOF'
export const SYSTEM_ROLE_NAMES = [
'Admin'
];

export const PROTECTED_ROLE_NAMES = [
'Admin'
];

export const PERMISSION_ACTIONS = [
'create',
'view',
'update',
'delete',
'export',
'approve'
] as const;
EOF

# =============================================================================

# SERVER SERVICE

# =============================================================================

cat > "src/lib/server/services/roles.ts" <<'EOF'
export async function createRole() {
// TODO:
// implement
}

export async function updateRole() {
// TODO:
// implement
}

export async function deleteRole() {
// TODO:
// implement
}

export async function updateRolePermissions() {
// TODO:
// implement
}
EOF

# =============================================================================

# HEADER

# =============================================================================

cat > "$BASE/header.svelte" <<'EOF'

<script lang="ts">
	// TODO:
	// Extract roles header
</script>

EOF

# =============================================================================

# TABLE

# =============================================================================

cat > "$BASE/table.svelte" <<'EOF'

<script lang="ts">
	// TODO:
	// Extract roles table
</script>

EOF

# =============================================================================

# ROW

# =============================================================================

cat > "$BASE/row.svelte" <<'EOF'

<script lang="ts">
	// TODO:
	// Extract roles row
</script>

EOF

# =============================================================================

# DIALOGS

# =============================================================================

cat > "$BASE/dialogs/create.svelte" <<'EOF'

<script lang="ts">
	// TODO:
	// Extract create dialog
</script>

EOF

cat > "$BASE/dialogs/edit.svelte" <<'EOF'

<script lang="ts">
	// TODO:
	// Extract edit dialog
</script>

EOF

cat > "$BASE/dialogs/delete.svelte" <<'EOF'

<script lang="ts">
	// TODO:
	// Extract delete dialog
</script>

EOF

cat > "$BASE/dialogs/permissions.svelte" <<'EOF'

<script lang="ts">
	// TODO:
	// Extract permissions dialog
</script>

EOF

# =============================================================================

# PERMISSION COMPONENTS

# =============================================================================

cat > "$BASE/permissions/module.svelte" <<'EOF'

<script lang="ts">
	// TODO:
	// Extract permission module
</script>

EOF

cat > "$BASE/permissions/action.svelte" <<'EOF'

<script lang="ts">
	// TODO:
	// Extract permission action
</script>

EOF

echo ""
echo "✅ Roles architecture generated successfully."
echo ""
echo "NEXT:"
echo "1. Move header"
echo "2. Move table"
echo "3. Move row"
echo "4. Move dialogs"
echo "5. Reduce +page.svelte to orchestration"
echo ""
