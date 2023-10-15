"use client";

import React, { useEffect, useState, useTransition } from "react";
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
  Typography,
} from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import colors from "../../../../assets/theme/base/colors";
import MDButton from "../../../../components/MDButton";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";

import ImgsViewer from "react-images-viewer";

import getOpportunityById from "@/admin/opportunities/serverActions/getOpportunityByIdForInvestor";
import { useRouter } from "next/navigation";
import EILoader from "../../../../components/EILoader";
import Link from "next/link";

function Project({ params }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const opportunityId = parseInt(Number(params.project));

  if (opportunityId != params.project) {
    router.push("/overview");
  }
  const [opportunityData, setOpportunityData] = useState({});
  useEffect(() => {
    async function getOpportunityData() {
      const opportunityData = await getOpportunityById(opportunityId);

      if (opportunityData.status && opportunityData.opportunity) {
        setOpportunityData(opportunityData.opportunity);
      } else {
        router.push("/overview");
      }
    }
    startTransition(async () => {
      getOpportunityData();
    });
  }, []);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [tabValue, setTabValue] = useState(0);

  const [imgsViewer, setImgsViewer] = useState(false);
  const [imgsViewerCurrent, setImgsViewerCurrent] = useState(0);

  const openImgsViewer = () => setImgsViewer(true);
  const closeImgsViewer = () => setImgsViewer(false);
  const imgsViewerNext = () => setImgsViewerCurrent(imgsViewerCurrent + 1);
  const imgsViewerPrev = () => setImgsViewerCurrent(imgsViewerCurrent - 1);

  function scrollTo(hash) {
    // location.hash = "#" + hash;
    // document.getElementById(hash).scrollIntoView();

    const yOffset = -130;
    const element = document.getElementById(hash);
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }

  const renderStatus = (status) => {
    if (status) {
      const statusColor = Object.keys(colors.escharaThemeStatusColors).find(
        (color) => color === status.toLowerCase()
      );

      return (
        <MDBox
          key={status}
          justifyContent={"center"}
          display="flex"
          width={150}
          py={0.3}
          sx={{
            backgroundColor: colors.escharaThemeStatusColors[statusColor],
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
            {status ? status : ""}
          </MDTypography>
        </MDBox>
      );
    }
  };

  const renderTag = (tag) => {
    if (tag) {
      return (
        <MDBox
          key={tag}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            px: 3,
            py: 0.3,
            backgroundColor: colors.white.main,
            borderRadius: 1,
            // width: 120,
            // width: 120,
          }}
        >
          {/* <Icon fontSize={"inherit"}>place</Icon> */}
          <MDTypography
            fontWeight="light"
            style={{ color: colors.black.main }}
            sx={{
              fontSize: 12,
            }}
          >
            {tag}
          </MDTypography>
        </MDBox>
      );
    }
  };

  if (opportunityData.title) {
    return (
      <DashboardLayout>
        <DashboardNavbar pageTitle={opportunityData.title} />
        <EILoader open={isPending} />
        {!isPending && (
          <>
            <Grid container my={3} gap={2} direction={"column"}>
              <Grid item container direction={"column"} gap={3}>
                <MDBox>
                  <MDTypography
                    fontWeight="bold"
                    textTransform="capitalize"
                    variant="h5"
                    color={"dark"}
                  >
                    {/* Lorem Ipsum #56879 */}
                    {opportunityData.title ? opportunityData.title : ""}
                  </MDTypography>
                  <MDTypography
                    variant="h5"
                    fontWeight="regular"
                    color="secondary"
                    mt={1}
                  >
                    {opportunityData.id ? "#" + opportunityData.id : ""}
                  </MDTypography>
                </MDBox>

                <MDBox>{renderStatus(opportunityData.status)}</MDBox>

                <MDBox
                  sx={{
                    gap: 1,
                    display: "flex",
                    flexWrap: { xs: "wrap", md: "nowrap" },
                    // maxWidth: "70%",
                  }}
                >
                  {opportunityData.tags?.map((tag) => renderTag(tag))}
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
                  md={4}
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
                      width: "fit-content",
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
                        px: 3,
                        fontSize: { xs: 12, md: 16 },
                      }}
                      icon={
                        <Icon fontSize="small" sx={{ mt: -0.25 }}>
                          help_outline
                        </Icon>
                      }
                      onClick={() => scrollTo("__description_block")}
                    />

                    <Tab
                      label="Documents"
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        py: 1.5,
                        px: 3,
                        fontSize: { xs: 12, md: 16 },
                      }}
                      icon={
                        <Icon fontSize="small" sx={{ mt: -0.25 }}>
                          article_outlined
                        </Icon>
                      }
                      onClick={() => scrollTo("__documents_block")}
                    />
                  </Tabs>
                </Grid>
                <Grid
                  container
                  item
                  // xs={0}
                  // md={8}
                  sx={{
                    display: { xs: "flex", md: "none" },
                    pt: 2,
                  }}
                >
                  <MDBox
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      py: 1.5,
                      px: 3,
                      fontSize: { xs: 12, md: 16 },
                      color: "#ffffff",
                    }}
                  >
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      calendar_month
                    </Icon>
                    Expiration date : {opportunityData.expiration_date}
                  </MDBox>
                  <MDBox
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      py: 1.5,
                      px: 3,
                      fontSize: { xs: 12, md: 16 },
                      color: "#ffffff",
                    }}
                  >
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      euro
                    </Icon>
                    {opportunityData.total_value
                      ? (opportunityData.total_value / 10).toFixed(2)
                      : ""}
                  </MDBox>
                </Grid>
                <Grid
                  container
                  item
                  xs={0}
                  md={8}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "end",
                  }}
                >
                  <MDBox
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      py: 1.5,
                      px: 3,
                      fontSize: { xs: 12, md: 16 },
                      color: "#ffffff",
                    }}
                  >
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      calendar_month
                    </Icon>
                    Expiration date : {opportunityData.expiration_date}
                  </MDBox>
                  <MDBox
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      py: 1.5,
                      px: 3,
                      fontSize: { xs: 12, md: 16 },
                      color: "#ffffff",
                    }}
                  >
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      euro
                    </Icon>
                    {opportunityData.total_value
                      ? (opportunityData.total_value / 10).toFixed(2)
                      : ""}
                  </MDBox>
                </Grid>
              </Grid>
              <Grid item container spacing={2}>
                <Grid
                  item
                  xs={12}
                  md={7}
                  order={{ xs: 2, md: 1 }}
                  sx={{ mb: 10 }}
                >
                  <Card
                    sx={{
                      paddingX: 3,
                      paddingY: 3,
                      borderRadius: 1,
                      boxShadow: 2,
                    }}
                  >
                    <MDBox id="__description_block" sx={{ mb: 3 }}>
                      <MDBox mb={5}>
                        <MDTypography
                          mb={2}
                          fontWeight="bold"
                          textTransform="capitalize"
                          variant="h6"
                          color={"dark"}
                        >
                          Description
                        </MDTypography>
                        <MDTypography
                          sx={{
                            fontSize: 13,
                          }}
                        >
                          {opportunityData.description
                            ? opportunityData.description
                            : ""}
                        </MDTypography>
                      </MDBox>
                      <MDTypography
                        fontWeight="bold"
                        textTransform="capitalize"
                        variant="h6"
                        color={"dark"}
                      >
                        Property description
                      </MDTypography>
                      <TableContainer sx={{ boxShadow: 0 }}>
                        <Table
                          sx={{
                            mt: 3,
                            "& .MuiTableCell-root": {
                              px: 0,
                              // fontSize: 15,
                            },
                          }}
                        >
                          <TableBody>
                            {opportunityData.property_description?.map(
                              (property, index) => (
                                <TableRow
                                  key={index + property.key}
                                  sx={{
                                    verticalAlign: "text-top",
                                  }}
                                >
                                  <TableCell
                                    sx={{
                                      borderRight: 1,
                                      borderRightColor: colors.grey[300],
                                    }}
                                  >
                                    <MDBox
                                      sx={{
                                        fontSize: 14,
                                        px: 2,
                                      }}
                                    >
                                      {property.key}
                                    </MDBox>
                                  </TableCell>
                                  <TableCell>
                                    <MDBox
                                      sx={{
                                        fontSize: 12,
                                        px: 2,
                                      }}
                                    >
                                      {property.value}
                                    </MDBox>
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </MDBox>
                    <MDBox id="__documents_block">
                      <MDTypography
                        fontWeight="bold"
                        textTransform="capitalize"
                        variant="h6"
                        color={"dark"}
                      >
                        Documents
                      </MDTypography>
                      <MDBox sx={{ mt: 2 }}>
                        {opportunityData.documents?.length ? (
                          opportunityData.documents?.map((file, index) => (
                            <Link href={file.url} key={index}>
                              <MDBox
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  pb: 1,
                                }}
                              >
                                <Icon fontSize="small">description</Icon>
                                <MDTypography
                                  sx={{ fontSize: { xs: 12, md: 15 } }}
                                >
                                  {file.name}
                                </MDTypography>
                                <MDTypography sx={{ fontSize: { xs: 12 } }}>
                                  {file.size} MB
                                </MDTypography>
                              </MDBox>
                            </Link>
                          ))
                        ) : (
                          <MDBox>
                            <MDTypography
                              fontWeight="bold"
                              fontSize={13}
                              textTransform="capitalize"
                            >
                              No file uploaded
                            </MDTypography>
                          </MDBox>
                        )}
                      </MDBox>
                    </MDBox>
                  </Card>
                </Grid>

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
                  <MDBox>
                    {opportunityData.gallery?.length ? (
                      <MDBox>
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
                          {opportunityData.gallery?.map((imageUrl, index) => (
                            <MDBox key={index} height={400}>
                              <MDBox
                                color="white"
                                textAlign="center"
                                sx={{
                                  backgroundImage: `url(${imageUrl})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                  width: "100%",
                                  height: "100%",
                                }}
                              ></MDBox>
                            </MDBox>
                          ))}
                        </Carousel>
                      </MDBox>
                    ) : (
                      <Card>
                        <MDBox p={2}>
                          <MDTypography
                            fontWeight="bold"
                            textTransform="capitalize"
                            variant="h6"
                            color="dark"
                            textAlign="center"
                          >
                            No image in the gallery
                          </MDTypography>
                        </MDBox>
                      </Card>
                    )}
                  </MDBox>

                  <Card
                    sx={{
                      borderRadius: 1,
                      boxShadow: 2,
                      m: 0,
                      p: 0,
                    }}
                  >
                    {/* <iframe
                      width="600"
                      height="500"
                      id="gmap_canvas"
                      src="https://maps.google.com/maps?q=chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                    ></iframe> */}
                    <iframe
                      src={
                        "https://maps.google.com/maps?q=" +
                        opportunityData.google_map +
                        "&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      }
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <MDBox>
              <ImgsViewer
                imgs={[
                  ...opportunityData.gallery?.map((imageUrl) => ({
                    src: imageUrl,
                  })),
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
          </>
        )}
      </DashboardLayout>
    );
  } else {
    return <EILoader open={isPending} />;
  }
}
export default Project;
