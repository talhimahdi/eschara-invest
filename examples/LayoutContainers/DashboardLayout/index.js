"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";

// NextJS Material Dashboard 2 PRO context
import { useMaterialUIController, setLayout } from "/context";
import Sidenav from "../../Sidenav";
import MobileNavBar from "@/components/MobileNavBar";

import brand from "/public/images/logo/logo-white.svg";
import routes from "../../../routes";

function DashboardLayout({ children = PropTypes.node.isRequired }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, sidenavColor } = controller;
  const { pathname } = useRouter();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [dispatch, pathname]);

  return (
    <>
      <MDBox
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          p: 3,
          position: "relative",

          [breakpoints.up("xl")]: {
            marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
            transition: transitions.create(["margin-left", "margin-right"], {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.standard,
            }),
          },
        })}
      >
        {children}
      </MDBox>

      <Sidenav
        color={sidenavColor}
        brand={brand}
        brandName="Eschara Invest"
        routes={routes}
        // onMouseEnter={handleOnMouseEnter}
        // onMouseLeave={handleOnMouseLeave}
      />
      <MDBox sx={{ pt: 10 }}>
        <MobileNavBar />
      </MDBox>
    </>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
