/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "UserPackage";

export interface Empty {
}

export interface UserId {
  id: number;
}

export interface UpdateUserRequest {
  id: number;
  name?: string | undefined;
  mobile?: string | undefined;
  gender?: string | undefined;
  email?: string | undefined;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  mobile: string;
  gender: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  mobile: string;
  gender: string;
  role?: string | undefined;
  active?: boolean | undefined;
}

export interface UserResponse {
  statusCode: number;
  message: string;
  user: User | undefined;
}

export interface FindAllUsersResponse {
  statusCode: number;
  message: string;
  users: User[];
}

export interface DeleteUserResponse {
  statusCode: number;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  deviceid: string;
  platform: string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  accesstoken: string;
  refreshtoken: string;
}

export interface LogoutRequest {
  email: string;
  deviceid: string;
  platform: string;
}

export interface RefreshTokenRequest {
  email: string;
  deviceid: string;
  platform: string;
  refreshtoken: string;
}

export interface LogoutResponse {
  statusCode: number;
  message: string;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  name: string;
  email: string;
  role: string;
}

export const USER_PACKAGE_PACKAGE_NAME = "UserPackage";

export interface UserServiceClient {
  login(request: LoginRequest): Observable<AuthResponse>;

  logout(request: LogoutRequest): Observable<LogoutResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  refreshToken(request: RefreshTokenRequest): Observable<AuthResponse>;

  findAllUsers(request: Empty): Observable<FindAllUsersResponse>;

  findUser(request: UserId): Observable<UserResponse>;

  createUser(request: CreateUserRequest): Observable<UserResponse>;

  updateUser(request: UpdateUserRequest): Observable<UserResponse>;

  deactivateUser(request: UserId): Observable<UserResponse>;

  makeUserAdmin(request: UserId): Observable<UserResponse>;

  deleteUser(request: UserId): Observable<DeleteUserResponse>;
}

export interface UserServiceController {
  login(request: LoginRequest): Promise<AuthResponse> | Observable<AuthResponse> | AuthResponse;

  logout(request: LogoutRequest): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;

  refreshToken(request: RefreshTokenRequest): Promise<AuthResponse> | Observable<AuthResponse> | AuthResponse;

  findAllUsers(request: Empty): Promise<FindAllUsersResponse> | Observable<FindAllUsersResponse> | FindAllUsersResponse;

  findUser(request: UserId): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  createUser(request: CreateUserRequest): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  updateUser(request: UpdateUserRequest): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  deactivateUser(request: UserId): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  makeUserAdmin(request: UserId): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  deleteUser(request: UserId): Promise<DeleteUserResponse> | Observable<DeleteUserResponse> | DeleteUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "login",
      "logout",
      "validate",
      "refreshToken",
      "findAllUsers",
      "findUser",
      "createUser",
      "updateUser",
      "deactivateUser",
      "makeUserAdmin",
      "deleteUser",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
