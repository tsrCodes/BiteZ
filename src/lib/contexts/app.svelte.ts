import { createContext } from 'svelte';
import type { User, Branch } from '@/types';

export type AppData = {
	currentUser: User;
	branches: Branch[];
	activeBranch?: Branch;
};

export const [getAppData, setAppData] = createContext<AppData>();
