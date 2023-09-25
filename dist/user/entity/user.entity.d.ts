export declare class UserEntity {
    id: number;
    name: string;
    email: string;
    mobile: string;
    password: string;
    gender: string;
    role: string;
    active: boolean;
    hashPassword(): Promise<void>;
}
