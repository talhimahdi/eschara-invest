"use client";

import React from "react";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import Footer from "../../examples/Footer";

function Login() {
  return (
    <>
      <MDBox
        width="100vw"
        height="100%"
        minHeight="100vh"
        bgColor={"primary"}
        sx={{ overflowX: "hidden" }}
      >
        <MDBox
          mt={{ xs: -20, lg: -18 }}
          px={1}
          width="calc(100% - 2rem)"
          mx="auto"
        >
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
              <div>Login page</div>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </MDBox>
    </>
  );
}

export default Login;
