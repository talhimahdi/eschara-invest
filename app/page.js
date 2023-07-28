"use client";

import { Icon } from "@mui/material";
import MDBox from "../components/MDBox";
import MDTypography from "../components/MDTypography";
import DashboardLayout from "../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../examples/Navbars/DashboardNavbar";

export default function Home() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDTypography variant="body1">Home page.</MDTypography>
      </MDBox>
    </DashboardLayout>
  );
}
