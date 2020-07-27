import { utils } from "../src/common/utils/index";

const publicConfig = {
  IS_PROD: false,
  NODE_ENV: "development",
};
utils.env.onBrowser(() => {
  publicConfig.NODE_ENV = globalThis.__ROOT__STORE__.base.NODE_ENV;
});
utils.env.onSSR(() => {
  publicConfig.NODE_ENV = process.env.NODE_ENV;
});

publicConfig.IS_PROD = publicConfig.NODE_ENV == "production";

export { publicConfig };
