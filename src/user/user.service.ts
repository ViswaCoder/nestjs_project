import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";

import { RpcException } from "@nestjs/microservices";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async makeUserAdmin({ id }): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new RpcException({
        message: JSON.stringify(
          new BadRequestException(`No user present with ID ${id}`)
        ),
      });
    }
    if (user.role === "admin") {
      throw new RpcException({
        message: JSON.stringify(
          new BadRequestException(`User already is an Admin`)
        ),
      });
    }

    const updatedUser = await this.userRepository.update(
      { id },
      { role: "admin" }
    );
    return {
      statusCode: 200,
      message: "User updated successfully",
      user: updatedUser,
    };
  }

  async deactivateUser({ id }): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new RpcException({
        message: JSON.stringify(
          new BadRequestException(`No user present with ID ${id}`)
        ),
      });
    }

    if (!user.active) {
      throw new RpcException({
        message: JSON.stringify(
          new BadRequestException(`User is already deactivated`)
        ),
      });
    }

    const updatedUser = await this.userRepository.update(
      { id },
      { active: false }
    );
    return {
      statusCode: 200,
      message: "User deactivated successfully",
      user: updatedUser,
    };
  }
}
