"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";
import MDBadge from "/components/MDBadge";

// NextJS Material Dashboard 2 PRO examples
import Breadcrumbs from "/examples/Breadcrumbs";
import NotificationItem from "/examples/Items/NotificationItem";

import colors from "/assets/theme/base/colors";

import logo from "/public/images/logo/logo-blue.svg";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "/examples/Navbars/DashboardNavbar/styles";

// NextJS Material Dashboard 2 PRO context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "/context";
import MDTypography from "../../../components/MDTypography";
import { Grid } from "@mui/material";
import MDAvatar from "../../../components/MDAvatar";
import { useSession } from "next-auth/react";

function DashboardNavbar({
  absolute = false,
  light = false,
  isMini = false,
  pageTitle = null,
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    transparentNavbar,
    fixedNavbar,
    openConfigurator,
    darkMode,
  } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  // const route = useRouter().pathname?.split("/").slice(1);
  const route = usePathname()?.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem
        icon={<Icon>podcasts</Icon>}
        title="Manage Podcast sessions"
      />
      <NotificationItem
        icon={<Icon>shopping_cart</Icon>}
        title="Payment successfully completed"
      />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <>
      {/* Mobile */}
      <MDBox
        display={{
          marginBottom: 10,
          xs: "flex",
          md: "none",
          flexDirection: "column",
        }}
        gap={3}
      >
        <Grid
          container
          sx={{
            alignItems: "center",
          }}
        >
          {/* <Grid item xs={1}>
            <IconButton onClick={handleMiniSidenav} size="small" sx={{ p: 0 }}>
              <Icon fontSize="medium" sx={iconsStyle}>
                {miniSidenav ? "menu_open" : "menu"}
              </Icon>
            </IconButton>
          </Grid> */}
          <Grid item xs={9}>
            <MDBox display="flex">
              <MDBox component="img" src={logo.src} alt={"logo"} width="85%" />
            </MDBox>
          </Grid>
          <Grid item xs={3}>
            <MDBox display="flex" gap={2}>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <MDBadge
                  badgeContent={3}
                  size="xs"
                  circular
                  color={"escharaThemeSecondary"}
                >
                  <Icon sx={{ color: colors.grey[500] }}>notifications</Icon>
                </MDBadge>
              </IconButton>
              <MDBox
                display="flex"
                alignItems={"center"}
                onClick={() => router.push("/settings")}
              >
                <MDAvatar
                  sx={{
                    bgcolor: colors.escharaThemePrimary.main,
                  }}
                  size="sm"
                >
                  {session?.user ? (
                    <>
                      {session.user.first_name.charAt(0) +
                        session.user.last_name.charAt(0)}
                    </>
                  ) : (
                    ""
                  )}
                </MDAvatar>
              </MDBox>
              {/* {renderMenu()} */}
            </MDBox>
          </Grid>
        </Grid>
        {/* <MDBox>
          <MDInput
            label="Search here"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                pb: 0,
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #10123F",
              },
            }}
          />
        </MDBox> */}
        <MDBox color="inherit">
          <Breadcrumbs
            icon="home"
            title={route ? route[route.length - 1] : ""}
            route={route}
            light={false}
          />
        </MDBox>
        {/* <MDBox mb={3}>
          <MDTypography
            fontWeight="bold"
            textTransform="capitalize"
            variant="h5"
            color={light ? "white" : "dark"}
            noWrap
          >
            {pageTitle
              ? pageTitle
              : route
              ? route[route.length - 1].replace("-", " ")
              : ""}
          </MDTypography>
        </MDBox> */}
        {renderMenu()}
      </MDBox>

      {/* Disktoop */}
      <MDBox display={{ xs: "none", md: "block" }}>
        <AppBar
          position={absolute ? "absolute" : navbarType}
          color="inherit"
          sx={(theme) =>
            navbar(theme, { transparentNavbar, absolute, light, darkMode })
          }
        >
          <Toolbar
            sx={(theme) => {
              navbarContainer(theme);
            }}
          >
            <Grid container alignItems={"center"}>
              <Grid item xs={12} md={4}>
                <MDBox color="inherit" mb={{ xs: 1, md: 0 }}>
                  <Breadcrumbs
                    icon="home"
                    title={route ? route[route.length - 1] : ""}
                    route={route}
                    light={light}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={6} md={5}>
                {/* <MDBox pr={1} display="flex">
                  <MDInput label="Search here" sx={{ width: "100%" }} />
                </MDBox> */}
              </Grid>
              <Grid container item xs={6} md={3} justifyContent={"end"}>
                <MDBox>
                  <MDBox display="flex">
                    <IconButton
                      size="small"
                      disableRipple
                      color="inherit"
                      sx={navbarIconButton}
                      aria-controls="notification-menu"
                      aria-haspopup="true"
                      variant="contained"
                      onClick={handleOpenMenu}
                    >
                      <MDBadge
                        badgeContent={3}
                        color={"escharaThemeSecondary"}
                        size="xs"
                        circular
                      >
                        <Icon sx={{ color: colors.grey[500] }}>
                          notifications
                        </Icon>
                      </MDBadge>
                    </IconButton>
                    <MDBox
                      display="flex"
                      alignItems={"center"}
                      onClick={() => router.push("/settings")}
                      sx={{ cursor: "pointer" }}
                    >
                      <MDTypography color={"dark"} sx={{ mx: 2, fontSize: 15 }}>
                        {session?.user ? (
                          <>
                            {session.user.first_name +
                              " " +
                              session.user.last_name}
                          </>
                        ) : (
                          ""
                        )}
                      </MDTypography>
                      <MDAvatar
                        sx={{
                          bgcolor: colors.escharaThemePrimary.main,
                        }}
                        size="sm"
                      >
                        {session?.user && (
                          <>
                            {session.user.first_name.charAt(0) +
                              session.user.last_name.charAt(0)}
                          </>
                        )}
                      </MDAvatar>
                    </MDBox>
                    {/* {renderMenu()} */}
                  </MDBox>
                </MDBox>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {/* <MDTypography
          mt={3}
          fontWeight="bold"
          textTransform="capitalize"
          variant="h5"
          color={light ? "white" : "dark"}
          noWrap
        >
          {pageTitle
            ? pageTitle
            : route
            ? route[route.length - 1].replace("-", " ")
            : ""}
        </MDTypography> */}
      </MDBox>
    </>
  );
}

// Setting default values for the props of DashboardNavbar
// DashboardNavbar.defaultProps = {
//   absolute: false,
//   light: false,
//   isMini: false,
// };

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
