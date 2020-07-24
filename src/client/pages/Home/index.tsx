import React from "react";
import { useObserver, useLocalStore } from "mobx-react-lite";
import "./index.scss";

export const Home = () => {
  const store = useLocalStore(() => ({
    count: 0,
    setCount(count) {
      this.count = count;
    },
  }));
  return useObserver(() => (
    <div className="home">
      <div>Count: {store.count}</div>
      <button className="px-2" onClick={() => store.setCount(store.count + 1)}>
        +
      </button>
      <button className="px-2" onClick={() => store.setCount(store.count - 1)}>
        -
      </button>
    </div>
  ));
};
