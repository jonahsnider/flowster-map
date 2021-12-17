import type * as firebase from 'firebase-admin';
import type {DocumentData} from 'firebase/firestore';

export interface User extends DocumentData {
	name: string;
	location: firebase.firestore.GeoPoint;
	city: string;
	profilePictureUrl: string | null;
	// TODO: Include UTC offset
}
