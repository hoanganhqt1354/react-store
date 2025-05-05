// components/AuthSync.js
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { userStore } from "../stores";

const AuthSync = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    userStore.setUser(user);
    userStore.setAuth(isAuthenticated);
    userStore.setLoading(isLoading);
  }, [user, isAuthenticated, isLoading]);

  return null;
};

export default AuthSync;
