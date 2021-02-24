import React from "react";
import styled from "styled-components";

// local imports
import { JumbotronContainer } from "../../containers/Welcome";

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
