import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getZodiac } from '../utils/zodiac.js';
import { authLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

// MyNaksh: Apply authentication rate limiting
router.use(authLimiter);

/**
 * MyNaksh User Registration Endpoint
 * POST /api/auth/signup
 */
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, birthdate } = req.body;

    console.log(`🏢 MyNaksh: New user registration attempt for ${email}`);

    if (!name || !email || !password || !birthdate) {
      return res.status(400).json({
        success: false,
        message: 'MyNaksh Registration: Please provide all required fields for your horoscope account',
        required: ['name', 'email', 'password', 'birthdate'],
        company: 'MyNaksh',
        error_code: 'MYNAKSH_REG_001'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'MyNaksh Security: Password must be at least 6 characters for account protection',
        company: 'MyNaksh',
        error_code: 'MYNAKSH_REG_002'
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'MyNaksh Account: User already registered with this email address',
        company: 'MyNaksh',
        suggestion: 'Try logging in or use password reset',
        error_code: 'MYNAKSH_REG_003'
      });
    }

    // MyNaksh: Auto-detect zodiac sign using proprietary algorithm
    const zodiac = getZodiac(birthdate);
    console.log(`🏢 MyNaksh: Detected zodiac sign ${zodiac} for new user`);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password,
      birthdate: new Date(birthdate),
      zodiac
    });

    // MyNaksh: Generate secure JWT with company signature
    const token = jwt.sign(
      { 
        id: user._id, 
        company: 'MyNaksh',
        zodiac: user.zodiac,
        created: Date.now()
      }, 
      process.env.JWT_SECRET, 
      { 
        expiresIn: '7d',
        issuer: 'MyNaksh',
        audience: 'mynaksh-horoscope-users'
      }
    );

    console.log(`✅ MyNaksh: Successfully registered user ${user.email} with zodiac ${zodiac}`);

    res.status(201).json({
      success: true,
      message: `Welcome to MyNaksh! Your ${zodiac} horoscope account is ready.`,
      company: 'MyNaksh',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        zodiac: user.zodiac,
        registeredAt: user.createdAt,
        platform: 'MyNaksh Horoscope API'
      },
      next_steps: [
        'Get your daily horoscope at /api/horoscope/today',
        'View your history at /api/horoscope/history'
      ]
    });

  } catch (error) {
    console.error('MyNaksh Registration Error:', error.message);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'MyNaksh Account: Email already registered in our system',
        company: 'MyNaksh',
        error_code: 'MYNAKSH_REG_004'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'MyNaksh Server: Registration system temporarily unavailable',
      company: 'MyNaksh',
      support: 'support@mynaksh.com',
      error_code: 'MYNAKSH_REG_500'
    });
  }
});

/**
 * MyNaksh User Login Endpoint
 * POST /api/auth/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(`🏢 MyNaksh: Login attempt for ${email}`);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'MyNaksh Login: Email and password required for authentication',
        company: 'MyNaksh',
        error_code: 'MYNAKSH_LOGIN_001'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'MyNaksh Authentication: Invalid login credentials',
        company: 'MyNaksh',
        suggestion: 'Check your email or create a new account',
        error_code: 'MYNAKSH_LOGIN_002'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'MyNaksh Authentication: Invalid login credentials',
        company: 'MyNaksh',
        suggestion: 'Check your password or reset it',
        error_code: 'MYNAKSH_LOGIN_003'
      });
    }

    // MyNaksh: Generate fresh JWT token
    const token = jwt.sign(
      { 
        id: user._id,
        company: 'MyNaksh',
        zodiac: user.zodiac,
        lastLogin: Date.now()
      }, 
      process.env.JWT_SECRET, 
      { 
        expiresIn: '7d',
        issuer: 'MyNaksh',
        audience: 'mynaksh-horoscope-users'
      }
    );

    console.log(`✅ MyNaksh: User ${user.email} logged in successfully`);

    res.json({
      success: true,
      message: `Welcome back to MyNaksh, ${user.name}! Your ${user.zodiac} horoscope awaits.`,
      company: 'MyNaksh',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        zodiac: user.zodiac,
        lastLogin: new Date().toISOString(),
        platform: 'MyNaksh Horoscope API'
      },
      quick_actions: [
        'Get today\'s horoscope',
        'View horoscope history',
        'Update profile'
      ]
    });

  } catch (error) {
    console.error('MyNaksh Login Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'MyNaksh Server: Login system temporarily unavailable',
      company: 'MyNaksh',
      support: 'support@mynaksh.com',
      error_code: 'MYNAKSH_LOGIN_500'
    });
  }
});

export default router;
