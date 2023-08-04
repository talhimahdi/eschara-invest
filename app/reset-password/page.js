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
        flexDirection: "column",

        backgroundColor: colors.escharaThemePrimary.main,

        gap: 10,
      }}
    >
      <MDBox width={400} sx={{ textAlign: "center" }}>
        <MDTypography
          variant="button"
          fontWeight="medium"
          sx={{
            textAlign: "center",
            color: colors.white.main,
            fontSize: 30,
            // fontStyle: 'italic',
          }}
        >
          Reset password
        </MDTypography>
        <br />
        <MDTypography
          variant="button"
          fontWeight="medium"
          sx={{
            textAlign: "center",
            color: colors.white.main,
            fontSize: 14,
            // fontStyle: 'italic',
          }}
        >
          You will receive an e-mail in maximum 60 seconds
        </MDTypography>
      </MDBox>
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
              onClick={() => router.push("/login")}
            >
              Reset
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
    </MDBox>
  );
}

export default Login;
