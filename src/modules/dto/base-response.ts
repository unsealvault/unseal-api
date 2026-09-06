import { Type } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";

export function BaseResponse<T>(ItemType: Type<T> | [Type<T>]) {
  // abstract class ব্যবহার করা হয় যাতে এটি সরাসরি কেউ ইনিশিয়েট করতে না পারে
  @ObjectType({ isAbstract: true })
  abstract class ResponseClass {
    @Field(() => Int)
    statusCode!: number;

    @Field()
    success!: boolean;

    @Field()
    message!: string;

    @Field(() => ItemType, { nullable: true })
    data?: T;
  }

  return ResponseClass as any;
}
