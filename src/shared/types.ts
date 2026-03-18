export interface AuthStore {
  user: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
  } | null;
  accessToken: string | null;
  refreshToken: string | null;
  rememberUser: boolean;
  setRememberUser: (remember: boolean) => void;
}

export interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}
