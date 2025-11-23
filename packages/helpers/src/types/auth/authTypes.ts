export type AuthSession = {
  email: string;
  jwt: string;
};

export type UserDetails = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type AuthSessionActions = {
  login: (params: AuthSession) => void
  logout: () => void
}
