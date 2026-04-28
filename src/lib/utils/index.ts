import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export function isMac(): boolean {
	if (typeof navigator === 'undefined') return false;
	if ('userAgentData' in navigator && navigator.userAgentData) {
		return (
			(navigator as Navigator & { userAgentData: { platform: string } }).userAgentData.platform ===
			'macOS'
		);
	}
	return /Mac|iPhone|iPod|iPad/.test(navigator.platform);
}
