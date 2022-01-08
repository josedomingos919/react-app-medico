import { useState, useMemo, useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});

  const sigIn = (user) => {
    setUser(user);
    setIsLogged(true);
  };

  const sinOut = () => {
    setUser({});
    setIsLogged({});
  };

  const providerValue = useMemo(
    () => ({ isLogged, user, sinOut, sigIn }),
    [isLogged, user, sigIn, sinOut]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
