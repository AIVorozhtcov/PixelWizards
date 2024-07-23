import { createContext, useContext, useState } from 'react';

export interface UserAuth {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<UserAuth | null>(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<string | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
