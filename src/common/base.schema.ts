import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class BaseEntity {
  @Prop({ required: true })
  branchId!: string;
}
