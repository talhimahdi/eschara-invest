"use client";

import colors from "../../assets/theme/base/colors";

// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDBadgeDot from "/components/MDBadgeDot";
import PieChart from "/examples/Charts/PieChart";

// Data
import channelChartData from "./data";

// NextJS Material Dashboard 2 PRO contexts
import { useMaterialUIController } from "/context";

function EIChannelsChart() {
  return (
    <Card sx={{ height: "100%", boxShadow: 0 }}>
      <MDBox mt={3}>
        <Grid container alignItems="center">
          <Grid item xs={7}>
            <PieChart chart={channelChartData} height="12.5rem" />
          </Grid>
          <Grid item xs={5}>
            <MDBox pr={1}>
              {channelChartData.labels.map((item, i) => {
                return (
                  <MDBox key={i}>
                    <MDBadgeDot
                      color={
                        colors[channelChartData.datasets.backgroundColors[i]]
                          .main
                      }
                      sx={{
                        "& i": { width: 10, height: 10 },
                        "& .MuiTypography-root": {
                          color:
                            colors[
                              channelChartData.datasets.backgroundColors[i]
                            ].main,
                          lineHeight: "15px",
                        },

                        // backgroundColor: "red",
                        p: "5px",
                      }}
                      badgeContent={item}
                    />
                  </MDBox>
                );
              })}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox
        pt={4}
        pb={2}
        px={2}
        display="flex"
        flexDirection={{ xs: "column" }}
      >
        <MDBox
          width={{ xs: "100%" }}
          textAlign={{ xs: "center", sm: "right" }}
          mt={{ xs: 2, sm: "auto" }}
        >
          <MDBox mt={2}>
            <MDButton
              sx={{
                "&:hover": {
                  backgroundColor: colors.escharaThemeSecondary.main,
                },

                "&:focus:not(:hover)": {
                  backgroundColor: colors.escharaThemeSecondary.main,
                },
                backgroundColor: colors.escharaThemeSecondary.main,
                color: colors.white.main,
                px: 5,
              }}
            >
              SEE MORE
              <Icon
                fontSize="medium"
                color="inherit"
                sx={{
                  ml: 1,
                }}
              >
                east
              </Icon>
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default EIChannelsChart;
