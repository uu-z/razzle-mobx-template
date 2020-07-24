import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";

import "./App.scss";
import { useStore } from "../common/store/index";
import { utils } from "../common/utils/index";

const App = () => {
  //@ts-ignore
  const { lang } = useStore();
  useEffect(() => {
    lang.initLang();
  }, []);
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
    </Switch>
  );
};

export default App;
