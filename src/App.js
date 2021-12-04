import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import Auth from "./components/Auth";
import Form from "./components/Form";

import { getPosts } from "./actions/posts";

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar />
      <Container maxwidth="lg">
        <Switch>
          <Route path="/" exact>
            <Posts setCurrentId={setCurrentId} />
          </Route>
          <Route path="/auth" exact component={Auth} />
          <Route path="/create" exact>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Route>
          <Route path="/edit" exact>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
