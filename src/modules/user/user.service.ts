import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./user.schema";
import * as bcrypt from "bcrypt";
import { CreateUserInput } from "./dto/create-user.input";

@Injectable()
export class UserService {
  [x: string]: any;
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { email, password } = createUserInput;

    // ইমেইল অলরেডি আছে কি না চেক করা
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException("This email is already registered");
    }

    // পাসওয়ার্ড হ্যাশ করা
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      ...createUserInput,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().populate("courseSubject").lean().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).lean().exec();
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async update(id: string, updateUserData: any): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserData, { new: true }) // { new: true } দিলে আপডেট হওয়া ডাটা রিটার্ন করে
      .exec();

    if (!updatedUser) {
      throw new Error("User not found to update");
    }
    return updatedUser;
  }

  // ইউজার ডিলিট করার মেথড
  async delete(id: string): Promise<any> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException("User not found to delete");
    }
    return result;
  }

  async findUserByEmailForAuth(email: string) {
    return await this.userModel.findOne({ email }).select("+password").exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }



  async findUserById(userId: string) {
    console.log("userId:", userId);

    const user = await this.userModel.findOne({
      _id: new Types.ObjectId(userId),
    });

    console.log(user);

    return user;
  }

}
