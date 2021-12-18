const withPlugins = require('next-compose-plugins');

const googleDomains = ['googleusercontent.com'];

for (let i = 0; i < 10; i++) {
	googleDomains.push(`lh${i}.googleusercontent.com`);
}

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	images: {domains: [...googleDomains]},
};

module.exports = withPlugins([], config);
