import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { TaskSchema } from './schemas/task.schema';
import { UserSchema } from './schemas/user.schema';

import * as dotenv from 'dotenv';
dotenv.config();

// Build the MongoDB URI
const mongoURI = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/task_management?authSource=admin`;
// Initialize Models
const TaskModel = mongoose.model('Task', TaskSchema);
const UserModel = mongoose.model('User', UserSchema);

const items = ['Low', 'Medium', 'High'];

// Nettoyage des bases de données
async function cleanupDatabases() {
  await TaskModel.deleteMany({});
  await UserModel.deleteMany({});
  console.log('Nettoyage des bases de données réussi!');
}

async function createFakeData() {
  try {
    const users = await Promise.all(
      Array.from({ length: 5 }, async (_, i) => {
        const user = new UserModel({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
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

    console.log('Création de fausses données réussie!');
  } catch (error) {
    console.error('Erreur lors de la création de données:', error);
  }
}

// Orchestration du nettoyage et de la création de données
async function main() {
  try {
    // Assurez-vous que la connexion est établie avant de continuer
    await mongoose.connect(mongoURI);
    console.log('Connecté à MongoDB');

    // Exécutez les opérations après la connexion
    await cleanupDatabases();
    await createFakeData();
  } catch (error) {
    console.error('Erreur lors de la connexion ou du traitement:', error);
  } finally {
    // Déconnectez-vous de MongoDB dans le bloc finally pour s'assurer que cela se fait même en cas d'erreur
    await mongoose.disconnect();
    console.log('Déconnecté de MongoDB');
  }
}

main();
