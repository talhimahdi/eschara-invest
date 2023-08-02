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

// @mui material components
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";

function DeleteAccount() {
  return (
    <Card id="delete-account">
      <MDBox
        // pr={3}
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <MDBox p={3} lineHeight={1}>
          <MDBox mb={1}>
            <MDTypography variant="h5">Delete Account</MDTypography>
          </MDBox>
          <MDTypography variant="button" color="text">
            Once you delete your account, there is no going back. Please be
            certain.
          </MDTypography>
        </MDBox>
        <MDBox
          p={2}
          display="flex"
          width="100%"
          gap={3} /*flexDirection={{ xs: "column", sm: "row" }}*/
          justifyContent={{ xs: "center", md: "end" }}
          // alignItems="center"
          // justifyItems="center"
        >
          <MDButton variant="outlined" color="secondary">
            deactivate
          </MDButton>
          <MDButton variant="gradient" color="error">
            delete account
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default DeleteAccount;
