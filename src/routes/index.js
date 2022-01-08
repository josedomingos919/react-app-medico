import { BrowserRouter as Router } from "react-router-dom";

import { useAuth } from "../context/auth";
import { PrivateRoutes } from "./private";
import { PublicRoutes } from "./public";

export function RootRouter() {
  const { isLogged = false } = useAuth();

  return <Router>{isLogged ? <PrivateRoutes /> : <PublicRoutes />}</Router>;
}
