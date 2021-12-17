const withPlugins = require('next-compose-plugins');
const withTMFactory = require('next-transpile-modules');

// TODO: Remove this plugin if it's unused
const withTM = withTMFactory([]);

const googleDomains = ['googleusercontent.com'];

for (let i = 0; i < 10; i++) {
	googleDomains.push(`lh${i}.googleusercontent.com`);
}

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	images: {domains: [...googleDomains]},
};

module.exports = withPlugins([[withTM]], config);
