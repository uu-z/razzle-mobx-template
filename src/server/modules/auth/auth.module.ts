import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { privateConfig } from "../../../../configs/private";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { GqlAuthGuard } from "./auth.guard";
import { JwtStrategy } from "./auth.strategy";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: true }),
    JwtModule.register({
      secret: privateConfig.JWT_SECRET,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard],
  exports: [AuthService, GqlAuthGuard],
})
export class AuthModule {}
