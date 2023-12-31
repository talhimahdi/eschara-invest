"use client";

import { useEffect, useState, useTransition } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO examples
import SidenavCollapse from "/examples/Sidenav/SidenavCollapse";
import SidenavList from "/examples/Sidenav/SidenavList";
import SidenavItem from "/examples/Sidenav/SidenavItem";

// Custom styles for the Sidenav
import SidenavRoot from "/examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "/examples/Sidenav/styles/sidenav";

// NextJS Material Dashboard 2 PRO context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "/context";

import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import EILoader from "../../components/EILoader";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [openCollapse, setOpenCollapse] = useState(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;

  const pathname = usePathname();

  const collapseName = pathname?.split("/").slice(1)[0];
  const items = pathname?.split("/").slice(1);
  const itemParentName = items[1];
  const itemName = items[items.length - 1];

  const { data: session } = useSession();

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    setOpenCollapse(collapseName);
    setOpenNestedCollapse(itemParentName);
  }, [collapseName, itemParentName]);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : transparentSidenav
      );
      setWhiteSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : whiteSidenav
      );
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, transparentSidenav, whiteSidenav]);

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse) => {
    const template = collapse.map(({ name, route, key, href }) =>
      href ? (
        <MuiLink
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavItem name={name} nested />
        </MuiLink>
      ) : (
        <Link href={route} key={key} sx={{ textDecoration: "none" }}>
          <SidenavItem name={name} active={route === pathname} nested />
        </Link>
      )
    );

    return template;
  };
  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses) =>
    collapses.map(({ name, collapse, route, href, key }) => {
      let returnValue;

      if (collapse) {
        returnValue = (
          <SidenavItem
            key={key}
            color={color}
            name={name}
            active={key === itemParentName ? "isParent" : false}
            open={openNestedCollapse === key}
            onClick={({ currentTarget }) =>
              openNestedCollapse === key &&
              currentTarget.classList.contains("MuiListItem-root")
                ? setOpenNestedCollapse(false)
                : setOpenNestedCollapse(key)
            }
          >
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = href ? (
          <MuiLink
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavItem color={color} name={name} active={key === itemName} />
          </MuiLink>
        ) : (
          // Add onClick
          // <Link href={route} sx={{ textDecoration: "none" }}>
          <MDBox
            key={key}
            onClick={() =>
              startTransition(() => {
                router.push(route);
              })
            }
          >
            <SidenavItem color={color} name={name} active={key === itemName} />
          </MDBox>
          // </Link>
        );
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, collapse, noCollapse, key, href, route }) => {
      let returnValue;

      if (type === "collapse") {
        if (href) {
          returnValue = (
            <MuiLink
              href={href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <SidenavCollapse
                name={name}
                icon={icon}
                active={key === collapseName}
                noCollapse={noCollapse}
              />
            </MuiLink>
          );
        } else if (noCollapse && route) {
          returnValue = (
            // Add onClick
            // <Link href={route} key={key} passHref>
            <MDBox
              key={key}
              sx={{ mb: 3 }}
              onClick={() =>
                startTransition(() => {
                  router.push(route);
                })
              }
            >
              <SidenavCollapse
                name={name}
                icon={icon}
                noCollapse={noCollapse}
                active={key === collapseName}
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            </MDBox>
            // </Link>
          );
        } else {
          returnValue = (
            <MDBox key={key} sx={{ mb: 3 }}>
              <SidenavCollapse
                name={name}
                icon={icon}
                active={key === collapseName}
                open={openCollapse === key}
                onClick={() =>
                  openCollapse === key
                    ? setOpenCollapse(false)
                    : setOpenCollapse(key)
                }
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            </MDBox>
          );
        }
      } else if (type === "title") {
        returnValue = (
          <MDTypography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            sx={{ mx: 2, mb: 3, bgcolor: "#FFFFFF", height: 2, opacity: 1 }}
          />
        );
      }

      return returnValue;
    }
  );

  const managerRoutes = [
    {
      name: "Opportunities",
      key: "opportunities",
      route: "/admin/opportunities",
    },
  ];
  const adminRoutes = [
    {
      name: "Users",
      key: "users",
      route: "/admin/users",
    },
    {
      name: "Opportunities",
      key: "opportunities",
      route: "/admin/opportunities",
    },
  ];

  const renderAdminMenu = (
    <MDBox sx={{ mb: 3 }}>
      <SidenavCollapse
        name={"Admin Panel"}
        icon={<Icon fontSize="medium">admin_panel_settings</Icon>}
        active={"admin" === collapseName}
        open={openCollapse === "admin"}
        onClick={() =>
          openCollapse === "admin"
            ? setOpenCollapse(false)
            : setOpenCollapse("admin")
        }
      >
        {session?.user.role === "admin" ? renderCollapse(adminRoutes) : null}
        {session?.user.role === "manager"
          ? renderCollapse(managerRoutes)
          : null}
      </SidenavCollapse>
    </MDBox>
  );

  return (
    <>
      <EILoader open={isPending} />
      <SidenavRoot
        {...rest}
        variant="permanent"
        ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
      >
        <MDBox pt={3} pb={10} px={4} textAlign="center">
          <MDBox
            display={{ xs: "block", md: "none" }}
            position="absolute"
            top={0}
            right={0}
            p={1.625}
            onClick={closeSidenav}
            sx={{ cursor: "pointer" }}
          >
            <MDTypography variant="h6" color="secondary">
              <Icon sx={{ fontWeight: "bold" }}>close</Icon>
            </MDTypography>
          </MDBox>
          <Link href="/">
            <MDBox display="flex" alignItems="center">
              {brand && brand.src ? (
                <MDBox component="img" src={brand.src} alt={brandName} />
              ) : (
                <MDBox
                  width={!brandName && "100%"}
                  sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
                >
                  <MDTypography
                    component="h6"
                    variant="button"
                    fontWeight="medium"
                    color={textColor}
                  >
                    {brandName}
                  </MDTypography>
                </MDBox>
              )}
            </MDBox>
          </Link>
        </MDBox>
        <List>
          <>
            {renderRoutes}

            {((session && session?.user.role == "admin") ||
              (session && session?.user.role == "manager")) &&
              renderAdminMenu}
          </>
        </List>

        {/* {session && session.user.role == "admin" && (
        <MDBox>
          <Link
            href={"/admin/users"}
            key={"admin-users"}
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              name={"Admin Panel"}
              icon={<Icon fontSize="medium">admin_panel_settings</Icon>}
              noCollapse={true}
            />
          </Link>
        </MDBox>
      )}
      {session && session.user.role == "manager" && (
        <MDBox>
          <Link
            href={"/admin/opportunities"}
            key={"admin-opportunities"}
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              name={"Admin Panel"}
              icon={<Icon fontSize="medium">admin_panel_settings</Icon>}
              noCollapse={true}
            />
          </Link>
        </MDBox>
      )} */}
        <MDBox sx={{ my: 15 }}>
          <MuiLink
            href={"/contact"}
            key={"contact-us"}
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              name={"Contact us"}
              icon={<Icon fontSize="medium">mail_outline</Icon>}
              noCollapse={true}
            />
          </MuiLink>
          <MuiLink
            key={"log-out"}
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
            onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
          >
            <SidenavCollapse
              name={"Log out"}
              icon={<Icon fontSize="medium">logout</Icon>}
              noCollapse={true}
            />
          </MuiLink>
        </MDBox>
      </SidenavRoot>
    </>
  );
}

// Setting default values for the props of Sidenav
// Sidenav.defaultProps = {
//   color: "dark",
//   brand: "",
// };

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  brand: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
