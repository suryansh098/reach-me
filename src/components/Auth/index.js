import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { GoogleLogin }  from 'react-google-login';

import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { signup, signin } from '../../actions/auth';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
    setShowPassword(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({
        type: 'AUTH',
        data: { result, token }
      });
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = () => {
    console.log('Google Sign In was unsuccessful. Try Again Later.')
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            {isSignup && (
                <>
                  <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus halfWidth />
                  <Input name='lastName' label='Last Name' handleChange={handleChange} halfWidth />
                </>
            )}
            <Input name='email' label='Email Address' handleChange={handleChange} type='email' autoFocus={!isSignup} />
            <Input name='password' label='Password' handleChange={handleChange} type={ showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin 
            clientId='685140598111-cl58720410e5e98bhkj93rijd6df2k2s.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={ <Icon /> } variant='contained'>
                Continue with Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justifyContent='center'>
            <Button onClick={switchMode}>
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;
