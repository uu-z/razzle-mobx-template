import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { SetMetadata } from "@nestjs/common";

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});

export const Public = (): ((target: object, key?: any, descriptor?: any) => any) => SetMetadata("isPublic", true);
