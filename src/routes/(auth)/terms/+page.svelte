<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head><title>Terms of Service | BiteZ</title></svelte:head>

<div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
	<h1 class="text-3xl font-bold tracking-tight">Terms of Service</h1>
	<p class="mt-2 text-muted-foreground">Last updated: May 2026</p>

	<div class="mt-8 space-y-6 text-sm leading-relaxed">
		<section>
			<h2 class="text-xl font-semibold">1. Acceptance of Terms</h2>
			<p>
				By accessing or using BiteZ, you agree to be bound by these Terms. If you do not agree,
				please discontinue use immediately.
			</p>
		</section>
		<section>
			<h2 class="text-xl font-semibold">2. User Accounts</h2>
			<p>
				You are responsible for maintaining the confidentiality of your account credentials and for
				all activities under your account. Notify us immediately of any unauthorized use.
			</p>
		</section>
		<section>
			<h2 class="text-xl font-semibold">3. Acceptable Use</h2>
			<p>
				You agree not to misuse our services, attempt to gain unauthorized access, or use automated
				systems to scrape data without prior written consent.
			</p>
		</section>
		<section>
			<h2 class="text-xl font-semibold">4. Intellectual Property</h2>
			<p>
				All content, logos, and functionality provided by BiteZ are the property of BiteZ or its
				licensors and are protected by applicable intellectual property laws.
			</p>
		</section>
		<section>
			<h2 class="text-xl font-semibold">5. Limitation of Liability</h2>
			<p>
				BiteZ is provided "as is" without warranties of any kind. We shall not be liable for any
				indirect, incidental, or consequential damages arising from your use of the service.
			</p>
		</section>
		<section>
			<h2 class="text-xl font-semibold">6. Modifications</h2>
			<p>
				We reserve the right to modify these terms at any time. Continued use after changes
				constitutes acceptance of the new terms.
			</p>
		</section>
	</div>

	<div class="mt-8 border-t pt-6">
		<a href={resolve('/login')} class="text-primary hover:underline">← Back to Sign In</a>
	</div>
</div>
