"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import theme from "/assets/theme";

import MDBox from "/components/MDBox";

import routes from "/routes";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// import "./globals.css";
import { Inter } from "next/font/google";
import {
  MaterialUIControllerProvider,
  useMaterialUIController,
} from "../context";
import Sidenav from "../examples/Sidenav";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <MaterialUIControllerProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main children={children} />
      </ThemeProvider>
    </MaterialUIControllerProvider>
  );
}

// Images
import favicon from "/assets/images/favicon.png";
import appleIcon from "/assets/images/apple-icon.png";
import brand from "/public/images/logo/logo-white.svg";
// import brandDark from "/assets/images/logo-ct-dark.png";

function Main({ children }) {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;

  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useRouter();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // const brandIcon =
  //   (transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite;

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <html lang="en">
      <head>
        <title>Eschara-Invest</title>
        <meta charSet="utf-8" />
        {/* <meta name="theme-color" content="#1A73E8" /> */}
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
        {children}
        <Sidenav
          color={sidenavColor}
          brand={brand}
          brandName="Eschara Invest"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      </body>
    </html>
  );
}
