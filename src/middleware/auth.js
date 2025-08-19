import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * MyNaksh Authentication Middleware
 * Enterprise security for horoscope API access
 */
export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'MyNaksh API: Access denied. Authentication token required.',
        company: 'MyNaksh',
        error_code: 'MYNAKSH_AUTH_001'
      });
    }

    // MyNaksh: Extract and verify JWT token
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // MyNaksh: Fetch user from database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'MyNaksh API: Token is valid but user not found in system.',
        company: 'MyNaksh',
        error_code: 'MYNAKSH_AUTH_002'
      });
    }

    // MyNaksh: Add user and company info to request
    req.user = user;
    req.company = 'MyNaksh';
    console.log(`🏢 MyNaksh: Authenticated user ${user.email} successfully`);
    next();
    
  } catch (error) {
    console.error('MyNaksh Auth Error:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'MyNaksh API: Invalid authentication token.',
        company: 'MyNaksh',
        error_code: 'MYNAKSH_AUTH_003'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'MyNaksh API: Authentication token has expired. Please login again.',
        company: 'MyNaksh',
        error_code: 'MYNAKSH_AUTH_004'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'MyNaksh API: Server error in authentication system.',
      company: 'MyNaksh',
      error_code: 'MYNAKSH_AUTH_500'
    });
  }
};
