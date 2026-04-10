import mongoose from 'mongoose';

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/tp2_jeux');
  console.log('MongoDB connecté');
};

export { connectDB };