<script lang="ts">
	import Zap from '@lucide/svelte/icons/zap';
	import { login } from './login.remote';
	import * as Card from '@/components/ui/card';
	import { Button } from '@/components/ui/button';
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Sign in | BiteZ</title>
</svelte:head>

<div
	class="relative flex min-h-svh flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<!-- Left Column: Form -->
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8">
			<!-- Brand Header -->
			<div class="mb-4 flex items-center justify-center">
				<Zap class="me-2 size-6" />
				<h1 class="text-xl font-medium">BiteZ</h1>
			</div>
		</div>

		<Card.Root class="mx-auto w-full max-w-sm gap-4">
			<Card.Header>
				<Card.Title class="text-lg tracking-tight">Sign in</Card.Title>
				<Card.Description>Enter your email and password to access your account</Card.Description>
			</Card.Header>

			<Card.Content>
				<form {...login} class="space-y-4">
					<div class="space-y-2">
						<Label for={login.fields.email.as('email').name}>Email</Label>
						<Input
							{...login.fields.email.as('email')}
							aria-invalid={login.fields.email.as('email')['aria-invalid']}
							class={login.fields.email.as('email')['aria-invalid'] ? 'border-destructive' : ''}
						/>
						{#each login.fields.email.issues() as issue (issue.message)}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
					</div>

					<div class="space-y-2">
						<div class="flex items-center justify-between">
							<Label for={login.fields.password.as('password').name}>Password</Label>
							<a
								href={resolve('/forgot-password')}
								class="text-xs text-muted-foreground underline-offset-4 hover:underline"
							>
								Forgot password?
							</a>
						</div>
						<Input
							{...login.fields.password.as('password')}
							aria-invalid={login.fields.password.as('password')['aria-invalid']}
							class={login.fields.password.as('password')['aria-invalid']
								? 'border-destructive'
								: ''}
						/>
						{#each login.fields.password.issues() as issue (issue.message)}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
					</div>

					{#if login.result?.error}
						<p class="text-center text-sm text-destructive">{login.result.error}</p>
					{/if}

					<Button type="submit" class="w-full rounded-xl" disabled={!!login.pending}>
						{#if login.pending}Signing in...{:else}Sign In{/if}
					</Button>
				</form>
			</Card.Content>

			<Card.Footer>
				<p class="px-8 text-center text-sm text-muted-foreground">
					Don't have an account? <a
						href={resolve('/register')}
						class="underline underline-offset-4 hover:text-primary">Sign Up</a
					>
					<br />
				</p>
			</Card.Footer>
		</Card.Root>
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
