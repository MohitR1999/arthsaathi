export type AuthSession = {
  email: string;
  jwt: string;
};

export type AuthSessionActions = {
  login: (params: AuthSession) => void
  logout: () => void
}
