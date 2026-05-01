<script lang="ts">
	import { Text, Button } from '@better-svelte-email/components';
	import EmailLayout from '../components/EmailLayout.svelte';

	let {
		name,
		verificationUrl,
		appName = 'BiteZ'
	}: {
		name: string;
		verificationUrl: string;
		appName?: string;
	} = $props();
</script>

<EmailLayout previewText={`Verify your ${appName} account`}>
	<Text style="font-size: 16px; margin-bottom: 20px;">Hello <strong>{name}</strong>,</Text>
	<Text style="font-size: 16px; margin-bottom: 20px;">
		Thank you for creating an account with {appName}! Please verify your email address to start
		using our services.
	</Text>
	<Button
		href={verificationUrl}
		style="background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block; margin: 20px 0;"
	>
		Verify Email Address
	</Button>
	<Text style="font-size: 14px; color: #666666; margin-top: 20px;">
		This verification link will expire in 24 hours.
	</Text>
	<Text style="font-size: 14px; margin-top: 30px;">Best regards,<br />The {appName} Team</Text>
</EmailLayout>
