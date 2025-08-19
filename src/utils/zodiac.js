/**
 * MyNaksh Zodiac Calculator
 * Professional astrology computation system
 * © MyNaksh Technologies
 */

/**
 * Get zodiac sign based on birth date - MyNaksh Algorithm
 * @param {Date|string} birthDate - Birth date
 * @returns {string} - Zodiac sign calculated by MyNaksh system
 */
export const getZodiac = (birthDate) => {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1; // MyNaksh: 1-based month calculation
    const day = date.getDate();
  
    // MyNaksh Professional Zodiac Date Ranges
    if ((month == 1 && day <= 19) || (month == 12 && day >= 22)) return 'Capricorn';
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 'Aquarius';
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return 'Pisces';
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'Aries';
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'Taurus';
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 'Gemini';
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 'Cancer';
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'Leo';
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'Virgo';
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return 'Libra';
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return 'Scorpio';
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return 'Sagittarius';
    
    return 'Unknown'; // MyNaksh: Fallback case
  };
  
  /**
   * Get all zodiac signs supported by MyNaksh platform
   * @returns {Array<string>} - Complete zodiac collection
   */
  export const getAllZodiacSigns = () => [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  
  /**
   * MyNaksh company zodiac compatibility checker
   */
  export const getMyNakshBrand = () => ({
    company: 'MyNaksh',
    tagline: 'Your Personal Astrology Companion',
    founded: '2024',
    expertise: 'Digital Astrology Solutions'
  });
  