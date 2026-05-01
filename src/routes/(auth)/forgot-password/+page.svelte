<script lang="ts">
	import { forgotPassword } from './forgot-password.remote';
	import * as Card from '@/components/ui/card';
	import { Button } from '@/components/ui/button';
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import Zap from '@lucide/svelte/icons/zap';
	import { resolve } from '$app/paths';
</script>

<svelte:head><title>Forgot Password | BiteZ</title></svelte:head>

<div
	class="relative flex min-h-svh flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<!-- Left Column: Form -->
	<div class="lg:p-8">
		<!-- Brand Header -->
		<div class="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8">
			<div class="mb-4 flex items-center justify-center">
				<Zap class="me-2 size-6" />
				<h1 class="text-xl font-medium">BiteZ</h1>
			</div>
		</div>

		<div class="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
			<Card.Root class="mx-auto w-full max-w-sm gap-4">
				<Card.Header>
					<Card.Title class="text-lg tracking-tight">Forgot password?</Card.Title>
					<Card.Description>
						Enter your registered email and we will send you a link to reset your password.
					</Card.Description>
				</Card.Header>

				<Card.Content>
					<form {...forgotPassword} class="space-y-4">
						<div class="space-y-2">
							<Label for={forgotPassword.fields.email.as('email').name}>Email</Label>
							<Input
								{...forgotPassword.fields.email.as('email')}
								aria-invalid={forgotPassword.fields.email.as('email')['aria-invalid']}
								class={forgotPassword.fields.email.as('email')['aria-invalid']
									? 'border-destructive'
									: ''}
							/>
							{#each forgotPassword.fields.email.issues() as issue (issue.message)}
								<p class="text-xs text-destructive">{issue.message}</p>
							{/each}
						</div>

						{#if forgotPassword.result?.success}
							<p class="text-center text-sm text-green-600">
								If an account exists with this email, a reset link has been sent.
							</p>
						{/if}

						<Button type="submit" class="w-full rounded-xl" disabled={!!forgotPassword.pending}>
							{#if forgotPassword.pending}Sending...{:else}Send reset link{/if}
						</Button>
					</form>
				</Card.Content>

				<Card.Footer>
					<p class="px-8 text-center text-sm text-muted-foreground">
						Remember your password?
						<a
							href={resolve('/login')}
							class="text-primary underline-offset-4 hover:underline"
							data-sveltekit-preload-data="hover">Sign In</a
						>
					</p>
				</Card.Footer>
			</Card.Root>
		</div>
	</div>

	<!-- Right Column: Testimonial / Brand -->
	<div
		class="relative hidden h-full flex-col bg-muted p-10 text-primary-foreground lg:flex dark:border-l"
	>
		<div class="absolute inset-0 bg-primary"></div>
		<div class="relative z-20 flex items-center text-lg font-medium">
			<Zap class="me-2 size-6" />
			BiteZ
		</div>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">
					&ldquo;BiteZ transformed how we manage our restaurant operations. The real-time order
					tracking and kitchen display have become essential to our daily workflow.&rdquo;
				</p>
			</blockquote>
		</div>
	</div>
</div>
