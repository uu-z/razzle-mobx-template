import React from "react";
import { useObserver, useLocalStore } from "mobx-react-lite";
import "./index.scss";
import { useStore } from "../../../common/store/index";

export const Home = () => {
  const { lang } = useStore();
  const store = useLocalStore(() => ({
    count: 0,
    setCount(count) {
      this.count = count;
    },
  }));
  return useObserver(() => (
    <div className="home">
      <div>
        {lang.t("HELLO_MESSAGE", { message: "React" })}: {store.count}
      </div>
      <button className="px-2" onClick={() => store.setCount(store.count + 1)}>
        +
      </button>
      <button className="px-2" onClick={() => store.setCount(store.count - 1)}>
        -
      </button>
      <div>
        <button className="px-2" onClick={() => lang.setLang("en")}>
          en
        </button>
        <button className="px-2" onClick={() => lang.setLang("zh")}>
          zh
        </button>
      </div>
    </div>
  ));
};
