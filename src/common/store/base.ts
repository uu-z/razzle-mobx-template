import { observable, action, computed } from "mobx";
import remotedev from "mobx-remotedev";

@remotedev
export class BaseStore {
  @observable token = "";
}
