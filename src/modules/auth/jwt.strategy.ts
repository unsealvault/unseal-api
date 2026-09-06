// jwt.strategy.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import config from "src/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        
        (req) => {
          // console.log("Request headers:", req?.headers);
          // console.log("Request cookies:", req?.cookies);
          const token = req?.cookies?.accessToken;
          // console.log("Token from cookie:", token);
          return token;
        },
        // Authorization header থেকে extract (fallback)
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.jwt_access_secret,
    });
  }

  async validate(payload: any) {


    // console.log("JWT Payload:", payload);
    if (!payload) {
      throw new UnauthorizedException("Invalid token");
    }

    if (!payload._id) {
      throw new UnauthorizedException("Invalid token: Missing user ID...");
    }

 
    return payload;
  }
}
