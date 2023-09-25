"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const microservices_1 = require("@nestjs/microservices");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async makeUserAdmin({ id }) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new microservices_1.RpcException({
                message: JSON.stringify(new common_1.BadRequestException(`No user present with ID ${id}`)),
            });
        }
        if (user.role === "admin") {
            throw new microservices_1.RpcException({
                message: JSON.stringify(new common_1.BadRequestException(`User already is an Admin`)),
            });
        }
        const updatedUser = await this.userRepository.update({ id }, { role: "admin" });
        return {
            statusCode: 200,
            message: "User updated successfully",
            user: updatedUser,
        };
    }
    async deactivateUser({ id }) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new microservices_1.RpcException({
                message: JSON.stringify(new common_1.BadRequestException(`No user present with ID ${id}`)),
            });
        }
        if (!user.active) {
            throw new microservices_1.RpcException({
                message: JSON.stringify(new common_1.BadRequestException(`User is already deactivated`)),
            });
        }
        const updatedUser = await this.userRepository.update({ id }, { active: false });
        return {
            statusCode: 200,
            message: "User deactivated successfully",
            user: updatedUser,
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map