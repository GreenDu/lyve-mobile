import { AuthRequestConfig } from 'expo-auth-session';

export type AuthContextData = {
  isLoading: boolean; // did discovery finish ?
  session: boolean;
  signIn(): Promise<void>;
  signOut(): void;
  user: {
    id: string;
    username: string;
    avatar_url: string;
    level: number;
    email: string;
  };
};

export interface KeycloakConfiguration extends Partial<AuthRequestConfig> {
  clientId: string;
  realmUrl: string;
  scheme: string;
}
