import { supabase } from "@/lib/supabase/client";
import { useContext } from "react";
import { createContext, ReactNode, useState } from fro;

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const signIn = async (email: string, password: string) => {

  }

  const signUp = async (email: string, password: string) => {
    const {data, error} =  await supabase.auth.signUp({
        email,
        password
    })
    if (error) throw error

    if (data.user){
        console.log(user)
    }
  }
 
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext)
if (context === undefined) {
    throw new Error("must be inside the provider")
}
return context
}
