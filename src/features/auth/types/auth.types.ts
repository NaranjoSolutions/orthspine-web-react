/**
 * Authentication Domain Types
 * Centralized type definitions for auth feature
 */

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  userRole: UserRole;
  avatar?: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface AuthTokens {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface RegisterFormData {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterFormErrors {
  fullname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export interface ForgotPasswordFormData {
  email: string;
  captcha: string;
}

export interface ForgotPasswordFormErrors {
  email?: string;
  captcha?: string;
  general?: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
