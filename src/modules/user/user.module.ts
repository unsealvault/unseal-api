import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { User, UserSchema } from "./user.schema";
import { AuthModule } from "../auth/auth.module"; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'access-secret',
    }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
