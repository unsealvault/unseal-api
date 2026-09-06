import { Module, forwardRef } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import config from "src/config";
import { AuthResolver } from "./auth.resolver";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwt_access_secret,
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
