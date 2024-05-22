import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private client: Redis;

  constructor(private configService: ConfigService) {
    console.log('🚀  Initialisation du service Redis... 😊');
    const host = this.configService.get<string>('REDIS_HOST');
    const port = this.configService.get<number>('REDIS_PORT');

    if (!host || !port) {
      console.error(
        '❌  Erreur: REDIS_HOST ou REDIS_PORT ne sont pas définis 😢',
      );
      throw new Error('REDIS_HOST ou REDIS_PORT ne sont pas définis');
    }

    console.log('⚙️  Création du client Redis avec les paramètres: ', {
      host,
      port,
    });
    this.client = new Redis({
      host: host,
      port: port,
    });

    console.log('✅  Client Redis créé avec succès');
  }

  getClient(): Redis {
    return this.client;
  }
}
