import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { apiUrl, server } from "../../constants/index";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Stack,
  Snackbar,
  Alert
} from '@material-ui/core';
import { Helmet } from "react-helmet";

var token_url = apiUrl + server.TOKEN;

function UserEdit(props) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        department: '',
        factory: ''
      });
    
    const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value
        });
    };

    useEffect(async () => {  
    await checkToken(); 
    const url_string = window.location.href
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    // console.log(id);
    const GetUserById = async()=>{
        var urls = `${apiUrl}${server.USER_EDIT}/${id}/`
        const result = await axios({
            method: "get", //you can set what request you want to be
            url: urls,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("rb_ac_token"),
            },
          });
        return result.data;
    }
    var result = await GetUserById();
    if (result.id) {
        setValues(result)
    }
    }, []);

    const handleSubmit = async()=>{
        // console.log(values)
        var url_edit = `${apiUrl}${server.USER_EDIT}/${values.id}/`
        await axios.patch(url_edit,values,{
          headers:{
          Authorization: `Bearer ${localStorage.getItem("rb_ac_token")}`        
          }
        })
        .then(response=>{
            // console.log(response)
            if (response.status == 200) {
                setOpen(true);
                setTimeout(() => {
                    navigate(`/settings`, { replace: true });
                }, 2000);
            }else{
                setOpen2(true);
            }
        })
        .catch(error=>{
            setOpen2(true);
            console.log(error)
        })
    }

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

    return (
      <>
      <Helmet>
      <title>Profile | Platform</title>
      </Helmet>
        <form
          autoComplete="off"
          noValidate
          {...props}
        >
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}>
                <Alert severity="success" sx={{ width: '100%' }}>
                The changes have been saved successfully.
                </Alert>
            </Snackbar>
            <Snackbar open={open2} autoHideDuration={4000} anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}>
                <Alert severity="error" sx={{ width: '100%' }}>
                Failed to save changes.
                </Alert>
            </Snackbar>
          </Stack>
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    helperText="Please specify the first name"
                    label="First name"
                    name="first_name"
                    onChange={handleChange}
                    required
                    value={values.first_name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Last name"
                    name="last_name"
                    onChange={handleChange}
                    required
                    value={values.last_name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone_number"
                    onChange={handleChange}
                    type="number"
                    value={values.phone_number}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    onChange={handleChange}
                    required
                    value={values.department}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Plant"
                    name="factory"
                    onChange={handleChange}
                    required
                    value={values.factory}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
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
              >
                Save details
              </Button>
            </Box>
          </Card>
        </form>
      </>
      );
}

UserEdit.propTypes = {};

export default UserEdit;
