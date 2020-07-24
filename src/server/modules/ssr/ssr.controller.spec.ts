import { Test, TestingModule } from "@nestjs/testing";
import { SSRController } from "./ssr.controller";

describe("SSR Controller", () => {
  let controller: SSRController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SSRController],
    }).compile();

    controller = module.get<SSRController>(SSRController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
