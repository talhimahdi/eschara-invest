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

import ImgsViewer from "react-images-viewer";

import getOpportunityById from "@/admin/opportunities/serverActions/getOpportunityByIdForInvestor";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import EILoader from "../../../../components/EILoader";
import Link from "next/link";
import PopupForm from "./popupForm";
import opportunityAccepted from "@/admin/opportunities/serverActions/opportunityAccepted";
import EIOpportunitySlider from "../../../../components/EIOpportunitySlider";
import PopupSecondRoundForm from "./popupSecondRoundForm";
import opportunitySecondRoundAccepted from "@/admin/opportunities/serverActions/opportunitySecondRoundAccepted";

function Project({ params }) {
  const router = useRouter();
  const session = useSession();

  const [isPending, startTransition] = useTransition();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const opportunityId = parseInt(Number(params.project));

  if (opportunityId != params.project) {
    router.push("/opportunities/all");
  }
  const [opportunityData, setOpportunityData] = useState({});

  const getOpportunityData = async () => {
    const opportunityData = await getOpportunityById(opportunityId);

    if (opportunityData?.status && opportunityData?.opportunity) {
      if (
        opportunityData.opportunity.status?.name.toLowerCase() != "available" &&
        opportunityData.opportunity.current_round != 2
      ) {
        router.push("/opportunities/all");
      } else {
        setOpportunityData(opportunityData.opportunity);
      }
    } else {
      router.push("/opportunities/all");
    }
  }
  useEffect(() => {
    startTransition(async () => {
      await getOpportunityData();
    });
  }, []);

  const [imgsViewer, setImgsViewer] = useState(false);
  const [imgsViewerCurrent, setImgsViewerCurrent] = useState(0);
  const [showAcceptForm, setShowAcceptForm] = useState(false);
  const [showSecondRoundAcceptForm, setShowSecondRoundAcceptForm] = useState(false);

  const openImgsViewer = () => setImgsViewer(true);
  const closeImgsViewer = () => setImgsViewer(false);
  const imgsViewerNext = () => setImgsViewerCurrent(imgsViewerCurrent + 1);
  const imgsViewerPrev = () => setImgsViewerCurrent(imgsViewerCurrent - 1);

  const renderStatus = (status) => {
    if (status) {
      return (
        <MDBox
          key={status}
          justifyContent={"center"}
          display="flex"
          width={150}
          py={0.3}
          sx={{
            backgroundColor: status?.color,
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
            {status?.name ? status?.name : ""}
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
          }}
        >
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

  const onRefrech = async () => {
    startTransition(async () => {
      await getOpportunityData();
    });
  }

  const onSubmit = async (data) => {
    setIsSubmiting(true);
    const response = await opportunityAccepted(data);
    setIsSubmiting(false);
    if (response.status && response.message) {
      return true;

    } else {
      router.push("/opportunities/all");
    }
  };

  const onSecondRoundSubmit = async (data) => {
    setIsSubmiting(true);
    const response = await opportunitySecondRoundAccepted(data);
    setIsSubmiting(false);
    if (response.status && response.message) {
      return true;

    } else {
      router.push("/opportunities/all");
    }
  };

  if (opportunityData.title) {
    return (
      <DashboardLayout>
        <DashboardNavbar pageTitle={opportunityData.title} />
        <EILoader open={isPending || isSubmiting} />
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
                  container
                  item
                  sx={{
                    display: { xs: "flex", md: "none" },
                    flexDirection: "column",
                    alignItems: "start",
                    alignContent: "start",
                    p: 1,
                    gap: 2,
                  }}
                >
                  <MDBox
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      // py: 1.5,
                      fontSize: { xs: 12, md: 16 },
                      color: "#ffffff",
                    }}
                  >
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      calendar_month
                    </Icon>
                    Expiration date : {opportunityData.expiration_date}
                  </MDBox>

                  {opportunityData.total_value ? (
                    <MDBox
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        // py: 1.5,
                        fontSize: { xs: 12, md: 16 },
                        color: "#ffffff",
                      }}
                    >
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        euro
                      </Icon>
                      Total value : {opportunityData.total_value}
                    </MDBox>
                  ) : (
                    ""
                  )}

                  {opportunityData.equity_commitment ? (
                    <MDBox
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        // py: 1.5,
                        fontSize: { xs: 12, md: 16 },
                        color: "#ffffff",
                      }}
                    >
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        group_add
                      </Icon>
                      Equity commitment : {opportunityData.equity_commitment}
                    </MDBox>
                  ) : (
                    ""
                  )}

                  {/* {opportunityData.investor_parts ? (
                    <MDBox
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        // py: 1.5,
                        fontSize: { xs: 12, md: 16 },
                        color: "#ffffff",
                      }}
                    >
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        account_balance_wallet
                      </Icon>
                      Parts : {opportunityData.investor_parts}
                    </MDBox>
                  ) : (
                    ""
                  )} */}
                  <MDBox
                    sx={{
                      alignItems: "center",
                      mt: 2,
                      py: 1,
                      px: 2,
                      color: colors.escharaThemePrimary.main + " !important",
                      backgroundColor: colors.white.main,
                      borderRadius: 1,
                      fontSize: 14,
                      fontWeight: "bold",

                      "&:hover": {
                        backgroundColor: colors.white.main,
                      },
                      "&:focus:not(:hover)": {
                        backgroundColor: colors.white.main,
                        boxShadow: "none",
                      },
                    }}
                  >
                    <a
                      href={"mailto:" + opportunityData.manager_email}
                      target="_blank"
                      style={{ color: "inherit" }}
                    >
                      Contact manager
                    </a>
                  </MDBox>
                </Grid>
                <Grid
                  container
                  item
                  xs={0}
                  md={12}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <MDBox sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 3,
                  }}>
                    <MDBox
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontSize: { xs: 12, md: 13 },
                        color: "#ffffff",
                      }}
                    >
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        calendar_month
                      </Icon>
                      Expiration date : {opportunityData.expiration_date}
                    </MDBox>

                    {opportunityData.total_value ? (
                      <MDBox
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontSize: { xs: 12, md: 13 },
                          color: "#ffffff",
                        }}
                      >
                        <Icon fontSize="small" sx={{ mt: -0.25 }}>
                          euro
                        </Icon>
                        Total value : {opportunityData.total_value}
                      </MDBox>
                    ) : (
                      ""
                    )}

                    {opportunityData.equity_commitment ? (
                      <MDBox sx={{ display: "flex", gap: 1 }}>
                        <MDBox
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,


                            fontSize: { xs: 12, md: 13 },
                            color: "#ffffff",
                          }}
                        >
                          <Icon fontSize="small" sx={{ mt: -0.25 }}>
                            group_add
                          </Icon>
                          Equity commitment : {opportunityData.equity_commitment}
                        </MDBox>
                        {/* {opportunityData.investor_parts ? (
                          <MDBox
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,


                              fontSize: { xs: 12, md: 13 },
                              color: "#ffffff",
                            }}
                          >
                            <Icon fontSize="small" sx={{ mt: -0.25 }}>
                              account_balance_wallet
                            </Icon>
                            Parts : {opportunityData.investor_parts}
                          </MDBox>
                        ) : (
                          ""
                        )} */}
                      </MDBox>
                    ) : (
                      ""
                    )}

                  </MDBox>

                  <MDBox>
                    {opportunityData.expired ? (
                      <MDBox
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            px: 2,
                            borderRadius: 1,
                            fontSize: { xs: 12, md: 14 },
                            fontWeight: "bold",
                            color: "#fa2f2f",
                            backgroundColor: "#ffffff",
                          }}
                        >
                          Expired
                        </Typography>
                      </MDBox>
                    ) : (
                      <MDBox sx={{ display: "flex", gap: 2 }}>

                        {(opportunityData?.current_round == 2 && opportunityData.already_invested) ?
                          (
                            <MDButton
                              onClick={setShowSecondRoundAcceptForm}
                              disabled={parseFloat(opportunityData?.remaining_amount.replace(/,/g, '')) == 0}
                              variant="contained"
                              sx={{
                                color: colors.white.main,
                                backgroundColor: opportunityData.status.color,
                                borderRadius: 1,

                                "&:hover": {
                                  backgroundColor: opportunityData.status.color,
                                },
                                "&:focus:not(:hover)": {
                                  backgroundColor: opportunityData.status.color,
                                  boxShadow: "none",
                                },
                              }}
                            >
                              Invest more
                            </MDButton>
                          )
                          :
                          (
                            <MDButton
                              onClick={setShowAcceptForm}
                              variant="contained"
                              sx={{
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
                          )
                        }


                        <MDBox
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            py: 1,
                            px: 2,
                            color:
                              colors.escharaThemePrimary.main + " !important",
                            backgroundColor: colors.white.main,
                            borderRadius: 1,
                            fontSize: 14,
                            fontWeight: "bold",

                            "&:hover": {
                              backgroundColor: colors.white.main,
                            },
                            "&:focus:not(:hover)": {
                              backgroundColor: colors.white.main,
                              boxShadow: "none",
                            },
                          }}
                        >
                          <a
                            href={"mailto:" + opportunityData.manager_email}
                            target="_blank"
                            style={{ color: "inherit" }}
                          >
                            Contact manager
                          </a>
                        </MDBox>
                      </MDBox>
                    )}
                  </MDBox>
                </Grid>
              </Grid>
              <Grid
                container
                item
                sx={{
                  position: { md: "sticky" },
                  top: 80,
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
                  container
                  item
                  sx={{
                    display: { xs: "flex", md: "none" },
                    flexDirection: "column",
                    alignItems: "start",
                    alignContent: "start",
                    p: 1,
                    gap: 2,
                  }}
                >
                  <MDBox sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 3,
                  }}>
                    <MDBox
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontSize: { xs: 12, md: 13 },
                        color: "#ffffff",
                      }}
                    >
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        euro
                      </Icon>
                      Remaining amount : {opportunityData.remaining_amount}
                    </MDBox>

                    {opportunityData.total_value ? (
                      <MDBox
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontSize: { xs: 12, md: 13 },
                          color: "#ffffff",
                        }}
                      >
                        <Icon fontSize="small" sx={{ mt: -0.25 }}>
                          person_pin
                        </Icon>
                        Number of seats : {opportunityData.seats_number}
                      </MDBox>
                    ) : (
                      ""
                    )}

                    {opportunityData.equity_commitment ? (
                      <MDBox sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <MDBox
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,


                            fontSize: { xs: 12, md: 13 },
                            color: "#ffffff",
                          }}
                        >
                          <Icon fontSize="small" sx={{ mt: -0.25 }}>
                            euro
                          </Icon>
                          Invested amount : {opportunityData.invested_amount}
                        </MDBox>
                        {opportunityData.investor_parts ? (
                          <MDBox
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,


                              fontSize: { xs: 12, md: 13 },
                              color: "#ffffff",
                            }}
                          >
                            <Icon fontSize="small" sx={{ mt: -0.25 }}>
                              person_pin
                            </Icon>
                            Occupied seats : {opportunityData.occupied_seats}
                          </MDBox>
                        ) : (
                          ""
                        )}
                      </MDBox>
                    ) : (
                      ""
                    )}

                  </MDBox>

                </Grid>
                <Grid
                  container
                  item
                  xs={0}
                  md={12}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <MDBox sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 3,
                  }}>
                    <MDBox
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontSize: { xs: 12, md: 13 },
                        color: "#ffffff",
                      }}
                    >
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        euro
                      </Icon>
                      Remaining amount : {opportunityData.remaining_amount}
                    </MDBox>

                    {opportunityData.total_value ? (
                      <MDBox
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontSize: { xs: 12, md: 13 },
                          color: "#ffffff",
                        }}
                      >
                        <Icon fontSize="small" sx={{ mt: -0.25 }}>
                          person_pin
                        </Icon>
                        Number of seats : {opportunityData.seats_number}
                      </MDBox>
                    ) : (
                      ""
                    )}

                    {opportunityData.equity_commitment ? (
                      <MDBox sx={{ display: "flex", gap: 1 }}>
                        <MDBox
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,


                            fontSize: { xs: 12, md: 13 },
                            color: "#ffffff",
                          }}
                        >
                          <Icon fontSize="small" sx={{ mt: -0.25 }}>
                            euro
                          </Icon>
                          Invested amount : {opportunityData.invested_amount}
                        </MDBox>
                        {opportunityData.investor_parts ? (
                          <MDBox
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              fontSize: { xs: 12, md: 13 },
                              color: "#ffffff",
                            }}
                          >
                            <Icon fontSize="small" sx={{ mt: -0.25 }}>
                              person_pin
                            </Icon>
                            Occupied seats : {opportunityData.occupied_seats}
                          </MDBox>
                        ) : (
                          ""
                        )}
                      </MDBox>
                    ) : (
                      ""
                    )}

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
                      <MDBox mb={5}>
                        <MDTypography
                          fontWeight="bold"
                          textTransform="capitalize"
                          variant="h6"
                          color={"dark"}
                        >
                          Specifications
                        </MDTypography>
                        <TableContainer sx={{ boxShadow: 0 }}>
                          <Table
                            sx={{
                              mt: 3,
                              "& .MuiTableCell-root": {
                                px: 0,
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
                      <MDBox mb={5}>
                        <MDTypography
                          fontWeight="bold"
                          textTransform="capitalize"
                          variant="h6"
                          color={"dark"}
                        >
                          Economics
                        </MDTypography>
                        <TableContainer sx={{ boxShadow: 0 }}>
                          <Table
                            sx={{
                              mt: 3,
                              "& .MuiTableCell-root": {
                                px: 0,
                              },
                            }}
                          >
                            <TableBody>
                              {opportunityData.economics?.map(
                                (economic, index) => (
                                  <TableRow
                                    key={index + economic.key}
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
                                        {economic.key}
                                      </MDBox>
                                    </TableCell>
                                    <TableCell>
                                      <MDBox
                                        sx={{
                                          fontSize: 12,
                                          px: 2,
                                        }}
                                      >
                                        {economic.value}
                                      </MDBox>
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </MDBox>
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
                            <Link href={file.url} key={index} target="_blank">
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
                                  {file.size}
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
                <MDBox
                  sx={{
                    position: "fixed",
                    width: "100vw",
                    zIndex: 10,
                    bottom: 110,
                    display: { xs: "flex", md: "none" },
                    justifyContent: "center",
                  }}
                >

                  {(opportunityData?.current_round == 2 && opportunityData.already_invested) ? (
                    <MDButton
                      onClick={setShowSecondRoundAcceptForm}
                      disabled={parseFloat(opportunityData?.remaining_amount.replace(/,/g, '')) == 0}
                      variant="contained"
                      sx={{
                        color: colors.white.main,
                        backgroundColor: opportunityData.status.color,
                        borderRadius: 1,

                        "&:hover": {
                          backgroundColor: opportunityData.status.color,
                        },
                        "&:focus:not(:hover)": {
                          backgroundColor: opportunityData.status.color,
                          boxShadow: "none",
                        },
                      }}
                    >
                      Invest more
                    </MDButton>
                  )
                    :
                    (
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
                    )
                  }


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
                  <MDBox>
                    {opportunityData.gallery?.length ? (
                      <EIOpportunitySlider images={opportunityData.gallery} openModal={openImgsViewer} />
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
            <MDBox>
              <PopupForm
                isOpen={showAcceptForm}
                setIsOpen={setShowAcceptForm}
                opportunity={opportunityData}
                userId={session?.data?.user.id}
                onSubmit={onSubmit}
                onRefrech={onRefrech}
              />
              <PopupSecondRoundForm
                isOpen={showSecondRoundAcceptForm}
                setIsOpen={setShowSecondRoundAcceptForm}
                opportunity={opportunityData}
                userId={session?.data?.user.id}
                onSubmit={onSecondRoundSubmit}
                onRefrech={onRefrech}
              />
            </MDBox>
          </>
        )
        }
      </DashboardLayout >
    );
  } else {
    return <EILoader open={isPending} />;
  }
}
export default Project;
