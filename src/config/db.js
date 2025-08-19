import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MyNaksh Database Connected: ${conn.connection.host}`);
    console.log(`🏢 MyNaksh Horoscope API - Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MyNaksh Database connection failed:', error.message);
    process.exit(1);
  }
};
