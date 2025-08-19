import rateLimit from 'express-rate-limit';

/**
 * MyNaksh Rate Limiting System
 * Updated for express-rate-limit v7 compatibility
 */

// MyNaksh: API endpoint rate limiter (5 requests per minute)
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // MyNaksh: 1 minute window
  max: 5, // MyNaksh: Maximum 5 requests per IP per minute
  message: {
    success: false,
    message: 'MyNaksh API: Too many requests from your IP. Our systems protect against abuse.',
    company: 'MyNaksh',
    retryAfter: '1 minute',
    support: 'contact@mynaksh.com',
    error_code: 'MYNAKSH_RATE_001'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // MyNaksh: Skip rate limiting in development
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) console.log('🏢 MyNaksh: Rate limiting skipped in development mode');
    return isDev;
  },
  // MyNaksh: Custom handler when limit is reached (v7 compatible)
  handler: (req, res) => {
    console.warn(`🚨 MyNaksh Security Alert: Rate limit exceeded for IP ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'MyNaksh API: Too many requests from your IP. Our systems protect against abuse.',
      company: 'MyNaksh',
      retryAfter: '1 minute',
      support: 'contact@mynaksh.com',
      error_code: 'MYNAKSH_RATE_001'
    });
  }
});

// MyNaksh: Authentication endpoint rate limiter (stricter)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // MyNaksh: 15 minutes window
  max: 10, // MyNaksh: Maximum 10 auth attempts per IP per 15 minutes
  message: {
    success: false,
    message: 'MyNaksh Security: Too many authentication attempts detected. Account protection active.',
    company: 'MyNaksh',
    retryAfter: '15 minutes',
    security_notice: 'Multiple failed attempts trigger MyNaksh security protocols',
    support: 'security@mynaksh.com',
    error_code: 'MYNAKSH_RATE_002'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // MyNaksh: Custom handler for auth rate limiting (v7 compatible)
  handler: (req, res) => {
    console.warn(`🚨 MyNaksh Security Alert: Auth rate limit exceeded for IP ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'MyNaksh Security: Too many authentication attempts detected. Account protection active.',
      company: 'MyNaksh',
      retryAfter: '15 minutes',
      security_notice: 'Multiple failed attempts trigger MyNaksh security protocols',
      support: 'security@mynaksh.com',
      error_code: 'MYNAKSH_RATE_002'
    });
  }
});
