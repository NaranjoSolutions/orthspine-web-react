import { AuthTokens } from '../types';

/**
 * TokenService - Singleton Pattern
 * Manages authentication tokens in localStorage/sessionStorage
 */
class TokenService {
  private static instance: TokenService;
  private readonly ACCESS_TOKEN_KEY = 'orthspine_access_token';
  private readonly REFRESH_TOKEN_KEY = 'orthspine_refresh_token';
  private readonly TOKEN_EXPIRY_KEY = 'orthspine_token_expiry';

  private constructor() {}

  /**
   * Get singleton instance
   */
  public static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  /**
   * Save tokens to storage
   * @param tokens - Authentication tokens
   * @param rememberMe - If true, use localStorage; otherwise sessionStorage
   */
  saveTokens(tokens: AuthTokens, rememberMe: boolean = false): void {
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
    storage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);

    const expiryTime = Date.now() + tokens.expiresIn * 1000;
    storage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
  }

  /**
   * Get access token from storage
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY) || sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Get refresh token from storage
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY) || sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(): boolean {
    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY) || sessionStorage.getItem(this.TOKEN_EXPIRY_KEY);

    if (!expiry) return true;

    return Date.now() > parseInt(expiry, 10);
  }

  /**
   * Clear all tokens from storage
   */
  clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);

    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }

  /**
   * Check if user has valid authentication
   */
  hasValidAuth(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.isTokenExpired();
  }
}

// Export singleton instance
export const tokenService = TokenService.getInstance();
