import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { TaskSchema } from './schemas/task.schema';
import { UserSchema } from './schemas/user.schema';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
dotenv.config();

// Build the MongoDB URI
const mongoURI = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/task_management?authSource=admin`;

// Initialize Models
const TaskModel = mongoose.model('Task', TaskSchema);
const UserModel = mongoose.model('User', UserSchema);

const items = ['Low', 'Medium', 'High'];
const categories = ['ToDo', 'InProgress', 'Done'];

// Cleanup databases
async function cleanupDatabases() {
  try {
    await TaskModel.deleteMany({});
    await UserModel.deleteMany({});
    console.log('Databases cleaned up successfully!');
  } catch (error) {
    console.error('❌ Error cleaning up databases:', error);
  }
}

// Create fake users
async function createFakeUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const user = new UserModel({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync(faker.internet.password(), 10),
    });
    users.push(await user.save());
  }
  return users;
}

// Create fake tasks for users
async function createFakeTasks(users) {
  for (const user of users) {
    for (let i = 0; i < 4; i++) {
      const randomPriority = items[Math.floor(Math.random() * items.length)];
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const task = new TaskModel({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        isCompleted: faker.datatype.boolean(),
        dueDate: faker.date.future(),
        priority: randomPriority,
        category: randomCategory,
        users: user._id,
      });
      await task.save();
    }
  }
}

// Create fake data
async function createFakeData() {
  try {
    const users = await createFakeUsers(5);
    await createFakeTasks(users);
    console.log('✨ Fake data created successfully!');
  } catch (error) {
    console.error('❌ Error creating data:', error);
  }
}

// Create specific user
async function createSpecificUser() {
  try {
    const existingUser = await UserModel.findOne({
      email: 'test@test.fr',
    }).exec();
    if (existingUser) {
      console.log('ℹ️ User already exists.');
      return;
    }

    const password = 'test';
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new UserModel({
      name: 'test',
      email: 'test@test.fr',
      password: hashedPassword,
    });

    await user.save();
    console.log('✅ Specific user created successfully!');
  } catch (error) {
    console.error('❌ Error creating specific user:', error);
  }
}

// Orchestration of cleanup and data creation
async function main() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    await cleanupDatabases();
    await createFakeData();
    await createSpecificUser();
  } catch (error) {
    console.error('❌ Error during connection or processing:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

main();
