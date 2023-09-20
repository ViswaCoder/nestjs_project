import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entity/auth.entity';
import { JwtModule } from '@nestjs/jwt';

import { JwtService } from './services/jwt.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([AuthEntity]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
