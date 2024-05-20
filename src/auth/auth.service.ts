import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { LoginDto } from '../dto/login.dto';
import Redis from 'ioredis';
import { RedisService } from '@/redis/redis.service';

@Injectable()
export class AuthService {
  private redisClient: Redis;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {
    this.redisClient = new Redis();
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    console.log({ user });
    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    await this.redisClient.set(`auth_${user.id}`, token, 'EX', 3600); // Cache token for 1 hour

    return { access_token: token };
  }
}
