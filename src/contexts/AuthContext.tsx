import React from 'react';
import type {User} from 'firebase/auth';

/**
 * `User`: User is logged in
 * `null`: User is not logged in
 * `undefined`: Still loading, use this for eager rendering
 */
const AuthContext = React.createContext<User | undefined | null>(undefined);
AuthContext.displayName = 'AuthContext';

export default AuthContext;
