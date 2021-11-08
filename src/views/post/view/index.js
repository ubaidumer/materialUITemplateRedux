import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import Page from 'src/components/Page';
import Header from './Header'
import ViewPost from './ViewPost';
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: 100
    }
  }));
const View=()=> {
    const classes = useStyles();
    return (
        <Page
        className={classes.root}
        title="Post"
      >
        <Container maxWidth={false}>
          <Header />
          <ViewPost/>
        </Container>
      </Page>
    );
};

export default View;