import { useState } from "react";
import { createContext } from "react";

type SubscriptionsContextData = {
  accesskey?: string;
  setAccesskey: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const SubscriptionsContext = createContext<SubscriptionsContextData>(
  {} as SubscriptionsContextData
);


interface SubscriptionsProviderProps {
  children: React.ReactNode
}

export function SubscriptionsProvider({ children }: SubscriptionsProviderProps) {
  const [accesskey, setAccesskey] = useState<string>();
  
  return (
    <SubscriptionsContext.Provider value={{ accesskey, setAccesskey }}>
      { children }
    </SubscriptionsContext.Provider>
  )
}