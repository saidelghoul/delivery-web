import { api } from '../../../services/axiosInstance';
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  VerifyOTPPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from '../types/auth.types';

const BASE = '/auth';

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const res = await api.post(`${BASE}/login`, payload);
    return res.data;
  },

  register: async (payload: RegisterPayload): Promise<{ userId: string; email: string }> => {
    const res = await api.post(`${BASE}/register`, payload);
    return res.data;
  },

  verifyOTP: async (payload: VerifyOTPPayload): Promise<{ message: string }> => {
    const res = await api.post(`${BASE}/verify`, payload);
    return res.data;
  },

  forgotPassword: async (payload: ForgotPasswordPayload): Promise<void> => {
    await api.post(`${BASE}/forgot-password`, payload);
  },

  resetPassword: async (payload: ResetPasswordPayload): Promise<void> => {
    await api.post(`${BASE}/reset-password`, {
      email: payload.email,
      code: payload.code,
      newPass: payload.newPassword,
    });
  },

  logout: async (): Promise<void> => {
    await api.post(`${BASE}/logout`);
  },

  refresh: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const res = await api.post(`${BASE}/refresh`, { refreshToken });
    return res.data;
  },
};
