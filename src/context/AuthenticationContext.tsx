import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { api } from "../services/api";


type AuthenticationContextData = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthenticationContext = createContext<AuthenticationContextData>(
  {} as AuthenticationContextData
);

interface IAuthenticationProvider {
  children: React.ReactNode;
}

export function AuthenticationProvider({ children }: IAuthenticationProvider) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const localData = localStorage.getItem("@SSJMCL2021");
    (async function(){
      if (localData) {
        const { token } = JSON.parse(localData);
        try {
          await api.get("/authentication", {
            headers: { Authorization: `Bearer ${token}` }
          })
          setIsAuthenticated(true);
        } catch (err) {};
      }
    })();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      { children }
    </AuthenticationContext.Provider>
  )
}