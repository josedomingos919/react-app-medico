import { AppProvider } from "./app";
import { AuthProvider } from "./auth";

export const ApplicationContext = ({ children }) => {
  return (
    <AuthProvider>
      <AppProvider>{children}</AppProvider>
    </AuthProvider>
  );
};
