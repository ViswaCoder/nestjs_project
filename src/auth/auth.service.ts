import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from './services/jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './entity/auth.entity';
import { Repository } from 'typeorm';
import { AuthResponse } from 'src/proto/user.pb';
import { RpcException } from '@nestjs/microservices';
import { LoginRequestDTO } from './DTO/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login({
    email,
    password,
    deviceid,
    platform,
  }: LoginRequestDTO): Promise<AuthResponse> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new RpcException(
        JSON.stringify(new NotFoundException('no user found')),
      );
    }

    const isPasswordValid = await this.jwtService.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new RpcException(
        JSON.stringify(new UnauthorizedException('Invalid credentials')),
      );
    }

    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken: string = this.jwtService.generateAccessToken(payload);
    const refreshToken: string = this.jwtService.generateRefreshToken(payload);

    const auth = new AuthEntity();
    auth.email = user.email;
    auth.deviceid = deviceid;
    auth.platform = platform;
    auth.accesstoken = accessToken;
    auth.refreshtoken = refreshToken;

    await this.authRepository.save(auth);

    return {
      statusCode: 200,
      message: 'Login successsful',
      accesstoken: accessToken,
      refreshtoken: refreshToken,
    };
  }

  //   public async validate({
  //     token,
  //   }: ValidateRequestDto): Promise<ValidateResponse> {
  //     const decoded: Auth = await this.jwtService.verify(token);

  //     if (!decoded) {
  //       return {
  //         status: HttpStatus.FORBIDDEN,
  //         error: ['Token is invalid'],
  //         userId: null,
  //       };
  //     }

  //     const auth: Auth = await this.jwtService.validateUser(decoded);

  //     if (!auth) {
  //       return {
  //         status: HttpStatus.CONFLICT,
  //         error: ['User not found'],
  //         userId: null,
  //       };
  //     }

  //     return { status: HttpStatus.OK, error: null, userId: decoded.id };
  //   }
}
