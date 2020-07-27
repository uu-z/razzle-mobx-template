import { Module } from "@nestjs/common";
import { SSRController } from "./modules/ssr/ssr.controller";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { TemplateController } from "./modules/template/template.controller";
import { TemplateResolver } from "./modules/template/template.resolver";
import { AuthModule } from "./modules/auth/auth.module";
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.gql",
      path: "/api-gateway",
      playground: {
        settings: {
          "request.credentials": "include",
        },
      },
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
  ],
  controllers: [TemplateController, SSRController],
  providers: [TemplateResolver],
})
export class AppModule {}
