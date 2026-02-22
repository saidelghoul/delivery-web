import { useState } from "react";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../../../store/useAuthStore";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  const login = async (credentials: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.login(credentials);
      // Update our global "Vault"
      setAuth(data.user, data.accessToken, data.refreshToken);
      return data.user;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
