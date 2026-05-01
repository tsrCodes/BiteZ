<script lang="ts">
	import { register } from './register.remote';
	import * as Card from '@/components/ui/card';
	import Zap from '@lucide/svelte/icons/zap';
	import { Button } from '@/components/ui/button';
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import { resolve } from '$app/paths';
</script>

<svelte:head><title>Create Account | BiteZ</title></svelte:head>

<div class="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8">
	<!-- Brand Header -->
	<div class="mb-4 flex items-center justify-center">
		<Zap class="me-2 size-6" />
		<h1 class="text-xl font-medium">BiteZ</h1>
	</div>

	<Card.Root class="gap-4">
		<Card.Header>
			<Card.Title class="text-lg tracking-tight">Create an account</Card.Title>
			<Card.Description>
				Enter your details to get started <br />
				Already have an account?
				<a href={resolve('/login')} class="text-primary underline-offset-4 hover:underline"
					>Sign In</a
				>
			</Card.Description>
		</Card.Header>

		<Card.Content>
			<form {...register} class="space-y-4">
				<div class="space-y-2">
					<Label for={register.fields.name.as('text').name}>Full Name</Label>
					<Input
						{...register.fields.name.as('text')}
						aria-invalid={register.fields.name.as('text')['aria-invalid']}
						class={register.fields.name.as('text')['aria-invalid'] ? 'border-destructive' : ''}
					/>
					{#each register.fields.name.issues() as issue (issue.message)}
						<p class="text-xs text-destructive">{issue.message}</p>
					{/each}
				</div>

				<div class="space-y-2">
					<Label for={register.fields.email.as('email').name}>Email</Label>
					<Input
						{...register.fields.email.as('email')}
						aria-invalid={register.fields.email.as('email')['aria-invalid']}
						class={register.fields.email.as('email')['aria-invalid'] ? 'border-destructive' : ''}
					/>
					{#each register.fields.email.issues() as issue (issue.message)}
						<p class="text-xs text-destructive">{issue.message}</p>
					{/each}
				</div>

				<div class="space-y-2">
					<Label for={register.fields.password.as('password').name}>Password</Label>
					<Input
						{...register.fields.password.as('password')}
						aria-invalid={register.fields.password.as('password')['aria-invalid']}
						class={register.fields.password.as('password')['aria-invalid']
							? 'border-destructive'
							: ''}
					/>
					{#each register.fields.password.issues() as issue (issue.message)}
						<p class="text-xs text-destructive">{issue.message}</p>
					{/each}
				</div>

				<div class="space-y-2">
					<Label for={register.fields.confirmPassword.as('password').name}>Confirm Password</Label>
					<Input
						{...register.fields.confirmPassword.as('password')}
						aria-invalid={register.fields.confirmPassword.as('password')['aria-invalid']}
						class={register.fields.confirmPassword.as('password')['aria-invalid']
							? 'border-destructive'
							: ''}
					/>
					{#each register.fields.confirmPassword.issues() as issue (issue.message)}
						<p class="text-xs text-destructive">{issue.message}</p>
					{/each}
				</div>

				{#if register.result?.error}
					<p class="text-center text-sm text-destructive">{register.result.error}</p>
				{/if}

				<Button type="submit" class="w-full rounded-xl" disabled={!!register.pending}>
					{#if register.pending}Creating account...{:else}Create Account{/if}
				</Button>
			</form>
		</Card.Content>

		<Card.Footer>
			<p class="px-8 text-center text-sm text-muted-foreground">
				By clicking sign in, you agree to our
				<a href={resolve('/terms')} class="underline underline-offset-4 hover:text-primary"
					>Terms of Service</a
				>
				and
				<a href={resolve('/privacy')} class="underline underline-offset-4 hover:text-primary"
					>Privacy Policy</a
				>.
			</p>
		</Card.Footer>
	</Card.Root>
</div>
