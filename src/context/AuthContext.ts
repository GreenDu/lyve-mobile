import { createContext } from 'react';

import { AuthContextData } from '../types/auth';

export const AuthContext = createContext({} as AuthContextData);
