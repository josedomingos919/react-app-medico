import { AuthProvider } from "./auth";

export const ApplicationContext = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
