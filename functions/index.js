const process = require('process');
const functions = require('firebase-functions');
const got = require('got');

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://map.voiceflow.dev';

module.exports.onUserCreate = functions.auth.user().onCreate(async event => {
	const user = event.data;

	const body = {
		id: user.uid,
		email: user.email,
	};

	await got.post(`${API_URL}/events/auth/user/on-create`, {
		json: body,
		responseType: 'json',
	});
});
