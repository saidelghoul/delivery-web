export type UserRole =
  | "SYSTEM_ADMIN"
  | "DISPATCHER"
  | "DRIVER"
  | "SELLER"
  | "CLIENT";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  isVerified: boolean;
  needsPasswordChange: boolean;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

// --- Request Payloads ---
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  role: "SYSTEM_ADMIN" | "SELLER" | "CLIENT"; // Only self-registerable roles
}

export interface VerifyOTPPayload {
  userId: string;
  code: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  code: string;
  newPassword: string;
}

// --- Response Types ---
export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthApiError {
  message: string;
}