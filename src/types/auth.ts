export interface FakeAccount {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: FakeAccount | null;
  login: (account: FakeAccount) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
