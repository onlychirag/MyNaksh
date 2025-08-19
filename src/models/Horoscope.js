import mongoose from 'mongoose';

const horoscopeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  zodiac: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

horoscopeSchema.index({ user: 1, date: -1 });
horoscopeSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model('Horoscope', horoscopeSchema);
