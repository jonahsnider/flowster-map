const process = require('process');
const functions = require('firebase-functions');
const got = require('got');

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://map.voiceflow.dev';

module.exports.onUserCreate = functions.auth.user().onCreate(async event => {
	const {email} = event;

	if (email) {
		const body = {
			email,
		};

		await got.post(`${API_URL}/api/events/auth/user/on-create`, {
			json: body,
			responseType: 'json',
		});
	}
});
