/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// Settings page components
import FormField from "../FormField";

function BasicInfo() {
  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Basic Info</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField label="First Name" placeholder="Alec" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="Last Name" placeholder="Thompson" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField
              label="Phone Number"
              placeholder="+40 735 631 620"
              inputProps={{ type: "tel" }}
            />
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default BasicInfo;
