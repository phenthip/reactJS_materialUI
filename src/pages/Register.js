import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { apiUrl, server } from '../constants/index';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

var urls = apiUrl + server.REGISTER_URL;
var token_url = apiUrl + server.TOKEN;

const Register = () => {
  const navigate = useNavigate();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  
    useEffect(async () => {
    const check_token = await checkToken();
  }, []);

  const checkToken = async () => {
    let access_exp = localStorage.getItem('rb_ac_exp');
    let refresh_exp = localStorage.getItem('rb_rf_exp');
    if (refresh_exp < Date.now() / 1000) {
      console.log('refresh is expiried');
      // alert('Please log in again');
      localStorage.clear();
      window.location = '/login';
    } else if (access_exp < Date.now() / 1000) {
      const refresh = localStorage.getItem('rb_rf_token');

      let data = {
        refresh: refresh
      };
      let result = await axios.post(token_url, data);
      console.log('got new access_token!');
      localStorage.setItem('rb_ac_token', result.data.access);
    }
  };

  const handleRegister = React.useCallback(
    async (credentials, setSubmitting, setStatus) => {
      // const check_token = await checkToken();
      // console.log(credentials);
      var is_staff,is_superuser;
      if (credentials.user_type == 'officer') {
        is_staff = true
        is_superuser = false
      }else if(credentials.user_type == 'supervisor'){
        is_staff = false
        is_superuser = true
      }else if(credentials.user_type == 'admin'){
        is_staff = true
        is_superuser = true        
      }
      var first_name = credentials.firstName
      var last_name = credentials.lastName
      var email = credentials.email
      var body = {
        email: email.toLowerCase(),    
        first_name: first_name.toLowerCase(),
        last_name: last_name.toLowerCase(),
        phone_number: credentials.phone_number,
        department: credentials.department,
        factory: credentials.plant.toUpperCase(),
        is_staff: is_staff,
        is_superuser: is_superuser,
        invited_by: localStorage.getItem('email'),
        password:'12345678',
      }
      // console.log(body)
      var token = localStorage.getItem('rb_ac_token')
      // console.log(token)
      const AddUser = async () => {
        const result = await axios.post(urls,body,{
          headers:{
          Authorization: `Bearer ${token}`        
          }
        })
        return result.data;
      };
      const data = await AddUser()
      // console.log(data)
      // const data = { status: 400 };
      if (data.id) {
        MySwal.fire({
          title: 'Good job!',
          text: 'Successfully created new user! Please inform user to check their inbox and setting password.',
          icon: 'success',
          confirmButtonText: 'Ok,Got it!'
        }).then(() => {
          navigate('/settings', { replace: true });
        });
      } else {
        MySwal.fire({
          title: 'Error!',
          text: 'Email is invalid or already exit.',
          icon: 'error',
          confirmButtonText: 'Ok,Got it!'
        });
      }
    }
  );

  return (
    <>
      <Helmet>
        <title>Register | ROBOT</title>
      </Helmet>
      <Box sx={{ py: 2, ml: 2, mt: 2 }}>
        <Button
          color="primary"
          size="medium"
          type="submit"
          variant="contained"
          component={RouterLink}
          to="/settings"
        >
          <ArrowLeftIcon />
          Back to user
        </Button>
      </Box>
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
              firstName: '',
              lastName: '',
              phone_number: '',
              department: '',
              plant: '',
              user_type: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              firstName: Yup.string()
                .max(255)
                .required('First name is required'),
              lastName: Yup.string().max(255).required('Last name is required'),
              phone_number: Yup.string()
                .matches(phoneRegExp, 'Phone number is not valid')
                .max(10)
                .required('Contact number is required'),
              department: Yup.string()
                .max(255)
                .required('Department is required'),
              plant: Yup.string().max(255).required('Plant is required'),
              user_type: Yup.string().max(255).required('User type is required')
              // policy: Yup.boolean().oneOf([true], 'This field must be checked')
            })}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              setSubmitting(true);
              handleRegister(values, setSubmitting, setStatus);
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
                <Box sx={{ mb: 3, mt: 15 }}>
                  <Typography color="textPrimary" variant="h2">
                    Register new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Please use @cpf.co.th email to create new account
                  </Typography>
                </Box>
                {status}
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                />
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
                  error={Boolean(touched.phone_number && errors.phone_number)}
                  fullWidth
                  helperText={touched.phone_number && errors.phone_number}
                  label="Contact number"
                  margin="normal"
                  name="phone_number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="phone_number"
                  value={values.phone_number}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.department && errors.department)}
                  fullWidth
                  helperText={touched.department && errors.department}
                  label="Department"
                  margin="normal"
                  name="department"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.department}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.plant && errors.plant)}
                  fullWidth
                  helperText={touched.plant && errors.plant}
                  label="Plant Id"
                  margin="normal"
                  name="plant"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.plant}
                  variant="outlined"
                />
                <Box mt={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      User type
                    </InputLabel>
                    <Select
                      error={Boolean(touched.user_type && errors.user_type)}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.user_type}
                      label="User type"
                      onChange={handleChange}
                      variant="outlined"
                      name="user_type"
                    >
                      <MenuItem value="officer">Officer</MenuItem>
                      <MenuItem value="supervisor">Supervisor</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                    <FormHelperText
                      style={{ marginLeft: 15, color: '#d32f2f' }}
                    >
                      {errors.user_type &&
                        touched.user_type &&
                        errors.user_type}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                </Box>
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Create new account
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
