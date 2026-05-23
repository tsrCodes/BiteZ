export function formatModuleName(name: string) {
	return name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

export function moduleCheckState(
	moduleId: string,
	childIds: string[],
	selectedIds: Set<string>
): 'checked' | 'unchecked' | 'indeterminate' {
	const moduleSelected = selectedIds.has(moduleId);
	if (childIds.length === 0) {
		return moduleSelected ? 'checked' : 'unchecked';
	}
	const childCount = childIds.filter((id) => selectedIds.has(id)).length;
	if (childCount === 0 && !moduleSelected) return 'unchecked';
	if (childCount === childIds.length && moduleSelected) return 'checked';
	return 'indeterminate';
}
