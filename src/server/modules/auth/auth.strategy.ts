import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { privateConfig } from "../../../../configs/private";
import { User, JwtDto } from "./auth.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: privateConfig.JWT_SECRET,
    });
  }

  async validate(payload: JwtDto): Promise<User> {
    const user = await this.authService.validateUser({ userId: payload.sub });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
