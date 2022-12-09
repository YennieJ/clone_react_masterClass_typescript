import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./Routes/Coin";
import Coins from "./Routes/Coins";

interface RouterProps {
  toggleTheme: () => void;
  theme: string;
}
const Router = ({ toggleTheme, theme }: RouterProps) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin toggleTheme={toggleTheme} theme={theme}></Coin>
        </Route>
        <Route path="/">
          <Coins toggleTheme={toggleTheme} theme={theme}></Coins>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
