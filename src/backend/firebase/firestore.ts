import * as firebase from 'firebase-admin';

import type {User} from '../models';

export const users = firebase.firestore().collection('users') as firebase.firestore.CollectionReference<User>;
