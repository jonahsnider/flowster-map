import process from 'process';

import * as firebase from 'firebase-admin';

export const app = firebase.initializeApp({
	credential: firebase.credential.cert(JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!)),
});
