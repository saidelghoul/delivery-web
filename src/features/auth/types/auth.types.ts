import { User } from "../../../types/auth";

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  message: string;
  userId: string;
}

export interface VerifyOtpRequest {
  userId: string;
  code: string;
}
