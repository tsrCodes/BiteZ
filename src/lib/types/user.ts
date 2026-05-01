import type { User as AuthUser } from 'better-auth';

export type User = AuthUser & {
	branchId?: string | null | undefined;
	phone?: string | null | undefined;
	username?: string | null | undefined;
	isGuest?: boolean | undefined;
	status?: 'ACTIVE' | 'INACTIVE' | null | undefined;
	balance?: number | undefined;
	countryCode?: string | null | undefined;
	deviceToken?: string | null | undefined;
	webToken?: string | null | undefined;
};
