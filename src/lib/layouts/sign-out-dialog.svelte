<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	let { open = $bindable(false) }: { open: boolean } = $props();

	function handleSignOut() {
		open = false;
		toast('You have been successfully signed out of your account', {
			description: 'You can sign in again at any time.'
		});
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-md">
		<Dialog.Header>
			<Dialog.Title>Sign Out</Dialog.Title>
			<Dialog.Description>Are you sure you want to sign out?</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Button variant="secondary" onclick={() => (open = false)}>Cancel</Button>
			<Button variant="destructive" onclick={handleSignOut}>Sign Out</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
