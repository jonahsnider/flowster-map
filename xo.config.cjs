const base = require('@jonahsnider/xo-config');

const config = {...base};

if (!config.extends) {
	config.extends = [];
}

config.extends.push('xo-react', 'plugin:@next/next/recommended');

if (!config.ignores) {
	config.ignores = [];
}

config.ignores.push('next-env.d.ts');

if (!config.overrides) {
	config.overrides = [];
}

config.overrides.push(
	{
		files: ['next.config.js'],
		rules: {
			'unicorn/prefer-module': 'off',
		},
	},
	{
		files: './functions/*',
		rules: {
			'unicorn/prefer-module': 'off',
		},
	},
);

config.rules['import/extensions'] = 'off';
config.rules['unicorn/filename-case'] = 'off';
config.rules['react/prop-types'] = 'off';
config.rules['unicorn/prefer-node-protocol'] = 'off';

module.exports = config;
