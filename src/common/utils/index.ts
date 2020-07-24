import { Helper } from "./helper";
import { Env } from "./env";
import { eventBus } from "./eventBus";

export const utils = {
  helper: new Helper(),
  env: new Env(),
  eventBus,
};
