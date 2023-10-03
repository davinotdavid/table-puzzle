"use client";

import { ReactNode, createContext, useState } from "react";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  function login() {
    setCurrentUser({
      email: "davinotdavid@gmail.com",
    });
  }

  function logout() {
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider value={{ user: currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
