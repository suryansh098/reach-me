import React from 'react';
import { Container } from '@material-ui/core';
import { 
  BrowserRouter as Router,
  Switch,
  Route 
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth';

const App = () => {
  
  return (
    <Router>
    <Container maxwidth="lg">
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/auth' exact component={Auth} />
      </Switch>
    </Container>
    </Router>
  )
}

export default App;