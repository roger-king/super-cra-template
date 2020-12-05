import React from "react";
import { Route, Switch } from "react-router";

import { routes } from "./pages";

export const AppRouter: React.FC = () => {
  return (
    <Switch>
      {routes.map((r) => (
        <Route
          path={r.path}
          component={() => {
            // TODO add lazy loading here
            return <r.component />;
          }}
        />
      ))}
    </Switch>
  );
};
