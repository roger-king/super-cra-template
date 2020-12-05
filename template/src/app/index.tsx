import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./Router";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s" defaultTitle="Super Create React App">
        <meta name="description" content="A Super Create React App" />
      </Helmet>
      <Router>
        <AppRouter />
      </Router>
    </HelmetProvider>
  );
};

export default App;
