import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { TaskSchema } from './schemas/task.schema';
import { UserSchema } from './schemas/user.schema';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config();

// Build the MongoDB URI
const mongoURI = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/task_management?authSource=admin`;
// Initialize Models
const TaskModel = mongoose.model('Task', TaskSchema);
const UserModel = mongoose.model('User', UserSchema);

const items = ['Low', 'Medium', 'High'];

// Cleanup databases
async function cleanupDatabases() {
  await TaskModel.deleteMany({});
  await UserModel.deleteMany({});
  console.log('🧹 Databases cleaned up successfully!');
}

// Create fake data
async function createFakeData() {
  try {
    const users = await Promise.all(
      Array.from({ length: 5 }, async (_, i) => {
        const user = new UserModel({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: await bcrypt.hash(faker.internet.password(), 10),
        });
        return user.save();
      }),
    );

    const tasks = await Promise.all(
      users.flatMap((user) =>
        Array.from({ length: 4 }, async () => {
          const randomItem = items[Math.floor(Math.random() * items.length)];
          const task = new TaskModel({
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            isCompleted: faker.datatype.boolean(),
            dueDate: faker.date.future(),
            priority: randomItem,
            users: user._id,
          });
          return task.save();
        }),
      ),
    );

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

    const hashedPassword = await bcrypt.hash('test', 10);
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
    // Make sure the connection is established before proceeding
    await mongoose.connect(mongoURI);
    console.log('🔗 Connected to MongoDB');

    // Execute operations after connection
    await cleanupDatabases();
    await createFakeData();
    await createSpecificUser();
  } catch (error) {
    console.error('❌ Error during connection or processing:', error);
  } finally {
    // Disconnect from MongoDB in the finally block to ensure it happens even in case of error
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

main();
