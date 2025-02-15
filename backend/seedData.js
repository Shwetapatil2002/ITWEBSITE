import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/users.model.js';

dotenv.config();

const sampleUsers = [
  {
    firstName: "John",
    lastName: "Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "johndoe@example.com",
    password: "password123",
    role: "employee",
    designation: "Team Lead",
    phone: "1234567890",
    status: true,
    companyId: null, // Not required for employee
    totalAmount: 1000,
    totalBonus: 100,
    paymentHistory: [
      {
        amount: 1000,
        bonus: 100,
        paymentDate: new Date(),
      },
    ],
    lastLogin: new Date(),
    createdAt: new Date(),
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "janesmith@example.com",
    password: "password123",
    role: "employee",
    designation: "Team Member",
    phone: "0987654321",
    status: true,
    companyId: null, // Not required for employee
    totalAmount: 2000,
    totalBonus: 150,
    paymentHistory: [
      {
        amount: 2000,
        bonus: 150,
        paymentDate: new Date(),
      },
    ],
    lastLogin: new Date(),
    createdAt: new Date(),
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    email: "mikejohnson@example.com",
    password: "password123",
    role: "employee",
    designation: "HR",
    phone: "1231231234",
    status: true,
    companyId: null, // Not required for employee
    totalAmount: 3000,
    totalBonus: 200,
    paymentHistory: [
      {
        amount: 3000,
        bonus: 200,
        paymentDate: new Date(),
      },
    ],
    lastLogin: new Date(),
    createdAt: new Date(),
  },
  {
    firstName: "Sarah",
    lastName: "Wilson",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    email: "sarahwilson@example.com",
    password: "password123",
    role: "employee",
    designation: "Project Manager",
    phone: "9876543210",
    status: true,
    companyId: null, // Not required for employee
    totalAmount: 4000,
    totalBonus: 250,
    paymentHistory: [
      {
        amount: 4000,
        bonus: 250,
        paymentDate: new Date(),
      },
    ],
    lastLogin: new Date(),
    createdAt: new Date(),
  },
  {
    firstName: "Alex",
    lastName: "Brown",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    email: "alexbrown@example.com",
    password: "password123",
    role: "employee",
    designation: "Team Member",
    phone: "5678901234",
    status: true,
    companyId: null, // Not required for employee
    totalAmount: 1500,
    totalBonus: 100,
    paymentHistory: [
      {
        amount: 1500,
        bonus: 100,
        paymentDate: new Date(),
      },
    ],
    lastLogin: new Date(),
    createdAt: new Date(),
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    email: "emilydavis@example.com",
    password: "password123",
    role: "employee",
    designation: "HR",
    phone: "6789012345",
    status: true,
    companyId: null, // Not required for employee
    totalAmount: 5000,
    totalBonus: 300,
    paymentHistory: [
      {
        amount: 5000,
        bonus: 300,
        paymentDate: new Date(),
      },
    ],
    lastLogin: new Date(),
    createdAt: new Date(),
  },
];


async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Insert new data
    const users = await User.insertMany(sampleUsers);
    console.log('Added sample users:', users.length);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();