import { User } from "../user.schema";
export declare class UserListResponse {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: User[];
}
export declare class SingleUserResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data?: User;
}
