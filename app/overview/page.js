"use client";

import React from "react";
import { useRouter } from "next/navigation";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";
import EIProjectCard from "/components/EIProjectCard";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";

// Images
import booking1 from "/assets/images/projects/project-1-min.png";
import booking2 from "/assets/images/projects/project-2-min.png";
import booking3 from "/assets/images/projects/project-3-min.png";
import booking4 from "/assets/images/projects/project-4-min.png";

import { Card } from "@mui/material";
import colors from "../../assets/theme/base/colors";
import EIChannelsChart from "../../components/EIChannelsChart";
import EIOpportunitiesTable from "../../components/EIOpportunitiesTable";

import Carousel from "react-material-ui-carousel";

// import RandomIcon from "@mui/icons-material/Random";

function Overview() {
  const router = useRouter();

  const opportunities = [
    {
      id: "56748",
      name: "Lorem Ipsum",
      surface: "Lorem Ipsum",
      typology: "Lorem Ipsum",
      status: "Won",
    },
    {
      id: "56748",
      name: "Lorem Ipsum",
      surface: "Lorem Ipsum",
      typology: "Lorem Ipsum",
      status: "Lost",
    },
    {
      id: "56748",
      name: "Lorem Ipsum",
      surface: "Lorem Ipsum",
      typology: "Lorem Ipsum",
      status: "Ongoing",
    },
    {
      id: "56748",
      name: "Lorem Ipsum",
      surface: "Lorem Ipsum",
      typology: "Lorem Ipsum",
      status: "Won",
    },
  ];
  const projects = [
    {
      image: booking1,
      title: "Lorem Ipsum #56879",
      details: {
        Income: "324 000€",
        Coast: "28 000€",
        NOI: "296 000€",
      },
      tags: ["Industrial", "2004", "5400 m2"],
      location: "Barcelona",
      state: "Available",
    },
    {
      image: booking2,
      title: "Lorem Ipsum #56879",
      details: {
        Income: "324 000€",
        Coast: "28 000€",
        NOI: "296 000€",
      },
      tags: ["Industrial", "2004", "5400 m2"],
      location: "Barcelona",
      state: "Available",
    },
    {
      image: booking3,
      title: "Lorem Ipsum #56879",
      details: {
        Income: "324 000€",
        Coast: "28 000€",
        NOI: "296 000€",
      },
      tags: ["Industrial", "2004", "5400 m2"],
      location: "Barcelona",
      state: "Available",
    },
    {
      image: booking4,
      title: "Lorem Ipsum #56879",
      details: {
        Income: "324 000€",
        Coast: "28 000€",
        NOI: "296 000€",
      },
      tags: ["Industrial", "2004", "5400 m2"],
      location: "Barcelona",
      state: "Available",
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={2}>
        <Grid container>
          <Card
            sx={{
              width: "100%",
              paddingX: 3,
              paddingBottom: 3,
              borderRadius: 1.5,
              boxShadow: 2,
            }}
          >
            <MDBox display="flex" justifyContent="space-between">
              <MDBox display="flex">
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="4rem"
                  height="4rem"
                  variant="gradient"
                  sx={{ bgcolor: colors.escharaThemePrimary.main }}
                  color="white"
                  shadow="md"
                  borderRadius="xl"
                  mt={-2}
                >
                  <Icon fontSize="medium" color="inherit">
                    article
                  </Icon>
                </MDBox>
                <MDBox>
                  <MDTypography variant="h5" sx={{ mt: 2, mb: 0, ml: 2 }}>
                    New opportunities
                  </MDTypography>
                  <MDTypography
                    variant="paragraph"
                    sx={{ mt: 0.5, mb: 1, ml: 2, fontSize: "medium" }}
                  >
                    Discover the latest opportunities
                  </MDTypography>
                </MDBox>
              </MDBox>
              <MDBox mt={2} display={{ xs: "none", sm: "block" }}>
                <MDButton
                  disableElevation
                  disableRipple
                  variant="contained"
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
                  onClick={() => router.push("/opportunities/available")}
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
            <MDBox my={3}>
              {/* Mobile */}
              <MDBox display={{ xs: "block", sm: "none" }}>
                <Carousel
                  autoPlay={false}
                  cycleNavigation={true}
                  navButtonsAlwaysVisible={true}
                  indicators={false}
                  animation="slide"
                  duration={300}
                  sx={{
                    "& .MuiIconButton-root": {
                      backgroundColor: "#00000000",
                      color: colors.escharaThemePrimary.main,
                      margin: 0,
                      padding: 0,
                    },
                    "& .MuiIconButton-root:hover": {
                      backgroundColor: "#00000000",
                      color: colors.escharaThemePrimary.main,
                    },
                  }}
                  PrevIcon={
                    <Icon sx={{ ml: "-6px" }}>arrow_back_ios_outlined</Icon>
                  }
                  NextIcon={<Icon sx={{ mr: "-6px" }}>arrow_forward_ios</Icon>}
                >
                  {projects.map((project, i) => (
                    <MDBox key={i} mx={4}>
                      <EIProjectCard
                        image={project.image}
                        title={project.title}
                        details={project.details}
                        tags={project.tags}
                        location={project.location}
                        state={project.state}
                      />
                    </MDBox>
                  ))}
                </Carousel>
              </MDBox>
              {/* Desktop */}
              <Grid container spacing={3} display={{ xs: "none", sm: "flex" }}>
                {projects.map((project, key) => (
                  <Grid key={key} item xs={12} md={6} lg={3}>
                    <MDBox mt={3}>
                      <EIProjectCard
                        image={project.image}
                        title={project.title}
                        details={project.details}
                        tags={project.tags}
                        location={project.location}
                        state={project.state}
                      />
                    </MDBox>
                  </Grid>
                ))}
              </Grid>
            </MDBox>
            <MDBox
              mt={2}
              display={{ xs: "block", sm: "none" }}
              textAlign="center"
            >
              <MDButton
                disableElevation
                disableRipple
                variant="contained"
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
                onClick={() => router.push("/opportunities/available")}
              >
                SEE MORE
              </MDButton>
            </MDBox>
          </Card>
        </Grid>

        {/* ------------------------------------------------------------------------------------ */}

        <MDBox my={5}>
          <Grid container spacing={{ xs: 5, sm: 3 }}>
            <Grid item xs={12} sm={6} lg={5}>
              <Card
                sx={{
                  width: "100%",
                  paddingX: 3,
                  borderRadius: 1.5,
                  boxShadow: 2,
                }}
              >
                <MDBox display="flex" justifyContent="space-between">
                  <MDBox display="flex">
                    <MDBox
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="4rem"
                      height="4rem"
                      variant="gradient"
                      sx={{ bgcolor: colors.escharaThemePrimary.main }}
                      color="white"
                      shadow="md"
                      borderRadius="xl"
                      mt={-2}
                    >
                      <Icon fontSize="medium" color="inherit">
                        pie_chart
                      </Icon>
                    </MDBox>
                    <MDBox>
                      <MDTypography variant="h6" sx={{ mt: 2, ml: 2 }}>
                        Distribution of my investments
                      </MDTypography>
                      <MDTypography
                        variant="paragraph"
                        sx={{ mb: 1, ml: 2, fontSize: "small" }}
                      >
                        Analytics Insights
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </MDBox>
                <EIChannelsChart />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={7}>
              <Card
                sx={{
                  width: "100%",
                  paddingX: 3,
                  paddingBottom: 3,
                  borderRadius: 1.5,
                  boxShadow: 2,
                }}
              >
                <MDBox display="flex" justifyContent="space-between">
                  <MDBox display="flex">
                    <MDBox
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="4rem"
                      height="4rem"
                      variant="gradient"
                      sx={{ bgcolor: colors.escharaThemePrimary.main }}
                      color="white"
                      shadow="md"
                      borderRadius="xl"
                      mt={-2}
                    >
                      <Icon fontSize="medium" color="inherit">
                        view_timeline
                      </Icon>
                    </MDBox>
                    <MDBox>
                      <MDTypography variant="h6" sx={{ mt: 2, ml: 2 }}>
                        Status of my opportunities
                      </MDTypography>
                      <MDTypography
                        variant="paragraph"
                        sx={{ mb: 1, ml: 2, fontSize: "small" }}
                      >
                        Overview table
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox mt={2} display={{ xs: "none", sm: "block" }}>
                    <MDButton
                      disableElevation
                      disableRipple
                      variant="contained"
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
                <EIOpportunitiesTable rows={opportunities} />
              </Card>
            </Grid>
          </Grid>
        </MDBox>

        {/* ------------------------------------------------------------------------------------ */}
      </MDBox>
    </DashboardLayout>
  );
}

export default Overview;
