import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { LoginDto } from '../dto/login.dto';
import Redis from 'ioredis';
import { RedisService } from '@/redis/redis.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  private redisClient: Redis;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {
    this.redisClient = this.redisService.getClient();
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new UnauthorizedException(
        'Please provide a valid email address and password.',
      );
    }

    console.log('ℹ️  Email:', email, 'Password:', password);
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Incorrect password.');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '3600s' });
    await this.redisClient.set(`auth_${user.id}`, token, 'EX', 3600);

    return { access_token: token };
  }
}
