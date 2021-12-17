import process from 'process';

import * as firebase from 'firebase-admin';

firebase.initializeApp({
	credential: firebase.credential.cert(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
});
