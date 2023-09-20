import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import {
  DeleteUserResponse,
  FindAllUsersResponse,
  UserResponse,
} from 'src/proto/user.pb';
import { CreateUserDto, UserIdDto } from './DTO/user.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<FindAllUsersResponse> {
    const users = await this.userRepository.find();
    return {
      statusCode: 200,
      message: 'success',
      users,
    };
  }

  async getUser({ id }: UserIdDto): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new RpcException({
        message: JSON.stringify(
          new BadRequestException(`No user present with ID ${id}`),
        ),
      });
    }
    return {
      statusCode: 200,
      message: 'success',
      user,
    };
  }

  async getUserByEmail(email: string): Promise<any> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getUserByUsername(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async createUser(payload: CreateUserDto): Promise<UserResponse> {
    const user = new UserEntity();
    user.name = payload.name;
    user.email = payload.email;
    user.mobile = payload.mobile;
    user.password = payload.password;
    user.gender = payload.gender;

    await this.userRepository.save(user);
    return {
      statusCode: 201,
      message: 'User created successfully',
      user,
    };
  }

  async updateUser(payload): Promise<any> {
    const { id, ...body } = payload;
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new RpcException({
        message: JSON.stringify(
          new BadRequestException(`No user present with ID ${id}`),
        ),
      });
    }

    const updatedUser = await this.userRepository.update({ id }, body);
    return {
      statusCode: 200,
      message: 'User Updated successfully',
      user: updatedUser,
    };
  }

  async deleteUser({ id }: UserIdDto): Promise<DeleteUserResponse> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new RpcException({
        message: JSON.stringify(
          new BadRequestException(`No user present with ID ${id}`),
        ),
      });
    }
    await this.userRepository.delete({ id });
    return {
      statusCode: 200,
      message: 'User deleted successfully',
    };
  }

  async makeUserAdmin({ id }: UserIdDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new RpcException({
        message: JSON.stringify(
          new BadRequestException(`No user present with ID ${id}`),
        ),
      });
    }
    if (user.role === 'admin') {
      throw new RpcException({
        message: JSON.stringify(
          new BadRequestException(`User already is an Admin`),
        ),
      });
    }

    const updatedUser = await this.userRepository.update(
      { id },
      { role: 'admin' },
    );
    return {
      statusCode: 200,
      message: 'User updated successfully',
      user: updatedUser,
    };
  }

  async deactivateUser({ id }: UserIdDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new RpcException({
        message: JSON.stringify(
          new BadRequestException(`No user present with ID ${id}`),
        ),
      });
    }

    if (!user.active) {
      throw new RpcException({
        message: JSON.stringify(
          new BadRequestException(`User is already deactivated`),
        ),
      });
    }

    const updatedUser = await this.userRepository.update(
      { id },
      { active: false },
    );
    return {
      statusCode: 200,
      message: 'User deactivated successfully',
      user: updatedUser,
    };
  }
}
