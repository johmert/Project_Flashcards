import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./deck/DeckList";

function Layout() {
  const { path } = useRouteMatch();

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path={path}>
            <DeckList />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
