import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import AddPost from './AddPost';
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: 100
    }
  }));
const Post = () => {
    const classes = useStyles();

    return (
      <Page
        className={classes.root}
        title="Post"
      >
        <Container maxWidth="lg">
          <Header />
          <AddPost/>
        </Container>
      </Page>
    );
};

export default Post;