<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head><title>Privacy Policy | BiteZ</title></svelte:head>

<div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
	<h1 class="text-3xl font-bold tracking-tight">Privacy Policy</h1>
	<p class="mt-2 text-muted-foreground">Last updated: May 2026</p>

	<div class="mt-8 space-y-6 text-sm leading-relaxed">
		<section>
			<h2 class="text-xl font-semibold">1. Information We Collect</h2>
			<p>
				We collect information you provide directly (name, email, payment details) and automatically
				(device info, logs, cookies) to operate and improve our services.
			</p>
		</section>
		<section>
			<h2 class="text-xl font-semibold">2. How We Use Your Data</h2>
			<p>
				Data is used to process orders, manage accounts, send notifications, improve platform
				performance, and comply with legal obligations.
			</p>
		</section>
		<section>
			<h2 class="text-xl font-semibold">3. Data Sharing</h2>
			<p>
				We do not sell your personal data. We may share information with trusted service providers
				(payment processors, delivery partners) strictly for operational purposes.
			</p>
		</section>
		<section>
			<h2 class="text-xl font-semibold">4. Security</h2>
			<p>
				We implement industry-standard security measures including encryption, access controls, and
				regular audits. However, no system is completely secure.
			</p>
		</section>
		<section>
			<h2 class="text-xl font-semibold">5. Your Rights</h2>
			<p>
				You may request access, correction, or deletion of your personal data. Contact our support
				team to exercise these rights.
			</p>
		</section>
		<section>
			<h2 class="text-xl font-semibold">6. Cookies & Tracking</h2>
			<p>
				We use essential cookies for authentication and session management. Analytics cookies help
				us understand usage patterns and can be managed in your browser settings.
			</p>
		</section>
	</div>

	<div class="mt-8 border-t pt-6">
		<a href={resolve('/login')} class="text-primary hover:underline">← Back to Sign In</a>
	</div>
</div>
