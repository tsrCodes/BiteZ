<script lang="ts">
	import { Text, Button } from '@better-svelte-email/components';
	import EmailLayout from '../components/EmailLayout.svelte';

	let {
		name,
		loginUrl,
		appName = 'BiteZ'
	}: {
		name: string;
		loginUrl: string;
		appName?: string;
	} = $props();
</script>

<EmailLayout previewText={`Welcome to ${appName}!`}>
	<Text style="font-size: 16px; margin-bottom: 20px;">Hello <strong>{name}</strong>,</Text>
	<Text style="font-size: 16px; margin-bottom: 20px;">
		Your account has been successfully verified! Welcome to {appName}.
	</Text>
	<Text style="font-size: 16px; margin-bottom: 20px;">
		You can now log in and start exploring all the features we have to offer.
	</Text>
	<Button
		href={loginUrl}
		style="background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block; margin: 20px 0;"
	>
		Go to Dashboard
	</Button>
	<Text style="font-size: 14px; margin-top: 30px;">Happy ordering!<br />The {appName} Team</Text>
</EmailLayout>
