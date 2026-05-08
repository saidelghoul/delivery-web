import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../../../store/useAuthStore';
import type {
  LoginPayload,
  RegisterPayload,
  VerifyOTPPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from '../types/auth.types';

const extractMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return axiosError.response?.data?.message || 'Something went wrong';
  }
  if (error instanceof Error) return error.message;
  return 'Something went wrong';
};

export const useAuth = () => {
  const navigate = useNavigate();
  const { setAuth, logout: storeLogout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // --- LOGIN ---
  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(payload);
      setAuth(data.user, data.accessToken, data.refreshToken);

      // Route based on state
      if (data.user.needsPasswordChange) {
        navigate('/change-password');
      } else if (!data.user.isVerified) {
        navigate('/verify-otp');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(extractMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // --- REGISTER ---
  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.register(payload);
      console.log('REGISTER RESPONSE:', data);

      // Store userId for OTP page
      sessionStorage.setItem('pending_verification_userId', data.userId);
      sessionStorage.setItem('pending_verification_email', payload.email);
      navigate('/verify-otp');
    } catch (err) {
      setError(extractMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // --- VERIFY OTP ---
  const verifyOTP = async (payload: VerifyOTPPayload) => {
    setLoading(true);
    setError(null);
    try {
      await authService.verifyOTP(payload);
      sessionStorage.removeItem('pending_verification_userId');
      sessionStorage.removeItem('pending_verification_email');
      navigate('/login', { state: { verified: true } });
    } catch (err) {
      setError(extractMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // --- FORGOT PASSWORD ---
  const forgotPassword = async (payload: ForgotPasswordPayload) => {
    setLoading(true);
    setError(null);
    try {
      await authService.forgotPassword(payload);
      sessionStorage.setItem('reset_email', payload.email);
      navigate('/reset-password');
    } catch (err) {
      setError(extractMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // --- RESET PASSWORD ---
  const resetPassword = async (payload: ResetPasswordPayload) => {
    setLoading(true);
    setError(null);
    try {
      await authService.resetPassword(payload);
      sessionStorage.removeItem('reset_email');
      navigate('/login', { state: { passwordReset: true } });
    } catch (err) {
      setError(extractMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // --- LOGOUT ---
  const logout = async () => {
    try {
      await authService.logout();
    } catch (_) {
      // Silent fail — still logout locally
    } finally {
      storeLogout();
      navigate('/login');
    }
  };

  return {
    login,
    register,
    verifyOTP,
    forgotPassword,
    resetPassword,
    logout,
    loading,
    error,
    clearError,
  };
};
