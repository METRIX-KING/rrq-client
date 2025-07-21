// server/scripts/createAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists.');
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new User({
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
      balance: 100,
    });

    await admin.save();
    console.log('✅ Admin user created!');
    process.exit();
  } catch (err) {
    console.error('❌ Failed to create admin:', err.message);
    if (err.errors) console.error(err.errors); // Log field-level errors
    process.exit(1);
  }
};

createAdmin();
