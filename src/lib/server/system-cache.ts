import { db } from '@/db';

let onboardedCache: { value: boolean; ts: number } | null = null;
const CACHE_TTL = 60_000;

export async function isOnboarded(): Promise<boolean> {
	if (onboardedCache && Date.now() - onboardedCache.ts < CACHE_TTL) return onboardedCache.value;
	const system = await db.query.systemSettings.findFirst();
	const value = system?.isOnboarded ?? false;
	onboardedCache = { value, ts: Date.now() };
	return value;
}

export function invalidateOnboardedCache() {
	onboardedCache = null;
}
