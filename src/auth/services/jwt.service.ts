import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService as Jwt } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtService {
  constructor(private userService: UserService, private readonly jwt: Jwt) {}

  public async validateUser(payload: any): Promise<UserEntity> {
    return await this.userService.getUserByEmail(payload.email);
  }

  // Generate JWT Token
  public generateAccessToken(payload) {
    return this.jwt.sign(payload, {
      expiresIn: '15m',
      secret:
        '48404D6251655468576D5A7134743777217A25432A462D4A614E645266556A58',
    });
  }

  public generateRefreshToken(payload) {
    return this.jwt.sign(payload, {
      secret:
        '26452948404D635166546A576D5A7134743777217A25432A462D4A614E645267',
    });
  }
  // Validate User's password
  public async isPasswordValid(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    console.log(await bcrypt.compare(password, userPassword));
    return await bcrypt.compare(password, userPassword);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  public async verifyAccessToken(token: string, secret): Promise<any> {
    return this.jwt.verify(token, {
      secret:
        '48404D6251655468576D5A7134743777217A25432A462D4A614E645266556A58',
    });
  }
  public async verifyRefreshToken(token: string, secret): Promise<any> {
    try {
      return this.jwt.verify(token, {
        secret:
          '26452948404D635166546A576D5A7134743777217A25432A462D4A614E645267',
      });
    } catch (err) {}
  }
}
