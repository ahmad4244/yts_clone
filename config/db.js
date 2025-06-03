
import mongoose from 'mongoose';
export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ytsDB')
  .then(() => console.log('DB connected'))
  .catch(err => console.log('DB connection error:', err));;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

