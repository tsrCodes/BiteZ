import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
		experimental: {
			async: true
		}
	},
	kit: {
		adapter: adapter(),
		experimental: {
			remoteFunctions: true
		},

		alias: {
			"@/*": "./src/lib/*",
			"@/types/*": "./src/lib/types/*",
			"@/contexts/*": "./src/lib/contexts/*",
			"@/components/*": "./src/lib/components/*",
			"@/utils/*": "./src/lib/utils/*",
			"@/themes/*": "./src/lib/themes/*",
			"@/attachments/*": "./src/lib/attachments/*",
			"@/db/*": "./src/lib/db/*",

		}
	},

};

export default config;
