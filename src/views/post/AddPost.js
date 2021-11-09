import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { addData } from '../../slices/post';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import QuillEditor from 'src/components/QuillEditor';
import { useDispatch } from 'src/store';


const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));

const AddPost = ({ className, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        userId:'',
        title:'',
        body:''
      }}
      validationSchema={
        Yup.object().shape({
        userId: Yup.string().max(255),
        title:  Yup.string().max(255),
        body:   Yup.string().max(255),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // NOTE: Make API request
          console.log('VAL',values)
          dispatch(addData(values));
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Post Created', {
            variant: 'success'
          });
          history.push('/app/reports/dashboard');
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              md={6}
            >
              <Card>
                <CardContent>
                <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      User Id
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.userId && errors.userId)}
                    fullWidth
                    helperText={touched.userId && errors.userId}
                    label="Post UserId"
                    name="userId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.userId}
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              <Card>
                <CardContent>
                <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      Title
                    </Typography>
                  </Box>
                   <TextField
                    error={Boolean(touched.title && errors.title)}
                    fullWidth
                    helperText={touched.title && errors.title}
                    label="Post Title"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    variant="outlined"
                  />
                </CardContent>
                </Card>
                </Grid>
                <Grid
              item
              xs={12}
              md={12}
            >
              <Card>
                <CardContent>
                <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      Body
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <QuillEditor
                      className={classes.editor}
                      value={values.body}
                      onChange={(value) => setFieldValue('body', value)}
                    />
                  </Paper>
                  {(touched.body && errors.body) && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {errors.body}
                      </FormHelperText>
                    </Box>
                  )}
                </CardContent>
                </Card>
                
                </Grid>
          </Grid>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Create new Post
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

AddPost.propTypes = {
  className: PropTypes.string
};

export default AddPost;
