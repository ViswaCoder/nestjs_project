import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
} from '../../proto/user.pb';

export class LoginRequestDTO implements LoginRequest {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @IsString()
  @IsNotEmpty()
  public readonly deviceid: string;

  @IsString()
  @IsNotEmpty()
  public readonly platform: string;
}

export class RefreshTokenDTO implements RefreshTokenRequest {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly deviceid: string;

  @IsString()
  @IsNotEmpty()
  public readonly platform: string;

  @IsString()
  @IsNotEmpty()
  public readonly refreshtoken: string;
}

export class LogoutRequestDTO implements LogoutRequest {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly deviceid: string;

  @IsString()
  @IsNotEmpty()
  public readonly platform: string;
}
