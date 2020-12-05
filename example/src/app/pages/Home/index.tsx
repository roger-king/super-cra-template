import React from "react";
import styled from "@emotion/styled";

// local imports
import { JumbotronContainer } from "../../containers/Jumbotron";

const Div = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
`;

export const Home = () => {
  return (
    <Div>
      <JumbotronContainer />
    </Div>
  );
};
