import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const initialState = {
  title: '',
  message: '',
  tags: '',
  selectedFile: ''
};

const Form = (props) => {
  const { currentId, setCurrentId } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState(initialState);
  const post = useSelector(state => currentId ? state.posts.find(post => post._id === currentId) : null);
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if(post) {
      setPostData(post);
    }
  }, [post])

  const handleSubmit = (event) => {
    event.preventDefault();

    if(currentId) {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
    } else {
      dispatch(createPost({...postData, name: user?.result?.name}));
    }

    clear();
  }

  const clear = () =>  {
    setCurrentId(null);
    setPostData(initialState);
  }

  if (!user?.result?.name) {
    return(
      <Redirect to='/auth' />
    )
  }

  return (
    <Paper className={classes.paper} maxwidth="md">
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{ currentId ? 'Editing' : 'Creating' } a Memory</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" multiline rows={5} fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (space separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>clear</Button>
      </form>
    </Paper>
  )
}

export default Form;