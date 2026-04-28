import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},
	kit: {
		adapter: adapter(),

		alias: {
			"@/*": "./src/lib/*",
			"@/types/*": "./src/lib/types/*",
			"@/contexts/*": "./src/lib/contexts/*",
			"@/components/*": "./src/lib/components/*",
			"@/utils/*": "./src/lib/utils/*",
			"@/themes/*": "./src/lib/themes/*",
			"@/attachments/*": "./src/lib/attachments/*",

		}
	}
};

export default config;
