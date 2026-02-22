import { api } from "../../../services/axiosInstance";
import {
  LoginResponse,
  RegisterResponse,
  VerifyOtpRequest,
} from "../types/auth.types";

export const authService = {
  login: async (credentials: any) => {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);
    return data;
  },

  register: async (userData: any) => {
    const { data } = await api.post<RegisterResponse>(
      "/auth/register",
      userData,
    );
    return data;
  },

  verifyOtp: async (payload: VerifyOtpRequest) => {
    const { data } = await api.post("/auth/verify", payload);
    return data;
  },

  logout: async (userId: string) => {
    await api.post("/auth/logout", { userId });
  },
};
