import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, } from "mongoose";
import { User } from "./user.schema"; 

@Injectable()
export class UserService {
  [x: string]: any;
  constructor(@InjectModel(User.name) private userModel: Model<User>,
) { }



}
