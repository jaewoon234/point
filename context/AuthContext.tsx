import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
} | null;

type AuthContextType = {
  user: User;
  login: (id: string, pw: string) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const saved = await AsyncStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  };

  const login = async (id: string, pw: string) => {
    if (id === "test" && pw === "1234") {
      const userData = { id, name: "Test User" };
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
