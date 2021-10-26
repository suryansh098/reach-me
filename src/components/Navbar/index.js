import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Avatar} from '@material-ui/core';
import jwtDecode from 'jwt-decode';

import useStyles from'./styles';
import reachme from '../../images/reach-me.png';
import { LOGOUT } from '../../constants';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  
  const logout = useCallback(
    () => {
      dispatch({ type: LOGOUT });
      history.push('/');
      setUser(null);
    },
    [dispatch, history],
  );

  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = jwtDecode(token);

      if(decodedToken.exp * 1000 < new Date().getTime())
        logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, user?.token, logout]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">ReachMe</Typography>
        <img className={classes.image} src={reachme} alt="reach-me" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
            <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Log Out</Button>
          </div>
        ) : (
          <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
