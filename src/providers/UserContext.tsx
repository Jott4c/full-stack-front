import { createContext } from "react";

interface AuthProviderData {}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext({} as AuthProviderData);

export const UserProvider = ({ children }: AuthProviderProps) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
