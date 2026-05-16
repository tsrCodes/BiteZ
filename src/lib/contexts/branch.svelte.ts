import { createContext } from 'svelte';
import type { Branch } from '@/db/schemas';

export type BranchContext = {
	branches: Branch[];
	activeBranch: Branch | null;
};

export const [getBranch, setBranch] = createContext<BranchContext>();
