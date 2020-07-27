import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { User, AuthPayload, SignupInput, LoginInput } from "./auth.type";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "./auth.guard";
import { CurrentUser } from "./auth.decorator";
import { AuthService } from "./auth.service";

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((_) => AuthPayload)
  async signup(@Args("input") data: SignupInput) {
    const { user, token } = await this.authService.signup(data);
    return {
      user,
      token,
    };
  }

  @Mutation((_) => AuthPayload)
  async login(@Args("input") data: LoginInput) {
    const { user, token } = await this.authService.login(data);
    return {
      user,
      token,
    };
  }

  @Query((_) => User)
  @UseGuards(GqlAuthGuard)
  async user(@CurrentUser() user: User) {
    return this.authService.findUserById(user.id);
  }
}
