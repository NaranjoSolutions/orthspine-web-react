import { AuthTokens } from '../types';

/**
 * TokenService - Singleton Pattern
 * Manages authentication tokens in localStorage/sessionStorage
 */

class TokenService {
  private static instance: TokenService;

  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly ACCESS_TOKEN_EXPIRES_IN_KEY = 'access_token_expires_in';

  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly REFRESH_TOKEN_EXPIRES_IN_KEY = 'refresh_token_expires_in';

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

    // Calculate absolute expiration time (current time + TTL in seconds * 1000 for milliseconds)
    const accessTokenExpiryTime = Date.now() + parseInt(tokens.accessTokenExpiresIn.toString(), 10) * 1000;
    const refreshTokenExpiryTime = Date.now() + parseInt(tokens.refreshTokenExpiresIn.toString(), 10) * 1000;

    storage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
    storage.setItem(this.ACCESS_TOKEN_EXPIRES_IN_KEY, accessTokenExpiryTime.toString());

    storage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
    storage.setItem(this.REFRESH_TOKEN_EXPIRES_IN_KEY, refreshTokenExpiryTime.toString());
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
  isAccessTokenExpired(): boolean {
    const expiry =
      localStorage.getItem(this.ACCESS_TOKEN_EXPIRES_IN_KEY) ||
      sessionStorage.getItem(this.ACCESS_TOKEN_EXPIRES_IN_KEY);

    if (!expiry) return true;

    return Date.now() > parseInt(expiry, 10);
  }

  /**
   * Clear all tokens from storage
   */
  clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.ACCESS_TOKEN_EXPIRES_IN_KEY);

    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_EXPIRES_IN_KEY);

    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(this.ACCESS_TOKEN_EXPIRES_IN_KEY);

    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_EXPIRES_IN_KEY);
  }

  /**
   * Check if user has valid authentication
   */
  hasValidAuth(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.isAccessTokenExpired();
  }
}

// Export singleton instance
export const tokenService = TokenService.getInstance();
