import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/Home/budget";
import { LatestOrders } from "../components/Home/latest-orders";
import { LatestProducts } from "../components/Home/latest-products";
import { Sales } from "../components/Home/sales";
import { TasksProgress } from "../components/Home/tasks-progress";
import { TotalCustomers } from "../components/Home/total-customers";
import { TotalProfit } from "../components/Home/total-profit";
import { TrafficByDevice } from "../components/Home/traffic-by-device";
import plant from "../assets/mock/data";
import Map from "../components/Home/Map";

function Home(props) {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Home | ROBOT</title>
      </Helmet>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >

      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
          <Grid style={{position:'relative', height:500}}
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}>
              <Map />
          </Grid >
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
    </>
  );
}

Home.propTypes = {};

export default Home;
