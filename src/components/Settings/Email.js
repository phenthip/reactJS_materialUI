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
  Typography,
  Link,
  Container
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import jwt from 'jwt-decode';
import {apiUrl,server }from '../../constants/index';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

var urls = apiUrl+server.RESET_PW

const Email = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: ''
  });

  const handleEmail = React.useCallback(async (values, setSubmitting, setStatus, setErrors) => {
    // console.log(values);
    var result;
    var data = {
      email:values.email,
      redirect_url:server.REDIRECT_URL
    }
    try {
      result =  await axios.post(urls, data)
      // console.log(result)
      // var result = {status:200,token:'aaaa'}
      if (result.status == 200) {
        localStorage.setItem('rb_token_plp', result.token);
        navigate('/sent', { replace: true }); 
      }else{
        console.log('wrong!')
        setSubmitting(false);
        setStatus("The email address you have entered has not been registered.")  
      }      
    } catch (error) {
      console.log('wrong!')
      setSubmitting(false);
      setStatus("The email address you have entered has not been registered.")       
    }
  });

  return (
    <>
      <Card>
        <CardHeader subheader="Input registered email" title="Email" />
        <Divider />
        <Formik
          initialValues={{
            email: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required')
          })}
          onSubmit={async(values, { setSubmitting, setStatus, setErrors }) => {
            setSubmitting(true);
            await handleEmail(values, setSubmitting, setStatus, setErrors)
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
            <form>
              <CardContent>                
                <Typography color="#d32f2f" variant="body2">
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
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  Verify email
                </Button>
              </Box>
              {/* {values.email} */}
            </form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default Email;
