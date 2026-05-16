import { createMutation } from '@tanstack/svelte-query';
import { toast } from 'svelte-sonner';
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { authClient } from '@/client/auth';

export interface SignOutData {
	success: boolean;
}

export interface UseSignOutOptions {
	onSuccess?: () => void;
	onError?: (error: unknown) => void;
}

export interface UseSignOutReturn {
	signOut: () => Promise<SignOutData>;
	isSigningOut: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: unknown | null;
	data: SignOutData | undefined;
	reset: () => void;
}

export function useSignOut(options?: UseSignOutOptions): UseSignOutReturn {
	const { onSuccess: userOnSuccess, onError: userOnError } = options ?? {};

	const mutation = createMutation<SignOutData, Error, void>(() => ({
		mutationFn: async (): Promise<SignOutData> => {
			await authClient.signOut();
			return { success: true };
		},
		onSuccess: () => {
			userOnSuccess?.();
			goto(resolve('/(auth)/login'));
		},
		onError: (error: Error) => {
			const message = error?.message ?? 'Failed to sign out. Please try again.';
			toast.error(message);
			userOnError?.(error);
		}
	}));

	return {
		signOut: mutation.mutateAsync,
		isSigningOut: mutation.isPending,
		isError: mutation.isError,
		isSuccess: mutation.isSuccess,
		error: mutation.error,
		data: mutation.data,
		reset: mutation.reset
	};
}
