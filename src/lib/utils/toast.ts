import { toast } from 'svelte-sonner';

export const toastHandlers = {
	success: toast.success,
	error: toast.error,
	warning: toast.warning,
	info: toast.info,
	loading: toast.loading
} as const;

export type ToastType = keyof typeof toastHandlers;

export interface Toast {
	id: string;
	type: ToastType;
	message: string;
}

export const TOAST_IDS = {
	importingDefaults: 'importingDefaults'
} as const;
