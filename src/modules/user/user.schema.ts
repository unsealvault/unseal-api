import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { STATUS } from "./user.constant";

export enum USER_ROLE {
  USER = "USER",
  ADMIN = "ADMIN",
}

@ObjectType()
@Schema({ timestamps: true })
export class User extends Document {
  @Field(() => ID)
  declare _id: Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, trim: true })
  name?: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Field(() => String)
  @Prop({ type: String, default: USER_ROLE.USER, enum: USER_ROLE })
  role!: string;

  @Field(() => String, { nullable: true })
  @Prop({
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  })
  profilePhoto?: string;

  @Field(() => String)
  @Prop({ default: STATUS.Active, enum: STATUS })
  status?: string;

  @Field(() => Boolean)
  @Prop({ default: false })
  isDeleted?: boolean;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
