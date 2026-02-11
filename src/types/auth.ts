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
