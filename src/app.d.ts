import type { User, Session } from '@/types';

declare global {
	namespace App {
		interface Error {
			message: string;
			status?: number;
		}
		interface Locals {
			session: Session | null;
			user: User | null;
		}
		interface PageData {
			flash?: { type: 'success' | 'error' | 'warning' | 'info'; message: string };
		}
	}
}
export {};
