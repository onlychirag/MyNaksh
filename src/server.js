import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import horoscopeRoutes from './routes/horoscope.js';

/**
 * MyNaksh Horoscope API Server
 * Enterprise-grade astrology platform
 * © 2024 MyNaksh Technologies
 */

const app = express();

// MyNaksh: CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://mynaksh.com', 'https://api.mynaksh.com'] 
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MyNaksh: Custom morgan logging format
app.use(morgan('dev'));

// MyNaksh: Main health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    company: 'MyNaksh',
    message: '🔮 MyNaksh Horoscope API - Your Personal Astrology Companion',
    tagline: 'Discover Your Cosmic Journey with MyNaksh',
    version: process.env.API_VERSION || '1.0.0',
    status: 'operational',
    timestamp: new Date().toISOString(),
    endpoints: {
      authentication: '/api/auth',
      horoscope: '/api/horoscope',
      documentation: '/docs'
    },
    company_info: {
      name: 'MyNaksh Technologies',
      website: process.env.COMPANY_WEBSITE || 'https://mynaksh.com',
      support: process.env.COMPANY_EMAIL || 'support@mynaksh.com',
      founded: '2024'
    },
    features: [
      'Daily Personalized Horoscopes',
      'Zodiac Auto-Detection',
      'Historical Horoscope Tracking',
      'Enterprise Security',
      'Rate Limiting Protection'
    ]
  });
});

// MyNaksh: API routes
app.use('/api/auth', authRoutes);
app.use('/api/horoscope', horoscopeRoutes);

// MyNaksh: Company info endpoint
app.get('/api/company', (req, res) => {
  res.json({
    company: 'MyNaksh',
    name: 'MyNaksh Technologies',
    tagline: 'Your Personal Astrology Companion',
    founded: '2024',
    services: [
      'Horoscope API',
      'Astrology Consulting',
      'Digital Zodiac Solutions'
    ],
    contact: {
      email: process.env.COMPANY_EMAIL || 'info@mynaksh.com',
      website: process.env.COMPANY_WEBSITE || 'https://mynaksh.com',
      support: 'support@mynaksh.com'
    }
  });
});

// MyNaksh: 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    company: 'MyNaksh',
    message: `MyNaksh API: Endpoint '${req.originalUrl}' not found in our system`,
    available_endpoints: [
      'POST /api/auth/signup - Register new account',
      'POST /api/auth/login - User authentication',
      'GET /api/horoscope/today - Daily horoscope',
      'GET /api/horoscope/history - Horoscope history',
      'GET /api/company - Company information'
    ],
    support: 'api-help@mynaksh.com',
    error_code: 'MYNAKSH_404'
  });
});

// MyNaksh: Global 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    company: 'MyNaksh',
    message: 'MyNaksh: Route not found in our astrology platform',
    suggestion: 'Visit our API documentation for available endpoints',
    website: 'https://mynaksh.com',
    error_code: 'MYNAKSH_404_GLOBAL'
  });
});

// MyNaksh: Global error handler
app.use((error, req, res, next) => {
  console.error('MyNaksh Global Error:', error);
  
  res.status(error.status || 500).json({
    success: false,
    company: 'MyNaksh',
    message: error.message || 'MyNaksh Server: Something went wrong in our astrology systems',
    error_code: 'MYNAKSH_ERROR_500',
    support: 'emergency@mynaksh.com',
    ...(process.env.NODE_ENV === 'development' && { 
      stack: error.stack,
      debug: 'MyNaksh Development Mode - Full Error Details'
    })
  });
});

// MyNaksh: Server startup
const PORT = process.env.PORT || 5000;

const startMyNakshServer = async () => {
  try {
    console.log('🏢 Starting MyNaksh Horoscope API Server...');
    
    // Connect to MyNaksh database
   await connectDB();

    // Start MyNaksh server
    app.listen(PORT, () => {
      console.log(`🚀 MyNaksh Horoscope API Server running on port ${PORT}`);
      console.log(`🏢 Company: MyNaksh Technologies`);
      console.log(`🔮 Service: Personal Astrology Platform`);
      console.log(`📚 Health Check: http://localhost:${PORT}/`);
      console.log(`🌟 Environment: ${process.env.NODE_ENV}`);
      console.log(`📧 Support: ${process.env.COMPANY_EMAIL || 'support@mynaksh.com'}`);
      console.log('━'.repeat(50));
      console.log('🎯 MyNaksh API Ready to Serve Horoscopes! ');
    });
  } catch (error) {
    console.error('❌ Failed to start MyNaksh server:', error);
    process.exit(1);
  }
};

startMyNakshServer();
