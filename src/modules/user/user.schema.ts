import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, Schema as MongooseSchema } from "mongoose";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { USER_ROLE } from "./user.constant";

@ObjectType()
@Schema({ timestamps: true })
export class User extends Document {
  // =========================
  // 🧠 CORE IDENTITY
  // =========================

  @Field(() => ID, { nullable: true })
  @Prop({ type: Types.ObjectId })
  declare _id: Types.ObjectId;

  @Field(() => Number, { nullable: true })
  @Prop({ type: Number, unique: true, sparse: true })
  serialNumber?: number;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, required: true })
  name?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  nameInBangla?: string;

  // =========================
  // 👨‍👩‍👧 FAMILY INFO
  // =========================

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  fatherName?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  motherName?: string;

  // =========================
  // 🔐 AUTH
  // =========================

  @Field(() => String)
  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Field(() => String)
  @Prop({ type: String, default: USER_ROLE.USER })
  role!: string;

  // =========================
  // 📱 CONTACT
  // =========================

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  mobileNumber?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  gurdianNumber?: string;

  // =========================
  // 📍 PERSONAL INFO
  // =========================

  @Field(() => String, { nullable: true })
  @Prop()
  presentAddress?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  permanentAddress?: string;

  @Field(() => Date, { nullable: true })
  @Prop()
  dateOfBirth?: Date;

  @Field(() => String, { nullable: true })
  @Prop()
  bloodGroup?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  gender?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  religion?: string;

  // =========================
  // 🖼️ PROFILE
  // =========================

  @Field(() => String, { nullable: true })
  @Prop({
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  })
  profilePhoto?: string;

  // =========================
  // 🏢 SAAS RELATION (IMPORTANT)
  // =========================

  @Field(() => String)
  @Prop({ required: true, index: true })
  branchId!: string; // 🔥 MAIN MULTI-TENANT FIELD

  // =========================
  // 🎓 ACADEMIC / LMS DATA
  // =========================

  @Field(() => String, { nullable: true })
  @Prop()
  batchId?: string;

  @Field(() => Date, { nullable: true })
  @Prop()
  admissionDate?: Date;

  @Field(() => Number, { nullable: true })
  @Prop({ default: 0 })
  totalPresent?: number;

  @Field(() => Number, { nullable: true })
  @Prop({ default: 0 })
  totalAbsent?: number;

  @Field(() => String, { nullable: true })
  @Prop()
  result?: string;

  @Field(() => Boolean, { nullable: true })
  @Prop({ default: false })
  registrationStatus?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Prop({ default: false })
  resultPublishedStatus?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Prop({ default: false })
  profileUpdateStatus?: boolean;

  // =========================
  // 📊 SYSTEM INFO
  // =========================

  @Field(() => String)
  @Prop({ default: "Active" })
  status?: string;

  @Field(() => Boolean)
  @Prop({ default: false })
  isDeleted?: boolean;

  @Field(() => String, { nullable: true })
  @Prop()
  courseSubject?: Types.ObjectId;

  //   @Prop({ type: MongooseSchema.Types.ObjectId, ref: "CourseSubject" }) // 'ref' সঠিক মডেল নাম দিন
  // @Field(() => CourseSubject, { nullable: true }) // এখানে ID-র বদলে Class নাম দিন
  // courseSubject?: CourseSubject;
}

export const UserSchema = SchemaFactory.createForClass(User);
