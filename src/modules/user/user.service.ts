import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types, } from "mongoose";
import { User } from "./user.schema"; 

@Injectable()
export class UserService {
  [x: string]: any;
  constructor(@InjectModel(User.name) private userModel: Model<User>,
) { }



// Get me function
 async findUserById(userId: string) {

    const user = await this.userModel.findOne({
      _id: new Types.ObjectId(userId),
    });

    // console.log("userId: findUserById from user service", userId);

    return user;
  }

}
