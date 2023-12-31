/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// NextJS Material Dashboard 2 PRO base styles
import colors from "/assets/theme/base/colors";
import borders from "/assets/theme/base/borders";

// NextJS Material Dashboard 2 PRO helper functions
import pxToRem from "/assets/theme/functions/pxToRem";

const { white, primary } = colors;
const { borderRadius } = borders;

const sidenav = {
  styleOverrides: {
    root: {
      width: pxToRem(250),
      whiteSpace: "nowrap",
      border: "none",
    },

    paper: {
      width: pxToRem(250),
      backgroundColor: primary.main,
      height: `calc(100vh)`,
      margin: pxToRem(0),
      borderRadius: 0,
      border: "none",
    },

    paperAnchorDockedLeft: {
      borderRight: "none",
    },
  },
};

export default sidenav;
