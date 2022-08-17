import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import GlobalStyles from "./GlobalStyles";
import HomePage from "./HomePage";
import DetailedClass from "./DetailedClass";
import Profile from "./Profile";
import { DanceClassContext } from "./DanceClassContext";

const App = () => {
  const { setDanceClasses } = useContext(DanceClassContext);

  useEffect(() => {
    fetch(`/get-dance-classes/""/""`)
      .then((res) => res.json())
      .then((data) => setDanceClasses(data.data))

      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/:placeId">
            <DetailedClass />
          </Route>

          <Route path="">404: Oops!</Route>
        </Switch>
        <Footer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: linear-gradient(red, pink);
  display: flex;
  flex-direction: column;
  height: calc("100vh - 110px");
  position: relative;
`;
export default App;
