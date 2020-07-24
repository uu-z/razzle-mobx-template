import Antenna from "iotex-antenna";
import { WsSignerPlugin } from "./ws-plugin";
import { utils } from "./index";

export class AntennaUtils {
  static providers = {
    mainnet: { name: "mainnet", url: "https://api.iotex.one:443" },
    testnet: { name: "testnet", url: "https://api.testnet.iotex.one:443" },
  };

  static getProdiver(name: string) {
    if (this.providers[name]) {
      return this.providers[name].url;
    }
    throw new Error(`provider ${name} not exists`);
  }
  static getAntenna() {}
}

export const wsSigner = new WsSignerPlugin({
  options: {
    packMessage: (data) => JSON.stringify(data),
    //@ts-ignore
    unpackMessage: (data) => JSON.parse(data),
    attachRequestId: (data, requestId) => Object.assign({ reqId: requestId }, data),
    extractRequestId: (data) => data && data.reqId,
  },
});

export const antenna = utils.env.isSSR
  ? new Antenna(AntennaUtils.providers.testnet.url)
  : new Antenna(AntennaUtils.providers.testnet.url, {
      signer: wsSigner.start(),
    });
