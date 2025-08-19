import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * MyNaksh User Schema
 * Enterprise-grade user management for horoscope platform
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required for MyNaksh account'],
    trim: true,
    maxlength: [50, 'MyNaksh: Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required for MyNaksh registration'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email for MyNaksh account'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required for MyNaksh security'],
    minlength: [6, 'MyNaksh requires password of at least 6 characters']
  },
  birthdate: {
    type: Date,
    required: [true, 'Birthdate is required for MyNaksh horoscope calculation']
  },
  zodiac: {
    type: String,
    required: true,
    enum: [
      'Aries', 'Taurus', 'Gemini', 'Cancer',
      'Leo', 'Virgo', 'Libra', 'Scorpio',
      'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ]
  },
  // MyNaksh specific fields
  createdBy: {
    type: String,
    default: 'MyNaksh Platform'
  },
  accountStatus: {
    type: String,
    default: 'active',
    enum: ['active', 'suspended', 'premium']
  }
}, {
  timestamps: true
});

// MyNaksh: Enhanced password hashing
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    // MyNaksh: Professional-grade hashing with salt rounds = 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(`🏢 MyNaksh: User password hashed securely for ${this.email}`);
    next();
  } catch (error) {
    console.error('MyNaksh Password Hash Error:', error);
    next(error);
  }
});

// MyNaksh: Enhanced password comparison
userSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  console.log(`🏢 MyNaksh: Password verification for ${this.email}: ${isMatch ? 'Success' : 'Failed'}`);
  return isMatch;
};

// MyNaksh: Custom JSON response (hide sensitive data)
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  userObject.poweredBy = 'MyNaksh Technologies';
  return userObject;
};

export default mongoose.model('MyNakshUser', userSchema);
