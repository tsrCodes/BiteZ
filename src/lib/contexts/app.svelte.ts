import { createContext } from 'svelte';
import type { User } from '@/types';
import type { Branch } from '@/db/schemas';

export type AppData = {
	currentUser: User;
	branches: Branch[];
	activeBranch?: Branch;
};

export const [getAppData, setAppData] = createContext<AppData>();
