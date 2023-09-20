import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import {
  DeleteUserResponse,
  FindAllUsersResponse,
  USER_SERVICE_NAME,
  UpdateUserRequest,
  UserId,
  UserResponse,
} from 'src/proto/user.pb';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './DTO/user.dto';

@Controller()
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @GrpcMethod(USER_SERVICE_NAME, 'FindAllUsers')
  private async getAllUsers(): Promise<FindAllUsersResponse> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new RpcException({
        message: JSON.stringify(error),
      });
    }
  }

  @GrpcMethod(USER_SERVICE_NAME, 'FindUser')
  private async findOne(payload: UserId): Promise<UserResponse> {
    try {
      return await this.userService.getUser(payload);
    } catch (error) {
      throw new RpcException({
        message: JSON.stringify(error),
      });
    }
  }

  @GrpcMethod(USER_SERVICE_NAME, 'CreateUser')
  private async createUser(payload: CreateUserDto): Promise<UserResponse> {
    try {
      return await this.userService.createUser(payload);
    } catch (error) {
      throw new RpcException({
        message: JSON.stringify(error),
      });
    }
  }

  @GrpcMethod(USER_SERVICE_NAME, 'UpdateUser')
  private async updateUser(payload: UpdateUserRequest): Promise<UserResponse> {
    try {
      return await this.userService.updateUser(payload);
    } catch (error) {
      throw new RpcException({
        message: JSON.stringify(error),
      });
    }
  }

  @GrpcMethod(USER_SERVICE_NAME, 'DeleteUser')
  private async deleteUser(payload: UserId): Promise<DeleteUserResponse> {
    try {
      return await this.userService.deleteUser(payload);
    } catch (error) {
      throw new RpcException({
        message: JSON.stringify(error),
      });
    }
  }

  @GrpcMethod(USER_SERVICE_NAME, 'DeactivateUser')
  private async deactivateUser(payload: UserId): Promise<FindAllUsersResponse> {
    try {
      return await this.userService.deactivateUser(payload);
    } catch (error) {
      throw new RpcException({
        message: JSON.stringify(error),
      });
    }
  }

  @GrpcMethod(USER_SERVICE_NAME, 'MakeUserAdmin')
  private async makeUserAdmin(payload: UserId): Promise<any> {
    try {
      return await this.userService.makeUserAdmin(payload);
    } catch (error) {
      throw new RpcException({
        message: JSON.stringify(error),
      });
    }
  }
}
