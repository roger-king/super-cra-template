import React from "react";

// DO NOT DELETE - page_component_import
import { Home } from "./Home";

interface Route {
  path: string;
  component: React.ComponentType;
  lazy: boolean;
  protected?: boolean;
}

export const routes: Route[] = [
  {
    path: "/",
    component: Home,
    lazy: true,
  },
  // DO NOT DELETE - page_import here
];
