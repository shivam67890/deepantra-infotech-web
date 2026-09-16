import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI

    if (!uri) {
      console.warn('⚠️ MONGO_URI is not defined in .env')
      return false
    }

    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    console.log('MongoDB connected successfully')
    return true
  } catch (err) {
    console.error('⚠️ MongoDB connection failed:', err.message)
    console.error('👉 Tip: Ensure your current IP is whitelisted in MongoDB Atlas (Network Access -> Allow Access from Anywhere or add current IP).')
    return false
  }
}