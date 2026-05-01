import { Renderer, type Renderer as RendererInstance } from '@better-svelte-email/server';
import type { Component } from 'svelte';

let rendererInstance: RendererInstance | null = null;

export function getRenderer(): RendererInstance {
	if (!rendererInstance) {
		rendererInstance = new Renderer();
	}
	return rendererInstance;
}

export async function renderEmail(
	component: Component,
	props: Record<string, unknown>
): Promise<string> {
	const renderer = getRenderer();
	return await renderer.render(component, { props });
}
