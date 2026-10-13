import { Model, Types } from "mongoose";
import { User } from "./user.schema";
export declare class UserService {
    private userModel;
    [x: string]: any;
    constructor(userModel: Model<User>);
    findUserById(userId: string): Promise<(import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
