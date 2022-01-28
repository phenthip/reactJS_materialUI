import * as React from "react";
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import jwt from 'jwt-decode';
import {apiUrl,server }from '../../constants/index';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
// var url_string = "http://www.example.com/t.html?token=aaaa&uidb64=qqqq"; 
var url_string = window.location.href
var url = new URL(url_string);
var token = url.searchParams.get("token");
var uidb64 = url.searchParams.get("uidb64");
// console.log(token,uidb64);
var urls = apiUrl+server.SET_PW

const SettingsPassword = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handlePassword = React.useCallback(async (credentials, setSubmitting,setStatus) => {
      // console.log(credentials);
      var data = {
        password: credentials.password,
        token:token,
        uidb64:uidb64
      }
      // console.log(data)
      var result;
      try {
        result =  await axios.patch(urls, data)
        // var result = {status:200,token:'aaaa'}
        // console.log(result)
      if (result.status == 200) {
        MySwal.fire({
          title: 'Done!',
          text: 'Successfully created password. Please go back to login again.',
          icon: 'success',
          confirmButtonText: 'Go back to login'
        }).then(() => {
          navigate('/login', { replace: true }); 
        });
      }else{
        console.log('wrong!')
        setSubmitting(false);
        setStatus("Something went wrong. Try again.")  
      }      
      } catch (error) {
        console.log('wrong!')
        setSubmitting(false);
        setStatus("Something went wrong. Try again.")  
      }
    });

  return (
    <>
    <Helmet>
        <title>Create password | SmartPLP</title>
      </Helmet>
    <Formik
          initialValues={{
            password: '',
            confirm:''
          }}
          validationSchema={Yup.object().shape({
            password: Yup.string().min(8).required('Password is required'),
            confirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
          })}
          onSubmit={async(values, { setSubmitting, setStatus, setErrors }) => {
            setSubmitting(true);
            handlePassword(values, setSubmitting, setStatus, setErrors)
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
            <form {...props}>
              <Card>
                <CardHeader
                  subheader="Create your new password (Your password must be at least 8 characters, and include at least one lowercase letter, one uppercase letter, and number.)"
                  title="Password"
                />
                <Divider />
                <CardContent>
                <Typography color="#d32f2f" variant="h5">
                  {status}
                </Typography>
                  <TextField
                    helperText={touched.password && errors.password}
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    label="Password"
                    margin="normal"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <TextField
                    helperText={touched.confirm && errors.confirm}
                    error={Boolean(touched.confirm && errors.confirm)}
                    fullWidth
                    label="Confirm password"
                    margin="normal"
                    name="confirm"
                    onChange={handleChange}
                    type="password"
                    value={values.confirm}
                    variant="outlined"
                  />
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                  }}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </Card>
            </form>
          )}
          </Formik>
    </>
  );
};

export default SettingsPassword;
