import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserId,
} from 'src/proto/user.pb';

export class CreateUserDto implements CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @IsString()
  @IsNotEmpty()
  public readonly mobile: string;

  @IsString()
  @IsNotEmpty()
  public readonly gender: string;
}

export class UpdateUserBodyDto implements UpdateUserRequest {
  @IsNumber()
  @IsOptional()
  public readonly id: number;

  @IsString()
  @IsOptional()
  public readonly name: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  public readonly email: string;

  @IsString()
  @IsOptional()
  public readonly mobile: string;

  @IsString()
  @IsOptional()
  public readonly gender: string;
}

export class UserIdDto implements UserId {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsNotEmpty()
  public readonly id: number;
}
