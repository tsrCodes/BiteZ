<script lang="ts">
	import { Text, Button } from '@better-svelte-email/components';
	import EmailLayout from '../components/EmailLayout.svelte';

	let {
		name,
		resetUrl,
		appName = 'BiteZ'
	}: {
		name: string;
		resetUrl: string;
		appName?: string;
	} = $props();
</script>

<EmailLayout previewText={`Reset your ${appName} password`}>
	<Text style="font-size: 16px; margin-bottom: 20px;">Hello <strong>{name}</strong>,</Text>
	<Text style="font-size: 16px; margin-bottom: 20px;">
		We received a request to reset the password for your {appName} account.
	</Text>
	<Button
		href={resetUrl}
		style="background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block; margin: 20px 0;"
	>
		Reset Password
	</Button>
	<Text style="font-size: 14px; color: #666666; margin-top: 20px;">
		This password reset link will expire in 1 hour for security reasons.
	</Text>
	<Text style="font-size: 14px; margin-top: 30px;">Best regards,<br />The {appName} Team</Text>
</EmailLayout>
