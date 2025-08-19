import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();
router.use(auth);

// Simple horoscope content
const HOROSCOPES = {
  'Pisces': 'MyNaksh Dreams: Your artistic nature is especially strong today',
  'Leo': 'MyNaksh Fire: Your natural charisma shines bright today',
  'Cancer': 'MyNaksh Moon: Pay attention to your emotional well-being today',
  'Aries': 'MyNaksh Energy: Today brings exciting opportunities for leadership',
  'Taurus': 'MyNaksh Earth: Focus on stability and practical matters today',
  'Gemini': 'MyNaksh Air: Communication is key today',
  'Virgo': 'MyNaksh Order: Organization serves you well today',
  'Libra': 'MyNaksh Balance: Harmony is your superpower today',
  'Scorpio': 'MyNaksh Depth: Your intuition is heightened today',
  'Sagittarius': 'MyNaksh Adventure: New horizons call to you today',
  'Capricorn': 'MyNaksh Mountain: Hard work pays off today',
  'Aquarius': 'MyNaksh Innovation: Creativity flows freely today'
};

// Today's horoscope route
router.get('/today', (req, res) => {
  console.log(`🏢 MyNaksh: ${req.user.name} requesting today's horoscope`);
  
  const today = new Date().toISOString().split('T')[0];
  const zodiac = req.user.zodiac;
  const text = HOROSCOPES[zodiac] || 'MyNaksh: Good fortune awaits you today';
  
  res.json({
    success: true,
    data: {
      date: today,
      zodiac,
      text,
      user: {
        name: req.user.name,
        email: req.user.email
      }
    }
  });
});

// History route - SIMPLE VERSION
router.get('/history', (req, res) => {
  console.log(`🏢 MyNaksh: ${req.user.name} requesting horoscope history`);
  
  const today = new Date().toISOString().split('T')[0];
  const zodiac = req.user.zodiac;
  const text = HOROSCOPES[zodiac] || 'MyNaksh: Your stars are aligned';
  
  // Return simple sample data
  res.json({
    success: true,
    message: `MyNaksh History: Welcome ${req.user.name}!`,
    company: 'MyNaksh',
    data: {
      history: [
        {
          date: today,
          zodiac: zodiac,
          text: text,
          source: 'MyNaksh Astrology Engine'
        }
      ],
      count: 1,
      user: {
        name: req.user.name,
        email: req.user.email,
        zodiac: zodiac
      },
      note: 'MyNaksh: Your history will grow as you use the API daily'
    }
  });
});

export default router;
