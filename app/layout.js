"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

import theme from "/assets/theme";

import MDBox from "/components/MDBox";

import routes from "/routes";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

import {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
} from "../context";
import Sidenav from "../examples/Sidenav";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <head>
        <title>Eschara Invest</title>
        {/* <link rel="icon" type="image/png" href="/images/favicon.png" /> */}
        <link rel="icon" href="/images/favicon.png" sizes="any" />
        <meta charSet="utf-8" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        style={{ backgroundColor: "#F1F2F5" }}
      >
        <SessionProvider session={session}>
          <MaterialUIControllerProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {/* <Main> */}
              {children}
              {/* </Main> */}
            </ThemeProvider>
          </MaterialUIControllerProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
