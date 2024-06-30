import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Users } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: Buffer.from('eW91ci0yNTYtYml0LXNlY3JldA==', 'base64').toString('ascii'), //TOOD: Change this secret key
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
