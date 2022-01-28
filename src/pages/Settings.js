import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl, server } from "../constants/index";
import UserList from "../components/Settings/UserList";
import UserToolbar from "../components/Settings/UserToolbar";

var urls = apiUrl + server.USER_URL;
var token_url = apiUrl + server.TOKEN;

function Settings(props) {
  const [User, setUser] = useState([]);

  useEffect(async () => {
    const check_token = await checkToken();

    const getUser = async () => {
      const result = await axios({
        method: "get", //you can set what request you want to be
        url: urls,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("rb_ac_token"),
        },
      });
      return result.data;
    };
    var data = await getUser();
    // console.log(data)
    data.sort((a, b) => a.id - b.id);
    setUser(data);
  }, []);

  const checkToken = async () => {
    let access_exp = localStorage.getItem("rb_ac_exp");
    let refresh_exp = localStorage.getItem("rb_rf_exp");
    if (refresh_exp < Date.now() / 1000) {
      console.log("refresh is expiried");
      // alert('Please log in again')
      localStorage.clear();
      window.location = "/login";
    } else if (access_exp < Date.now() / 1000) {
      const refresh = localStorage.getItem("rb_rf_token");

      let data = {
        refresh: refresh,
      };
      let result = await axios.post(token_url, data);
      console.log("got new access_token!");
      localStorage.setItem("rb_ac_token", result.data.access);
    }
  };

  return (
    <>
      <Helmet>
        <title>Settings | ROBOT</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <UserToolbar />
          <Box sx={{ pt: 3 }}>
            <UserList customers={User} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Settings;
