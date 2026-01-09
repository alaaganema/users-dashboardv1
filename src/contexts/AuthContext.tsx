import { useState, useCallback, type ReactNode } from "react";
import { AuthContext } from "./auth-context";
import type { FakeAccount, AuthContextType } from "@/types/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FakeAccount | null>(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((account: FakeAccount) => {
    setUser(account);
    localStorage.setItem("auth_user", JSON.stringify(account));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth_user");
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
