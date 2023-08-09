"use client";

import React, { useState } from "react";
import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";
import {
  AppBar,
  Container,
  Grid,
  Icon,
  Tab,
  Tabs,
  TabList,
  Card,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
} from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import colors from "../../../../assets/theme/base/colors";
import MDButton from "../../../../components/MDButton";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";

import project_4_slide from "/assets/images/projects/project-4-slide.png";
import project_4_plan from "/assets/images/projects/project-4-plan.png";

import ImgsViewer from "react-images-viewer";

// Form Component

import NewUser from "./formComponents";

function Project() {
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [tabValue, setTabValue] = useState(0);

  const [imgsViewer, setImgsViewer] = useState(false);
  const [imgsViewerCurrent, setImgsViewerCurrent] = useState(0);
  const [showAcceptForm, setShowAcceptForm] = useState(false);

  const openImgsViewer = () => setImgsViewer(true);
  const closeImgsViewer = () => setImgsViewer(false);
  const imgsViewerNext = () => setImgsViewerCurrent(imgsViewerCurrent + 1);
  const imgsViewerPrev = () => setImgsViewerCurrent(imgsViewerCurrent - 1);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container my={3} gap={2} direction={"column"}>
        <Grid item container direction={"column"} gap={3}>
          <MDBox>
            <MDTypography
              fontWeight="bold"
              textTransform="capitalize"
              variant="h5"
              color={"dark"}
            >
              Lorem Ipsum #56879
            </MDTypography>
          </MDBox>

          <MDBox
            justifyContent={"center"}
            display="flex"
            width={150}
            py={0.3}
            sx={{
              backgroundColor: "#7180AC",
              borderRadius: 1,
            }}
          >
            <MDTypography
              fontWeight="light"
              style={{ color: colors.white.main }}
              sx={{
                fontSize: 12,
              }}
            >
              Available
            </MDTypography>
          </MDBox>

          <MDBox
            sx={{
              gap: 1,
              display: "flex",
              flexWrap: { xs: "wrap", md: "nowrap" },
              maxWidth: "70%",
            }}
          >
            <MDBox
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                px: 3,
                py: 0.3,
                backgroundColor: colors.white.main,
                borderRadius: 1,
                width: 120,
                width: 120,
              }}
            >
              <Icon fontSize={"inherit"}>place</Icon>
              <MDTypography
                fontWeight="light"
                style={{ color: colors.black.main }}
                sx={{
                  fontSize: 12,
                }}
              >
                Madrid
              </MDTypography>
            </MDBox>
            <MDBox
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                px: 3,
                py: 0.3,
                backgroundColor: colors.white.main,
                borderRadius: 1,
                width: 120,
              }}
            >
              <MDTypography
                fontWeight="light"
                style={{ color: colors.black.main }}
                sx={{
                  fontSize: 12,
                }}
              >
                Industrial
              </MDTypography>
            </MDBox>
            <MDBox
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                px: 3,
                py: 0.3,
                backgroundColor: colors.white.main,
                borderRadius: 1,
                width: 120,
              }}
            >
              <MDTypography
                fontWeight="light"
                style={{ color: colors.black.main }}
                sx={{
                  fontSize: 12,
                }}
              >
                2004
              </MDTypography>
            </MDBox>
            <MDBox
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                px: 3,
                py: 0.3,
                backgroundColor: colors.white.main,
                borderRadius: 1,
                width: 120,
              }}
            >
              <MDTypography
                fontWeight="light"
                style={{ color: colors.black.main }}
                sx={{
                  fontSize: 12,
                }}
              >
                5 400 m2
              </MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid
          container
          item
          sx={{
            position: { md: "sticky" },
            top: 20,
            zIndex: 3,
            direction: "row",
            alignItems: "center",
            backgroundColor: colors.escharaThemePrimary.main,
            borderRadius: 1.5,
            boxShadow: 2,
            p: { xs: 1, md: 2 },
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              "& .MuiTabs-root": {
                padding: 0,
                borderRadius: 1,
              },
              "& .MuiTabs-indicator": {
                borderRadius: 1,
                boxShadow: 0,
              },
            }}
          >
            <Tabs
              orientation={"horizontal"}
              value={tabValue}
              onChange={handleSetTabValue}
              TabIndicatorProps={{
                sx: { display: { xs: "none", md: "block" } },
                style: {
                  backgroundColor: "#434461",
                },
              }}
              sx={{
                backgroundColor: "inherit",
                "& .MuiTabs-flexContainer": {
                  flexWrap: "wrap",
                },

                "& .MuiTabs-root": {
                  padding: 0,
                  height: 100,
                },
                "& .MuiTab-textColorPrimary": {
                  color: "white!important",
                },
                "& .Mui-selected": {
                  color: "white",
                  backgroundColor: "#434461",
                },

                /* Left button */
                "& .css-hn784z:hover button": {
                  backgroundColor: "#53dc17",
                },
                "& .css-hn784z": {
                  margin: 0,
                  padding: 0,
                  backgroundColor: "#53dc17",
                },
                /* Right button */
                "& .css-1abc02a": {
                  margin: 0,
                  padding: 0,
                  color: "#FF0000",
                },
              }}
            >
              <Tab
                label="Description"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  py: 1.5,
                  fontSize: { xs: 12, md: 16 },
                }}
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    help_outline
                  </Icon>
                }
              />
              <Tab
                label="Analysis"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  py: 1.5,
                  fontSize: { xs: 12, md: 16 },
                }}
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    bar_chart
                  </Icon>
                }
              />
              <Tab
                label={"Financial parameters"}
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: { xs: "column", md: "row" },
                  py: 1.5,
                  fontSize: { xs: 12, md: 16 },
                }}
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    currency_exchange_outlined
                  </Icon>
                }
              />
              <Tab
                label={"Finance"}
                sx={{
                  display: { xs: "flex", md: "none" },
                  flexDirection: { xs: "column", md: "row" },
                  py: 1.5,
                  fontSize: { xs: 12, md: 16 },
                }}
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    currency_exchange_outlined
                  </Icon>
                }
              />
              <Tab
                label="Documents"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  p: 0,
                  py: 1.5,
                  fontSize: { xs: 12, md: 16 },
                }}
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    article_outlined
                  </Icon>
                }
              />
            </Tabs>
          </Grid>
          <Grid
            container
            item
            xs={0}
            md={4}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
            }}
          >
            <MDButton
              onClick={setShowAcceptForm}
              variant="contained"
              sx={{
                px: 10,
                color: colors.white.main,
                backgroundColor: colors.escharaThemeSecondary.main,
                borderRadius: 1,

                "&:hover": {
                  backgroundColor: colors.escharaThemeSecondary.main,
                },
                "&:focus:not(:hover)": {
                  backgroundColor: colors.escharaThemeSecondary.main,
                  boxShadow: "none",
                },
              }}
            >
              ACCEPT
            </MDButton>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }} sx={{ mb: 10 }}>
            <Card
              sx={{
                paddingX: 3,
                paddingY: 3,
                borderRadius: 1,
                boxShadow: 2,
              }}
            >
              <MDTypography
                fontWeight="bold"
                textTransform="capitalize"
                variant="h6"
                color={"dark"}
              >
                Property description
              </MDTypography>
              <MDBox>
                <TableContainer sx={{ boxShadow: 0 }}>
                  <Table
                    sx={{
                      mt: 3,
                      "& .MuiTableCell-root": {
                        px: 0,
                        fontSize: 15,
                      },
                    }}
                  >
                    <TableHead sx={{ padding: 0, fontWeight: 500 }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 500 }}>Active</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left">Adress</TableCell>
                        <TableCell align="right">XXX</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">Typology</TableCell>
                        <TableCell align="right">XXX</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          Total Lettable Area (m2)
                        </TableCell>
                        <TableCell align="right">XXX</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          Lettable area (office) (m2)
                        </TableCell>
                        <TableCell align="right">XXX</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          Lettable surface (warehouse) (m2)
                        </TableCell>
                        <TableCell align="right">XXX</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">Land</TableCell>
                        <TableCell align="right">XXX</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">Parking spaces</TableCell>
                        <TableCell align="right">XXX</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">Construction year</TableCell>
                        <TableCell align="right">XXX</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">Occupation</TableCell>
                        <TableCell align="right">100%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TableContainer sx={{ boxShadow: 0 }}>
                  <Table
                    sx={{
                      mt: 3,
                      "& .MuiTableCell-root": {
                        px: 0,
                        fontSize: 15,
                      },
                    }}
                  >
                    <TableHead sx={{ padding: 0, fontWeight: 500 }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 500 }}>Contract</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left">Income</TableCell>
                        <TableCell align="right">324 000 €</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">Expenses</TableCell>
                        <TableCell align="right">28 000 €</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">NOI</TableCell>
                        <TableCell align="right">296 000 €</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">Rent / m2 / month</TableCell>
                        <TableCell align="right">5.0 €</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          Market rent / m2 / month
                        </TableCell>
                        <TableCell align="right">6.0 €</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          Income vs. Market Income
                        </TableCell>
                        <TableCell align="right">-17%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">End of contract</TableCell>
                        <TableCell align="right">Jan-21</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">Next break</TableCell>
                        <TableCell align="right">Jan-26</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          Expiration of the contract
                        </TableCell>
                        <TableCell align="right">Jan-36</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">Contract structure</TableCell>
                        <TableCell align="right">5+5+5</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </MDBox>
            </Card>
          </Grid>
          <MDBox
            sx={{
              position: "fixed",
              width: "100vw",
              zIndex: 10,
              bottom: 110,
              display: { xs: "flex", md: "none" },
              // alignItems: "center",
              justifyContent: "center",
              // justifyItems: "center",
            }}
          >
            <MDButton
              onClick={setShowAcceptForm}
              variant="contained"
              sx={{
                px: 10,
                color: colors.white.main,
                backgroundColor: colors.escharaThemeSecondary.main,
                borderRadius: 1,

                "&:hover": {
                  backgroundColor: colors.escharaThemeSecondary.main,
                },
                "&:focus:not(:hover)": {
                  backgroundColor: colors.escharaThemeSecondary.main,
                  boxShadow: "none",
                },
              }}
            >
              ACCEPT
            </MDButton>
          </MDBox>
          <Grid
            order={{ xs: 1, md: 2 }}
            item
            container
            direction={"column"}
            wrap="nowrap"
            xs={12}
            md={5}
            gap={3}
          >
            {/* <Card
              sx={{
                borderRadius: 1,
                boxShadow: 2,
                m: 0,
                p: 0,
              }}
            > */}
            <MDBox
            // sx={{ backgroundColor: "red" }}
            >
              <MDBox
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  right: 40,
                  marginTop: "14px",
                  fontSize: 30,
                  width: 30,
                  height: 30,
                  padding: 0,
                  alignItems: "center",
                  justifyItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  cursor: "pointer",
                }}
                onClick={openImgsViewer}
              >
                <Icon sx={{ color: "#FFFFFF" }}>zoom_out_map</Icon>
              </MDBox>
              <Carousel
                autoPlay={false}
                cycleNavigation={true}
                navButtonsAlwaysVisible={true}
                indicators={true}
                animation="slide"
                duration={300}
                sx={{
                  "& .MuiIconButton-root": {
                    backgroundColor: "#00000000",
                    //   color: colors.escharaThemePrimary.main,

                    padding: 0,
                    marginLeft: 3,
                    marginRight: 3,
                    // zIndex: 0,
                  },
                  "& .MuiIconButton-root:hover": {
                    backgroundColor: "#00000000",
                    //   color: colors.escharaThemePrimary.main,
                  },
                }}
                indicatorIconButtonProps={{
                  style: {
                    width: 14,
                    height: 14,
                    padding: 0,
                    margin: 3,
                    color: "transparent",
                    border: "2px solid white",
                    zIndex: 2,
                  },
                }}
                activeIndicatorIconButtonProps={{
                  style: {
                    padding: 0,
                    color: "white",
                    //   border: "2px solid white",
                  },
                }}
                indicatorContainerProps={{
                  style: {
                    position: "absolute",
                    // zIndex: 1,
                    bottom: 20, // 5
                    textAlign: "center", // 4
                  },
                }}
                IndicatorIcon={
                  <Icon
                  // sx={{ padding: 0, margin: 0, width: 24, height: 24 }}
                  >
                    fiber_manual_record
                  </Icon>
                }
                PrevIcon={<Icon>arrow_back_ios_outlined</Icon>}
                NextIcon={<Icon>arrow_forward_ios</Icon>}
              >
                <MDBox>
                  <Image
                    src={project_4_slide}
                    alt={"title"}
                    quality={100}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </MDBox>
                <MDBox>
                  <Image
                    src={project_4_slide}
                    alt={"title"}
                    quality={100}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </MDBox>
                <MDBox>
                  <Image
                    src={project_4_slide}
                    alt={"title"}
                    quality={100}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </MDBox>
              </Carousel>
            </MDBox>
            {/* </Card> */}
            <Card
              sx={{
                borderRadius: 1,
                boxShadow: 2,
                m: 0,
                p: 0,
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d103040.25336554971!2d-85.29056378999537!3d36.19068927799675!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDQzJzA5LjQiTiA4NMKwMjAnMDAuNyJX!5e0!3m2!1sfr!2sma!4v1690326991064!5m2!1sfr!2sma"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Card>
            {/* <Card
              sx={{
                backgroundColor: "yellow",
                borderRadius: 1,
                boxShadow: 2,
                margin: 0,
                padding: 0,
              }}
            > */}
            <MDBox
              sx={{
                // backgroundColor: "red",
                margin: 0,
                padding: 0,
              }}
            >
              <Image
                src={project_4_plan}
                alt={"title"}
                quality={100}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </MDBox>
            {/* </Card> */}
          </Grid>
        </Grid>
      </Grid>
      <MDBox>
        <ImgsViewer
          imgs={[
            { src: project_4_slide.src },
            { src: project_4_slide.src },
            { src: project_4_slide.src },
            { src: project_4_slide.src },
            { src: project_4_slide.src },
          ]}
          animation="slide"
          isOpen={imgsViewer}
          onClose={closeImgsViewer}
          currImg={imgsViewerCurrent}
          onClickPrev={imgsViewerPrev}
          onClickNext={imgsViewerNext}
          backdropCloseable
        />
      </MDBox>
      <MDBox>
        <NewUser isOpen={showAcceptForm} setIsOpen={setShowAcceptForm} />
      </MDBox>
    </DashboardLayout>
  );
}
export default Project;
