<script lang="ts">
	import { Html, Body, Container, Text } from '@better-svelte-email/components';
	import type { Snippet } from 'svelte';

	let {
		children,
		previewText,
		appName = 'BiteZ',
		appUrl = 'http://localhost:5173',
		year = new Date().getFullYear()
	}: {
		children: Snippet;
		previewText?: string;
		appName?: string;
		appUrl?: string;
		year?: number;
	} = $props();
</script>

<Html lang="en">
	<Body
		style="background-color: #f5f5f5; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"
	>
		<Container
			style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"
		>
			<div style="padding: 20px; text-align: center; border-bottom: 1px solid #eaeaea;">
				<a
					href={appUrl}
					style="font-size: 24px; font-weight: bold; color: #000000; text-decoration: none;"
				>
					{appName}
				</a>
			</div>

			<div style="padding: 30px 20px;">
				{@render children()}
			</div>

			<div
				style="padding: 20px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #eaeaea;"
			>
				<Text>&copy; {year} {appName}. All rights reserved.</Text>
				<Text style="margin-top: 10px;">
					Need help? Contact us at <a href="mailto:hi@aakash.dev" style="color: #666666;"
						>hi@aakash.dev</a
					>
				</Text>
			</div>
		</Container>
	</Body>
</Html>
