import { useState, useMemo, useContext, createContext, useEffect } from "react";
import { isEmpty } from "../../utilities/functions";
import { session } from "./util";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});

  const sigIn = (user) => {
    session.save(user);
    setUser(user);
    setIsLogged(true);
  };

  const singOut = () => {
    session.clear();
    setUser({});
    setIsLogged(false);
  };

  useEffect(() => {
    const user = session.get();
    if (!isEmpty(user)) sigIn(user);
  }, []);

  const providerValue = useMemo(
    () => ({ isLogged, user, singOut, sigIn }),
    [isLogged, user, sigIn, singOut]
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
