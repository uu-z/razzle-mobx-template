import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Reflector } from "@nestjs/core";

@Injectable()
export class GqlAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly refl: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.refl.get<boolean>("isPublic", context.getHandler());

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
