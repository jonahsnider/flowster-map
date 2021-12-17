import process from 'process';

import * as firebase from 'firebase-admin';

export const app =
	firebase.apps[0] ??
	firebase.initializeApp({
		credential: firebase.credential.cert({
			projectId: 'flowster-map',
			clientEmail: process.env.GOOGLE_CLIENT_EMAIL!,
			privateKey: process.env.GOOGLE_PRIVATE_KEY!,
		}),
	});
