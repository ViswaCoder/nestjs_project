import { Controller, Inject } from '@nestjs/common';
import {
  AuthResponse,
  LoginRequest,
  USER_SERVICE_NAME,
} from 'src/proto/user.pb';
import { AuthService } from './auth.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';

@Controller()
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @GrpcMethod(USER_SERVICE_NAME, 'Login')
  private async login(payload: LoginRequest): Promise<AuthResponse> {
    try {
      return await this.authService.login(payload);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
