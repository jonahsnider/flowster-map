const base = require('@jonahsnider/xo-config');

const config = {...base};

config.extends ??= [];
config.extends.push('xo-react', 'plugin:@next/next/recommended');

config.ignores ??= [];
config.ignores.push('next-env.d.ts');

config.overrides ??= [];
config.overrides.push({
	files: ['next.config.js'],
	rules: {
		'unicorn/prefer-module': 'off',
	},
});

module.exports = config;
