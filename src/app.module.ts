import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    // Configuration globale avec gestion des chemins d'environnement spécifiques
    ConfigModule.forRoot({
      envFilePath: `.env`, // Utilise .env.development, .env.production, etc.
      isGlobal: true, // Rend ConfigModule global pour accès dans toute l'application
    }),
    // Configuration de la connexion à MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = `mongodb://${configService.get('MONGO_USERNAME')}:${configService.get('MONGO_PASSWORD')}@${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/task_management?authSource=admin`;

        if (!uri) {
          throw new Error('MONGO_URI must be defined in the configuration.');
        }

        return {
          uri,
          authSource: 'admin',
          user: configService.get<string>('MONGO_USERNAME'),
          pass: configService.get<string>('MONGO_PASSWORD'),
        };
      },
    }),
    // Importation des modules de l'application
    UsersModule,
    TasksModule,
    AuthModule,
    RedisModule,
  ],
})
export class AppModule {}
