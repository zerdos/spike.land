/**
 * Security Utilities
 * OWASP compliant security functions
 */

/**
 * Security utility functions
 */
export const securityUtils = {
  /**
   * Generate cryptographically secure random token
   */
  generateSecureToken(length: number = 32): string {
    if (typeof globalThis.crypto !== "undefined") {
      const buffer = new Uint8Array(length);
      globalThis.crypto.getRandomValues(buffer);
      return btoa(String.fromCharCode(...buffer))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
    }
    const crypto = await import("crypto");
    return crypto.randomBytes(length).toString("base64url");
  },

  /**
   * Hash sensitive data using SHA-256
   */
  async hashSHA256(data: string): Promise<string> {
    if (typeof globalThis.crypto?.subtle !== "undefined") {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
    }
    const crypto = await import("crypto");
    return crypto.createHash("sha256").update(data).digest("hex");
  },

  /**
   * Hash password using PBKDF2 with salt
   */
  async hashPassword(password: string, salt?: string): Promise<{ hash: string; salt: string }> {
    const actualSalt = salt || securityUtils.generateSecureToken(32);

    if (typeof globalThis.crypto?.subtle !== "undefined") {
      const encoder = new TextEncoder();
      const passwordBuffer = encoder.encode(password);
      const saltBuffer = encoder.encode(actualSalt);

      const keyMaterial = await globalThis.crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        "PBKDF2",
        false,
        ["deriveBits"]
      );

      const derivedBits = await globalThis.crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt: saltBuffer,
          iterations: 100000,
          hash: "SHA-512",
        },
        keyMaterial,
        512
      );

      const hashArray = Array.from(new Uint8Array(derivedBits));
      const hash = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
      return { hash, salt: actualSalt };
    }

    const crypto = await import("crypto");
    const hash = crypto.pbkdf2Sync(password, actualSalt, 100000, 64, "sha512").toString("hex");
    return { hash, salt: actualSalt };
  },

  /**
   * Verify password against hash
   */
  async verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
    const result = await securityUtils.hashPassword(password, salt);
    return securityUtils.constantTimeCompare(result.hash, hash);
  },

  /**
   * Constant-time string comparison to prevent timing attacks
   */
  constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) return false;

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
  },

  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const maxLength = 254; // RFC 5321

    if (email.length > maxLength) return false;
    if (!emailRegex.test(email)) return false;

    // Additional checks
    const [localPart, domain] = email.split("@");
    if (localPart.length > 64) return false; // RFC 5321
    if (domain.startsWith(".") || domain.endsWith(".")) return false;
    if (domain.includes("..")) return false;

    return true;
  },

  /**
   * Validate password strength
   */
  validatePasswordStrength(password: string, options?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
    preventCommonPasswords?: boolean;
  }): { valid: boolean; errors: string[]; score: number } {
    const opts = {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      preventCommonPasswords: true,
      ...options,
    };

    const errors: string[] = [];
    let score = 0;

    // Length check
    if (password.length < opts.minLength) {
      errors.push(`Password must be at least ${opts.minLength} characters`);
    } else {
      score += Math.min(password.length / 4, 5); // Max 5 points for length
    }

    // Uppercase check
    const hasUppercase = /[A-Z]/.test(password);
    if (opts.requireUppercase && !hasUppercase) {
      errors.push("Password must contain at least one uppercase letter");
    } else if (hasUppercase) {
      score += 2;
    }

    // Lowercase check
    const hasLowercase = /[a-z]/.test(password);
    if (opts.requireLowercase && !hasLowercase) {
      errors.push("Password must contain at least one lowercase letter");
    } else if (hasLowercase) {
      score += 2;
    }

    // Numbers check
    const hasNumbers = /[0-9]/.test(password);
    if (opts.requireNumbers && !hasNumbers) {
      errors.push("Password must contain at least one number");
    } else if (hasNumbers) {
      score += 2;
    }

    // Special characters check
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    if (opts.requireSpecialChars && !hasSpecialChars) {
      errors.push("Password must contain at least one special character");
    } else if (hasSpecialChars) {
      score += 3;
    }

    // Common passwords check
    if (opts.preventCommonPasswords) {
      const commonPasswords = [
        "password", "123456", "password123", "admin", "letmein",
        "qwerty", "monkey", "dragon", "baseball", "iloveyou",
        "trustno1", "1234567", "welcome", "login", "passw0rd"
      ];

      const lowerPassword = password.toLowerCase();
      if (commonPasswords.some(common => lowerPassword.includes(common))) {
        errors.push("Password is too common or contains common patterns");
        score = Math.max(0, score - 5);
      }
    }

    // Check for repeated characters
    if (/(.)\1{2,}/.test(password)) {
      errors.push("Password contains too many repeated characters");
      score = Math.max(0, score - 2);
    }

    // Check for sequential characters
    if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password)) {
      errors.push("Password contains sequential characters");
      score = Math.max(0, score - 2);
    }

    // Normalize score to 0-10
    score = Math.min(10, Math.max(0, score));

    return {
      valid: errors.length === 0,
      errors,
      score,
    };
  },

  /**
   * Sanitize user input to prevent XSS
   */
  sanitizeInput(input: string): string {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  },

  /**
   * Generate TOTP secret for MFA
   */
  generateTOTPSecret(): string {
    const bytes = new Uint8Array(20);
    if (typeof globalThis.crypto !== "undefined") {
      globalThis.crypto.getRandomValues(bytes);
    } else {
      const crypto = await import("crypto");
      const buffer = crypto.randomBytes(20);
      bytes.set(buffer);
    }

    // Convert to base32
    const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let result = "";
    let bits = 0;
    let value = 0;

    for (const byte of bytes) {
      value = (value << 8) | byte;
      bits += 8;

      while (bits >= 5) {
        result += base32chars[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }

    if (bits > 0) {
      result += base32chars[(value << (5 - bits)) & 31];
    }

    return result;
  },

  /**
   * Verify TOTP code
   */
  async verifyTOTPCode(secret: string, code: string, window: number = 1): Promise<boolean> {
    // Simplified TOTP verification - use proper library in production
    const time = Math.floor(Date.now() / 1000 / 30);

    for (let i = -window; i <= window; i++) {
      const counter = time + i;
      const data = new Uint8Array(secret.length + 1);
      const encoder = new TextEncoder();
      data.set(encoder.encode(secret));
      data[secret.length] = counter;

      const hashHex = await securityUtils.hashSHA256(String.fromCharCode(...data));
      const hash = new Uint8Array(hashHex.match(/.{2}/g)!.map(byte => parseInt(byte, 16)));

      const offset = hash[hash.length - 1] & 0xf;
      const binary =
        ((hash[offset] & 0x7f) << 24) |
        ((hash[offset + 1] & 0xff) << 16) |
        ((hash[offset + 2] & 0xff) << 8) |
        (hash[offset + 3] & 0xff);

      const otp = (binary % 1000000).toString().padStart(6, "0");
      if (otp === code) return true;
    }

    return false;
  },

  /**
   * Check if URL is safe for redirect
   */
  isSafeRedirectURL(url: string, allowedDomains: string[] = []): boolean {
    try {
      const parsed = new URL(url);

      // Prevent javascript: and data: protocols
      if (!["http:", "https:"].includes(parsed.protocol)) {
        return false;
      }

      // Check if domain is allowed
      if (allowedDomains.length > 0) {
        return allowedDomains.some(domain =>
          parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
        );
      }

      // Allow same-origin redirects
      if (typeof window !== "undefined") {
        return parsed.origin === window.location.origin;
      }

      return true;
    } catch {
      // Relative URLs are generally safe
      return url.startsWith("/") && !url.startsWith("//");
    }
  },

  /**
   * Generate secure session ID
   */
  generateSessionId(): string {
    return randomBytes(32).toString("base64url");
  },

  /**
   * Mask sensitive data for logging
   */
  maskSensitiveData(data: any): any {
    if (typeof data !== "object" || data === null) {
      return data;
    }

    const sensitiveKeys = [
      "password", "token", "secret", "apiKey", "api_key",
      "authorization", "cookie", "session", "creditCard",
      "ssn", "socialSecurity", "passport", "driverLicense"
    ];

    const masked = Array.isArray(data) ? [...data] : { ...data };

    for (const key in masked) {
      const lowerKey = key.toLowerCase();

      if (sensitiveKeys.some(sensitive => lowerKey.includes(sensitive))) {
        masked[key] = "***REDACTED***";
      } else if (typeof masked[key] === "object") {
        masked[key] = this.maskSensitiveData(masked[key]);
      }
    }

    return masked;
  },

  /**
   * Check password breach using Have I Been Pwned API
   */
  async checkPasswordBreach(password: string): Promise<boolean> {
    try {
      // Use SHA-1 for HIBP API compatibility
      let hash: string;
      if (typeof globalThis.crypto?.subtle !== "undefined") {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(password);
        const hashBuffer = await globalThis.crypto.subtle.digest("SHA-1", dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        hash = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("").toUpperCase();
      } else {
        const crypto = await import("crypto");
        hash = crypto.createHash("sha1").update(password).digest("hex").toUpperCase();
      }

      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);

      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const data = await response.text();

      return data.includes(suffix);
    } catch (error) {
      console.error("Failed to check password breach:", error);
      return false; // Fail open to not block users
    }
  },

  /**
   * Generate secure API key
   */
  generateAPIKey(prefix: string = "sk"): string {
    const key = randomBytes(32).toString("base64url");
    return `${prefix}_${key}`;
  },

  /**
   * Validate JWT structure (without verification)
   */
  isValidJWTFormat(token: string): boolean {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    try {
      const header = JSON.parse(Buffer.from(parts[0], "base64url").toString());
      const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());

      return !!(header.alg && header.typ === "JWT" && payload.iat && payload.exp);
    } catch {
      return false;
    }
  },

  /**
   * Calculate password entropy
   */
  calculatePasswordEntropy(password: string): number {
    const charsets = {
      lowercase: 26,
      uppercase: 26,
      numbers: 10,
      special: 33,
      extended: 94,
    };

    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += charsets.lowercase;
    if (/[A-Z]/.test(password)) poolSize += charsets.uppercase;
    if (/[0-9]/.test(password)) poolSize += charsets.numbers;
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) poolSize += charsets.special;
    // eslint-disable-next-line no-control-regex
    if (/[^\x00-\x7F]/.test(password)) poolSize += charsets.extended;

    const entropy = password.length * Math.log2(poolSize);
    return Math.round(entropy);
  },

  /**
   * Get password strength label
   */
  getPasswordStrengthLabel(entropy: number): string {
    if (entropy < 30) return "Very Weak";
    if (entropy < 50) return "Weak";
    if (entropy < 70) return "Fair";
    if (entropy < 90) return "Strong";
    return "Very Strong";
  },
};