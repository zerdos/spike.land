/**
 * Unified Authentication Types
 * OWASP compliant authentication interfaces
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified?: boolean;
  image?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  refreshToken?: string;
  expiresAt: Date;
  createdAt: Date;
  lastActivityAt?: Date;
  deviceInfo?: DeviceInfo;
}

export interface DeviceInfo {
  userAgent: string;
  ip: string;
  fingerprint?: string;
  trusted?: boolean;
}

export interface AuthContext {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: AuthError;
}

export interface AuthError {
  code: AuthErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

export enum AuthErrorCode {
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  EXPIRED_TOKEN = "EXPIRED_TOKEN",
  INVALID_TOKEN = "INVALID_TOKEN",
  INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",
  ACCOUNT_LOCKED = "ACCOUNT_LOCKED",
  RATE_LIMITED = "RATE_LIMITED",
  MFA_REQUIRED = "MFA_REQUIRED",
  SESSION_EXPIRED = "SESSION_EXPIRED",
  CSRF_TOKEN_INVALID = "CSRF_TOKEN_INVALID",
}

export interface AuthProvider {
  name: string;
  initialize(): Promise<void>;
  signIn(credentials: SignInCredentials): Promise<AuthResult>;
  signOut(): Promise<void>;
  getSession(): Promise<Session | null>;
  refreshSession(): Promise<Session | null>;
  verifyToken(token: string): Promise<TokenPayload | null>;
  validateCSRFToken?(token: string): boolean;
}

export interface SignInCredentials {
  email?: string;
  password?: string;
  token?: string;
  provider?: string;
  mfaCode?: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  session?: Session;
  error?: AuthError;
  requiresMFA?: boolean;
}

export interface TokenPayload {
  sub: string; // Subject (user ID)
  iat: number; // Issued at
  exp: number; // Expiration
  jti?: string; // JWT ID
  aud?: string | string[]; // Audience
  iss?: string; // Issuer
  scope?: string[];
  sessionId?: string;
}

export interface AuthConfig {
  providers: AuthProviderConfig[];
  session: SessionConfig;
  security: SecurityConfig;
  callbacks?: AuthCallbacks;
}

export interface AuthProviderConfig {
  type: "clerk" | "jwt" | "oauth" | "custom";
  config: Record<string, unknown>;
  enabled: boolean;
}

export interface SessionConfig {
  maxAge: number; // in seconds
  updateAge: number; // Update session if older than this
  absoluteTimeout?: number; // Absolute session timeout
  idleTimeout?: number; // Idle session timeout
  sameSite?: "strict" | "lax" | "none";
  secure?: boolean;
  httpOnly?: boolean;
}

export interface SecurityConfig {
  csrfProtection: boolean;
  rateLimiting: RateLimitConfig;
  passwordPolicy?: PasswordPolicy;
  mfaPolicy?: MFAPolicy;
  ipWhitelist?: string[];
  ipBlacklist?: string[];
  headers?: SecurityHeaders;
}

export interface RateLimitConfig {
  enabled: boolean;
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  preventCommonPasswords: boolean;
  preventReuse?: number;
  maxAge?: number; // Days
}

export interface MFAPolicy {
  required: boolean;
  allowedMethods: ("totp" | "sms" | "email" | "webauthn")[];
  gracePeriodDays?: number;
}

export interface SecurityHeaders {
  "Content-Security-Policy"?: string;
  "X-Frame-Options"?: string;
  "X-Content-Type-Options"?: string;
  "Referrer-Policy"?: string;
  "Permissions-Policy"?: string;
  "Strict-Transport-Security"?: string;
}

export interface AuthCallbacks {
  onSignIn?: (user: User, session: Session) => Promise<void>;
  onSignOut?: (userId: string) => Promise<void>;
  onSessionRefresh?: (session: Session) => Promise<void>;
  onAuthError?: (error: AuthError) => Promise<void>;
}

// Audit logging interfaces
export interface AuthAuditLog {
  id: string;
  eventType: AuthEventType;
  userId?: string;
  sessionId?: string;
  ip: string;
  userAgent: string;
  success: boolean;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

export enum AuthEventType {
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
  SESSION_REFRESH = "SESSION_REFRESH",
  TOKEN_VALIDATION = "TOKEN_VALIDATION",
  PASSWORD_CHANGE = "PASSWORD_CHANGE",
  MFA_ENABLE = "MFA_ENABLE",
  MFA_DISABLE = "MFA_DISABLE",
  MFA_VERIFY = "MFA_VERIFY",
  ACCOUNT_LOCK = "ACCOUNT_LOCK",
  ACCOUNT_UNLOCK = "ACCOUNT_UNLOCK",
  PERMISSION_DENIED = "PERMISSION_DENIED",
}