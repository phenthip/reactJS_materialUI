import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import jwt from 'jwt-decode';
import { apiUrl, server } from '../constants/index';

var urls = apiUrl + server.LOGIN_URL;
// console.log(window.location.host)
const Login = React.memo(() => {
  const navigate = useNavigate();

  const handleLogin = React.useCallback(
    async (credentials, setSubmitting, setStatus) => {
      // console.log(credentials);
      var data = {
        email: credentials.email,
        password: credentials.password
      };
      // console.log(data);
      var result;
      try {
        result = await axios.post(urls, data);
        // console.log(result);
        if (result.status == 200) {
          let access_user = jwt(result.data.tokens.access);
          let access_exp = access_user.exp;
          let refresh_user = jwt(result.data.tokens.refresh);
          let refresh_exp = refresh_user.exp;
          localStorage.setItem('rb_ac_token', result.data.tokens.access);
          localStorage.setItem('rb_rf_token', result.data.tokens.refresh);
          localStorage.setItem('rb_ac_exp', access_exp);
          localStorage.setItem('rb_rf_exp', refresh_exp);
          localStorage.setItem('rb_UserId', result.data.id);
          localStorage.setItem('rb_authen', 'True');
          localStorage.setItem('rb_email', result.data.email);
          // window.location.replace('/app/home');
          navigate('/home', { replace: true });
        } else {
          console.log('wrong!');
          setSubmitting(false);
          setStatus('Invalid credentials, try again');
        }
      } catch (error) {
        console.log('wrong!');
        setSubmitting(false);
        setStatus('Invalid credentials, try again');
      }
    }
  );

  return (
    <>
      <Helmet>
        <title>Login | ROBOT</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string().min(8).required('Password is required')
            })}
            // onSubmit={() => {
            //   navigate('/app/dashboard', { replace: true });
            // }}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              setSubmitting(true);
              handleLogin(values, setSubmitting, setStatus);
              // navigate('/app/dashboard', { replace: true })
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              status
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h3">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Typography color="#d32f2f" variant="body4">
                  {status}
                </Typography>

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Sign in
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  Forget your password?{' '}
                  <Link
                    component={RouterLink}
                    to="/email"
                    variant="body2"
                    underline="hover"
                  >
                    Reset Password
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
});

export default Login;
