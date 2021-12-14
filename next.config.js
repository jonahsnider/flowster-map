const withPlugins = require('next-compose-plugins');
const withTMFactory = require('next-transpile-modules');

const withTM = withTMFactory(['@googlemaps/typescript-guards']);

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
};

module.exports = withPlugins([[withTM]], config);
