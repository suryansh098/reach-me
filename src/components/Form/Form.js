import React, { useState } from 'react';
import { TextField, Typography, Button, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { createPost } from '../../actions/posts';

const Form = () => {
  const classes = useStyles();
  const [postData, setPostData] = useState({
    creater: '',
    title: '',
    message: '',
    selectedFile: ''
  });
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(createPost(postData));
  }

  const clear = () =>  {

  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField name="creater" variant="outlined" label="Creater" fullWidth value={postData.creater}onChange={(e) => setPostData({ ...postData, creater: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message}onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
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