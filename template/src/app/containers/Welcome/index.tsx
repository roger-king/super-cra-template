import React from "react";
import { Jumbotron } from "../../components/Jumbotron";

export const JumbotronContainer = () => {
  // Should get from an API
  const name = "Super User";

  return (
    <Jumbotron>
      <h1> Hello, {name}</h1>
      <text>Thank you for using Super-CRA template!</text>
    </Jumbotron>
  );
};
