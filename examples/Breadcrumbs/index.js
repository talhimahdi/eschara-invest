"use client";

import Link from "next/link";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

function Breadcrumbs({ icon, title, route, light = false }) {
  const routes = route?.slice(0, -1);

  return (
    <MDBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) =>
              light ? white.main : grey[600],
          },
        }}
      >
        <Link href="/">
          <MDTypography
            component="span"
            variant="body2"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </MDTypography>
        </Link>
        {routes?.map((el, index) => {
          let link = "";
          routes.map((el2, index2) => {
            if (index >= index2) {
              link = link + "/" + el2;
            }
          });

          return (
            <Link href={`${link}`} key={el}>
              <MDTypography
                component="span"
                variant="button"
                fontWeight="regular"
                textTransform="capitalize"
                color={light ? "white" : "dark"}
                opacity={light ? 0.8 : 0.5}
                sx={{ lineHeight: 0 }}
              >
                {el}
              </MDTypography>
            </Link>
          );
        })}
        {/* <MDTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          // sx={{ lineHeight: 0 }}
        >
          {title.replace("-", " ")}
        </MDTypography> */}
        <MDTypography
          component="span"
          variant="button"
          // fontWeight="regular"
          // textTransform="capitalize"
          // color={light ? "white" : "dark"}
          // opacity={light ? 0.8 : 0.5}
          // sx={{ lineHeight: 0 }}
          noWrap
          fontWeight="medium"
          textTransform="capitalize"
          color={"dark"}
          opacity={0.8}
          sx={{
            display: "block",
            width: 250,
          }}
        >
          {title.replace("-", " ")}
        </MDTypography>
      </MuiBreadcrumbs>
    </MDBox>
  );
}

// Setting default values for the props of Breadcrumbs
// Breadcrumbs.defaultProps = {
//   light: false,
// };

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
