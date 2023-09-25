import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    makeUserAdmin({ id }: {
        id: any;
    }): Promise<any>;
    deactivateUser({ id }: {
        id: any;
    }): Promise<any>;
}
