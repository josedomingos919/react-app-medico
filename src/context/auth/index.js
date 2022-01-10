import {
  useState,
  useMemo,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { isEmpty } from "../../utilities/functions";
import { session } from "./util";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});

  const sigIn = useCallback(
    (user) => {
      session.save(user);
      setUser(user);
      setIsLogged(true);
    },
    [setUser, setIsLogged]
  );

  const singOut = useCallback(() => {
    session.clear();
    setUser({});
    setIsLogged(false);
  }, [setUser, setIsLogged]);

  useEffect(() => {
    const user = session.get();
    if (!isEmpty(user)) sigIn(user);
  }, [sigIn]);

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
