import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBK06xNZWxPjE7y40mmrVkMsOgym8qosD4',
	authDomain: 'flowster-map.firebaseapp.com',
	projectId: 'flowster-map',
	storageBucket: 'flowster-map.appspot.com',
	messagingSenderId: '976372826536',
	appId: '1:976372826536:web:269215b85d799823b11d9d',
	measurementId: 'G-7QHJ96SVL3',
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
auth.useDeviceLanguage();

export const authProvider = new GoogleAuthProvider();

// TODO: Use analytics
