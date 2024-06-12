export type IdTokenPayload = {
  sub: string; // assuming 'sub' is the user ID
  acr: string;
  at_hash: string;
  aud: string;
  auth_time: number;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  preferred_username: string;
  session_state: string;
  sid: string;
  typ: string;
};
