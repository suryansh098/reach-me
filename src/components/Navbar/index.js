import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  Avatar,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  ArrowDropDown,
  Home,
  AddBox,
  ArrowForward,
  ArrowDropUp,
} from "@material-ui/icons";
import jwtDecode from "jwt-decode";

import useStyles from "./styles";
import reachme from "../../images/reach-me.png";
import { LOGOUT } from "../../constants";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdown = useRef();

  const handleOutsideClick = (event) => {
    if (dropdown.current && !dropdown.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
    history.push("/");
    setUser(null);
  }, [dispatch, history]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token, logout]);

  return (
    <AppBar className={classes.appBar}>
      <div className={classes.mainContainer}>
        <div className={classes.brandContainer}>
          <img
            className={classes.image}
            src={reachme}
            alt="reach-me"
            height="50"
          />
          <Typography
            component={Link}
            to="/"
            className={classes.heading}
            variant="h1"
          >
            ReachMe
          </Typography>
        </div>
        <Toolbar className={classes.toolbar} ref={dropdown}>
          {user ? (
            <div className={classes.profile}>
              <div
                className={classes.dFlex}
                onClick={() => setShowDropDown((p) => !p)}
              >
                <Avatar
                  className={classes.purple}
                  alt={user.result.name}
                  src={user.result.imageUrl}
                >
                  {user.result.name.charAt(0)}
                </Avatar>

                <Typography className={classes.outerGreeting} variant="h6">
                  Hello, {user.result.name.split(" ")[0]}!
                </Typography>
                {showDropDown ? <ArrowDropUp /> : <ArrowDropDown />}
              </div>

              {showDropDown && (
                <Card className={classes.dropdown}>
                  <Typography className={classes.innerGreeting} variant="h6">
                    Hello, {user.result.name.split(" ")[0]}!
                  </Typography>

                  <List>
                    <Link to="/">
                      <ListItem>
                        <ListItemIcon>
                          <Home />
                        </ListItemIcon>
                        <ListItemText>Home</ListItemText>
                      </ListItem>
                    </Link>

                    <Link to="/create">
                      <ListItem>
                        <ListItemIcon>
                          <AddBox />
                        </ListItemIcon>
                        <ListItemText>New Post</ListItemText>
                      </ListItem>
                    </Link>

                    <Link to="/">
                      <ListItem onClick={logout}>
                        <ListItemIcon>
                          <ArrowForward />
                        </ListItemIcon>
                        <ListItemText>Log Out</ListItemText>
                      </ListItem>
                    </Link>
                  </List>
                </Card>
              )}
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Navbar;
