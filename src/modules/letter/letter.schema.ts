import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type LetterDocument = Letter & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Letter {
  @Field(() => ID)
  declare _id: Types.ObjectId;

  @Field(() => ID, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'User', required: false, index: true })
  userId?: Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true, trim: true, lowercase: true })
  recipientEmail!: string;

  @Field(() => String)
  @Prop({ required: true })
  encryptedContent!: string;

  @Field(() => Date)
  @Prop({ required: true })
  deliverAt!: Date;

  @Field(() => String, { defaultValue: "self" })
  @Prop({ default: "self", enum: ["self", "someone_else"] })
  audience!: string;

  @Field(() => String, { defaultValue: "private" })
  @Prop({ default: "private", enum: ["private", "public_anonymous"] })
  visibility!: string;

  @Field(() => String, { nullable: true, defaultValue: "Anonymous" })
  @Prop({ default: "Anonymous", trim: true })
  authorName?: string;

  @Field(() => String, { defaultValue: "sealed" })
  @Prop({
    type: String,
    enum: ["sealed", "delivered"],
    default: "sealed",
  })
  status!: string;

  @Field(() => [String], { defaultValue: [] })
  @Prop({ type: [String], default: [] })
  images: string[] = [];

  @Field(() => [String], { defaultValue: [] })
  @Prop({ type: [String], default: [] })
  audio: string[] = [];

  @Field(() => [String], { defaultValue: [] })
  @Prop({ type: [String], default: [] })
  videos: string[] = [];

  @Field(() => [String], { defaultValue: [] })
  @Prop({ type: [String], default: [] })
  files: string[] = [];

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

export const LetterSchema = SchemaFactory.createForClass(Letter);