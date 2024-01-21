"use client";

import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
  useTransition,
} from "react";
import { signIn, useSession } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";

// // @mui material components
import Card from "@mui/material/Card";

// // NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";

import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import colors from "../../assets/theme/base/colors";
import Image from "next/image";
import { Typography } from "@mui/material";

function Login() {
  const session = useSession();
  const router = useRouter();
  const userName = useRef("");
  const pass = useRef("");

  const [loginError, setLoginError] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (session.status === "authenticated") router.push("/");
  });

  const onSubmit = async () => {
    startTransition(async () => {
      try {
        if (userName.current != "" && pass.current != "") {
          const signInResult = await signIn("credentials", {
            email: userName.current,
            // email: "talhi.mahdi.1@gmail.com",
            password: pass.current,
            // password: "password",
            callbackUrl: "/",
            redirect: false,
          });
          if (
            signInResult.status === 200 &&
            signInResult.error === null &&
            signInResult.ok &&
            signInResult.url
          ) {
            router.push(signInResult.url);
          } else {
            const responseError = JSON.parse(signInResult.error);

            if (
              responseError.isActive != undefined &&
              responseError.isActive == false
            ) {
              router.push("/waiting-page");
              return;
            }
            setLoginError(responseError.error);
          }
        } else {
          setLoginError("please enter your email and password !");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  // if (session.status === "loading") {
  //   return <>loading</>;
  // }

  if (session.status === "unauthenticated") {
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
                <MDInput
                  type="email"
                  fullWidth
                  placeholder="Email"
                  required
                  onChange={(e) => (userName.current = e.target.value)}
                // sx={{
                //   "& .MuiFormHelperText-root": {
                //     color: "red",
                //     fontWeight: "bold",
                //   },
                // }}
                />
              </MDBox>
              <MDBox>
                <MDInput
                  type="password"
                  placeholder="Password"
                  required
                  fullWidth
                  onChange={(e) => (pass.current = e.target.value)}
                />
              </MDBox>
            </MDBox>

            <MDBox textAlign="end">
              <MDTypography variant="button" fontWeight="medium">
                <Link
                  href="/reset-password"
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

                  "&:focus:not(:hover)": {
                    backgroundColor: colors.escharaThemeSecondary.main,
                  },
                  "&.Mui-disabled": {
                    backgroundColor: colors.grey[400],
                    color: colors.grey[700],
                  },
                }}
                fullWidth
                // onClick={() => router.push("/overview")}
                onClick={() => onSubmit()}
                disabled={isPending}
              >
                Login
              </MDButton>
            </MDBox>
          </MDBox>

          <Typography p={2} variant="caption" fontWeight="medium" color={"red"}>
            {loginError}
          </Typography>
        </Card>
      </MDBox>
    );
  }
}

export default Login;
