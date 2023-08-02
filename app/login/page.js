"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

// // @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// // @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// // NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";

// Authentication layout components

// Images

import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import colors from "../../assets/theme/base/colors";
import Image from "next/image";

function Login() {
  const router = useRouter();
  return (
    <MDBox
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: colors.escharaThemePrimary.main,
      }}
    >
      <Card sx={{ borderRadius: 1 }}>
        <MDBox p={5}>
          <Image
            src={"/images/logo/logo-blue.svg"}
            alt="logo"
            width={300}
            height={30}
          />
        </MDBox>

        <MDBox component="form" role="form" pb={3} px={3}>
          <MDBox gap={2} display="flex" flexDirection="column">
            <MDBox>
              <MDInput type="email" fullWidth placeholder="Email" />
            </MDBox>
            <MDBox>
              <MDInput type="password" placeholder="Password" fullWidth />
            </MDBox>
          </MDBox>

          <MDBox textAlign="end">
            <MDTypography variant="button" fontWeight="medium">
              <Link
                href="#"
                style={{
                  // textDecoration: 'none',
                  color: colors.escharaThemeSecondary.main,
                  // fontSize: 30,
                  // fontStyle: 'italic',
                }}
              >
                Forgot your password?
              </Link>
            </MDTypography>
          </MDBox>

          <MDBox mt={4} mb={1}>
            <MDButton
              sx={{
                backgroundColor: colors.escharaThemeSecondary.main,
                color: colors.white.main,

                "&:hover": {
                  backgroundColor: colors.escharaThemeSecondary.main,
                },
              }}
              fullWidth
              onClick={() => router.push("/overview")}
            >
              Login
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
    </MDBox>
  );
}

export default Login;
