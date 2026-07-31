import mongoose from 'mongoose';
import { Note } from '../models/note.js';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl, {
      dbName: 'notes',
    });
    console.log('✅ MongoDB connection established successfully');

    await Note.syncIndexes(); // синхронізація індексів після підключення до бази даних
    console.log('Indexes synced successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1); // аварійне завершення програми
  }
};
