"use client";

import React, { useRef, useState } from "react";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MDBox from "../../../../../components/MDBox";
import colors from "../../../../../assets/theme/base/colors";
import { Card, Grid, Icon } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Signature from "@/components/Signature";
import CloseIcon from "@mui/icons-material/Close";
import MDTypography from "../../../../../components/MDTypography";

const steps = ["Informations", "Terms and conditions", "Signature"];

export default function PopupForm({ isOpen, setIsOpen, opportunity }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isError, setIsError] = useState("");
  const isLastStep = activeStep === steps.length + 1;
  const isFirstStep = activeStep <= 1;

  const [termsCheck, setTermsCheck] = useState(false);
  const [signatureImage, setSignatureImage] = useState("");

  const checkRef = useRef(null);
  const textRef = useRef(null);

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 1:
        return (
          <MDBox>
            <Grid item container direction={"column"} gap={3}>
              <MDBox>
                <MDTypography
                  fontWeight="bold"
                  textTransform="capitalize"
                  variant="h5"
                  color={"dark"}
                  textAlign="center"
                  mx={{ xs: 3, sm: 10 }}
                >
                  {opportunity.title ? opportunity.title : ""}
                </MDTypography>
                <MDTypography
                  variant="h5"
                  fontWeight="regular"
                  color="secondary"
                  textAlign="center"
                  mt={3}
                >
                  {opportunity.id ? "#" + opportunity.id : ""}
                </MDTypography>
              </MDBox>

              <MDBox
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: { xs: 12, md: 16 },
                  // color: "#ffffff",
                }}
              >
                <Icon fontSize="small" sx={{ mt: -0.25 }}>
                  calendar_month
                </Icon>
                Expiration date : {opportunity.expiration_date}
              </MDBox>
              {opportunity.equity_commitment ? (
                <MDBox
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: { xs: 12, md: 16 },
                    // color: "#ffffff",
                  }}
                >
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    euro
                  </Icon>
                  {opportunity.equity_commitment}
                </MDBox>
              ) : (
                ""
              )}
            </Grid>
          </MDBox>
        );
      case 2:
        return (
          <MDBox>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
              Terms and conditions
            </Typography>
            <MDBox
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                overflowY: "scroll",
                maxHeight: 400,
                backgroundColor: colors.grey[200],
                mx: { xs: 1, sm: 10 },
                p: 2,
                borderRadius: 3,
              }}
            >
              <MDBox ref={textRef}>
                <Typography variant="p" sx={{ fontSize: 13 }}>
                  Fusce neque. Quisque libero metus, condimentum nec, tempor a,
                  commodo mollis, magna. Ut non enim eleifend felis pretium
                  feugiat. Vestibulum ante ipsum primis in faucibus orci luctus
                  et ultrices posuere cubilia Curae; In ac dui quis mi
                  consectetuer lacinia. Suspendisse faucibus, nunc et
                  pellentesque egestas, lacus ante convallis tellus, vitae
                  iaculis lacus elit id tortor. Sed a libero. Fusce pharetra
                  convallis urna. Vivamus laoreet. Aliquam lorem ante, dapibus
                  in, viverra quis, feugiat a, tellus. Ut tincidunt tincidunt
                  erat. Nullam nulla eros, ultricies sit amet, nonummy id,
                  imperdiet feugiat, pede. Aliquam lobortis. Sed consequat, leo
                  eget bibendum sodales, augue velit cursus nunc, quis gravida
                  magna mi a libero. Nunc nonummy metus. Cras non dolor. Donec
                  mollis hendrerit risus. Aliquam lobortis. Nam eget dui. In
                  turpis. Nullam dictum felis eu pede mollis pretium. In hac
                  habitasse platea dictumst. Proin faucibus arcu quis ante.
                  Nullam sagittis. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas.
                  Vivamus laoreet. Fusce neque. Quisque libero metus,
                  condimentum nec, tempor a, commodo mollis, magna. Ut non enim
                  eleifend felis pretium feugiat. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae; In
                  ac dui quis mi consectetuer lacinia. Suspendisse faucibus,
                  nunc et pellentesque egestas, lacus ante convallis tellus,
                  vitae iaculis lacus elit id tortor. Sed a libero. Fusce
                  pharetra convallis urna. Vivamus laoreet. Aliquam lorem ante,
                  dapibus in, viverra quis, feugiat a, tellus. Ut tincidunt
                  tincidunt erat. Nullam nulla eros, ultricies sit amet, nonummy
                  id, imperdiet feugiat, pede. Aliquam lobortis. Sed consequat,
                  leo eget bibendum sodales, augue velit cursus nunc, quis
                  gravida magna mi a libero. Nunc nonummy metus. Cras non dolor.
                  Donec mollis hendrerit risus. Aliquam lobortis. Nam eget dui.
                  In turpis. Nullam dictum felis eu pede mollis pretium. In hac
                  habitasse platea dictumst. Proin faucibus arcu quis ante.
                  Nullam sagittis. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas.
                  Vivamus laoreet. Fusce neque. Quisque libero metus,
                  condimentum nec, tempor a, commodo mollis, magna. Ut non enim
                  eleifend felis pretium feugiat. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae; In
                  ac dui quis mi consectetuer lacinia. Suspendisse faucibus,
                  nunc et pellentesque egestas, lacus ante convallis tellus,
                  vitae iaculis lacus elit id tortor. Sed a libero. Fusce
                  pharetra convallis urna. Vivamus laoreet. Aliquam lorem ante,
                  dapibus in, viverra quis, feugiat a, tellus. Ut tincidunt
                  tincidunt erat. Nullam nulla eros, ultricies sit amet, nonummy
                  id, imperdiet feugiat, pede. Aliquam lobortis. Sed consequat,
                  leo eget bibendum sodales, augue velit cursus nunc, quis
                  gravida magna mi a libero. Nunc nonummy metus. Cras non dolor.
                  Donec mollis hendrerit risus. Aliquam lobortis. Nam eget dui.
                  In turpis. Nullam dictum felis eu pede mollis pretium. In hac
                  habitasse platea dictumst. Proin faucibus arcu quis ante.
                  Nullam sagittis. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas.
                  Vivamus laoreet. Fusce neque. Quisque libero metus,
                  condimentum nec, tempor a, commodo mollis, magna. Ut non enim
                  eleifend felis pretium feugiat. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae; In
                  ac dui quis mi consectetuer lacinia. Suspendisse faucibus,
                  nunc et pellentesque egestas, lacus ante convallis tellus,
                  vitae iaculis lacus elit id tortor. Sed a libero. Fusce
                  pharetra convallis urna. Vivamus laoreet. Aliquam lorem ante,
                  dapibus in, viverra quis, feugiat a, tellus. Ut tincidunt
                  tincidunt erat. Nullam nulla eros, ultricies sit amet, nonummy
                  id, imperdiet feugiat, pede. Aliquam lobortis. Sed consequat,
                  leo eget bibendum sodales, augue velit cursus nunc, quis
                  gravida magna mi a libero. Nunc nonummy metus. Cras non dolor.
                  Donec mollis hendrerit risus. Aliquam lobortis. Nam eget dui.
                  In turpis. Nullam dictum felis eu pede mollis pretium. In hac
                  habitasse platea dictumst. Proin faucibus arcu quis ante.
                  Nullam sagittis. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas.
                  Vivamus laoreet. Fusce neque. Quisque libero metus,
                  condimentum nec, tempor a, commodo mollis, magna. Ut non enim
                  eleifend felis pretium feugiat. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae; In
                  ac dui quis mi consectetuer lacinia. Suspendisse faucibus,
                  nunc et pellentesque egestas, lacus ante convallis tellus,
                  vitae iaculis lacus elit id tortor. Sed a libero. Fusce
                  pharetra convallis urna. Vivamus laoreet. Aliquam lorem ante,
                  dapibus in, viverra quis, feugiat a, tellus. Ut tincidunt
                  tincidunt erat. Nullam nulla eros, ultricies sit amet, nonummy
                  id, imperdiet feugiat, pede. Aliquam lobortis. Sed consequat,
                  leo eget bibendum sodales, augue velit cursus nunc, quis
                  gravida magna mi a libero. Nunc nonummy metus. Cras non dolor.
                  Donec mollis hendrerit risus. Aliquam lobortis. Nam eget dui.
                  In turpis. Nullam dictum felis eu pede mollis pretium. In hac
                  habitasse platea dictumst. Proin faucibus arcu quis ante.
                  Nullam sagittis. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas.
                  Vivamus laoreet. Fusce neque. Quisque libero metus,
                  condimentum nec, tempor a, commodo mollis, magna. Ut non enim
                  eleifend felis pretium feugiat. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae; In
                  ac dui quis mi consectetuer lacinia. Suspendisse faucibus,
                  nunc et pellentesque egestas, lacus ante convallis tellus,
                  vitae iaculis lacus elit id tortor. Sed a libero. Fusce
                  pharetra convallis urna. Vivamus laoreet. Aliquam lorem ante,
                  dapibus in, viverra quis, feugiat a, tellus. Ut tincidunt
                  tincidunt erat. Nullam nulla eros, ultricies sit amet, nonummy
                  id, imperdiet feugiat, pede. Aliquam lobortis. Sed consequat,
                  leo eget bibendum sodales, augue velit cursus nunc, quis
                  gravida magna mi a libero. Nunc nonummy metus. Cras non dolor.
                  Donec mollis hendrerit risus. Aliquam lobortis. Nam eget dui.
                  In turpis. Nullam dictum felis eu pede mollis pretium. In hac
                  habitasse platea dictumst. Proin faucibus arcu quis ante.
                  Nullam sagittis. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas.
                  Vivamus laoreet. Fusce neque. Quisque libero metus,
                  condimentum nec, tempor a, commodo mollis, magna. Ut non enim
                  eleifend felis pretium feugiat. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae; In
                  ac dui quis mi consectetuer lacinia. Suspendisse faucibus,
                  nunc et pellentesque egestas, lacus ante convallis tellus,
                  vitae iaculis lacus elit id tortor. Sed a libero. Fusce
                  pharetra convallis urna. Vivamus laoreet. Aliquam lorem ante,
                  dapibus in, viverra quis, feugiat a, tellus. Ut tincidunt
                  tincidunt erat. Nullam nulla eros, ultricies sit amet, nonummy
                  id, imperdiet feugiat, pede. Aliquam lobortis. Sed consequat,
                  leo eget bibendum sodales, augue velit cursus nunc, quis
                  gravida magna mi a libero. Nunc nonummy metus. Cras non dolor.
                  Donec mollis hendrerit risus. Aliquam lobortis. Nam eget dui.
                  In turpis. Nullam dictum felis eu pede mollis pretium. In hac
                  habitasse platea dictumst. Proin faucibus arcu quis ante.
                  Nullam sagittis. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas.
                  Vivamus laoreet. Fusce neque. Quisque libero metus,
                  condimentum nec, tempor a, commodo mollis, magna. Ut non enim
                  eleifend felis pretium feugiat. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae; In
                  ac dui quis mi consectetuer lacinia. Suspendisse faucibus,
                  nunc et pellentesque egestas, lacus ante convallis tellus,
                  vitae iaculis lacus elit id tortor. Sed a libero. Fusce
                  pharetra convallis urna. Vivamus laoreet. Aliquam lorem ante,
                  dapibus in, viverra quis, feugiat a, tellus. Ut tincidunt
                  tincidunt erat. Nullam nulla eros, ultricies sit amet, nonummy
                  id, imperdiet feugiat, pede. Aliquam lobortis. Sed consequat,
                  leo eget bibendum sodales, augue velit cursus nunc, quis
                  gravida magna mi a libero. Nunc nonummy metus. Cras non dolor.
                  Donec mollis hendrerit risus. Aliquam lobortis. Nam eget dui.
                  In turpis. Nullam dictum felis eu pede mollis pretium. In hac
                  habitasse platea dictumst. Proin faucibus arcu quis ante.
                  Nullam sagittis. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas.
                  Vivamus laoreet.
                </Typography>
              </MDBox>
              <MDBox
                ref={checkRef}
                id="_termsCheck"
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  checked={termsCheck}
                  onChange={(e) => setTermsCheck(e.target.checked)}
                  sx={{
                    "&.MuiCheckbox-root": {
                      p: 0,
                      mr: 1,
                      color: colors.escharaThemeSecondary.main,
                      backgroundColor: colors.grey[500],
                      border: 0,
                      borderRadius: 1,
                    },
                    "&.Mui-checked": {
                      p: 0,
                      mr: 1,

                      "& .MuiSvgIcon-root": {
                        color: colors.escharaThemeSecondary.main,
                        backgroundColor: colors.transparent.main,
                        border: 0,
                      },
                    },
                  }}
                />
                <Typography sx={{ fontSize: 13 }}>
                  I accept the terms & conditions
                </Typography>
              </MDBox>
            </MDBox>
          </MDBox>
        );
      case 3:
        return (
          <MDBox>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
              Signature
            </Typography>

            <MDBox
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                mx: 5,
              }}
            >
              <Signature
                onSave={(image) => {
                  setIsError("");
                  setSignatureImage(image);
                }}
              />
            </MDBox>
          </MDBox>
        );
      default:
        return null;
    }
  }

  const handleNext = () => {
    setIsError("");
    // if (activeStep === 1 && !test) {
    //   console.log("Error 1");

    //   return;
    // }
    if (activeStep === 2 && !termsCheck) {
      checkRef.current.scrollIntoView({ behavior: "smooth" });
      setIsError(
        "Please indicate that you have read and agree to the Terms and Conditions."
      );

      return;
    }

    if (activeStep === 3 && !signatureImage) {
      setIsError("Please save your Signature in order to send your request.");
      return;
    }

    if (isLastStep) {
      // submitForm(values, actions);
      setIsError("Submit...");
      console.log("Submit...");
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped(newSkipped);
  };

  const handleBack = () => {
    setIsError("");
    if (isFirstStep) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
    setSignatureImage("");
    setIsError("");
    setTermsCheck(false);
    textRef.current?.scrollIntoView();
  };

  const closeForm = () => {
    handleReset();
    setIsOpen(false);
  };

  return (
    <MDBox
      sx={{
        display: () => (isOpen ? "block" : "none"),
        zIndex: 10,
        height: "100vh",
        width: "100%",
        position: "fixed",
        top: "50%",
        left: { xs: "50%", md: "60%" },
        // bottom: "50%",
        // right: "50%",
        /* bring your own prefixes */
        transform: "translate(-50%, -50%)",

        backgroundColor: "rgba(255,255,255,0.7)",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid item xs={12} lg={8} gap={2}>
          <MDBox
            onClick={closeForm}
            sx={{
              display: "flex",
              mb: 3,
              justifyContent: "end",
              fontSize: 30,
              color: "#000",
              cursor: "pointer",
            }}
          >
            <CloseIcon />
          </MDBox>
          <Card sx={{ height: "100%", boxShadow: 5 }}>
            <MDBox
              mx={2}
              mt={-3}
              sx={{
                "& .MuiStepper-root": {
                  background: "transparent",
                  backgroundColor: colors.escharaThemePrimary.main,
                },
              }}
            >
              <Stepper activeStep={activeStep - 1} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </MDBox>
            <MDBox sx={{ p: 2 }}>
              {activeStep === steps.length + 1 ? (
                <React.Fragment>
                  <Typography
                    sx={{ mt: 2, mb: 1, textAlign: "center", fontSize: 18 }}
                  >
                    Your request has been sent successfully.
                  </Typography>
                  <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <MDBox sx={{ flex: "1 1 auto", textAlign: "center" }}>
                      {isError && (
                        <Typography
                          sx={{ fontSize: 13, color: colors.error.main }}
                        >
                          {isError}
                        </Typography>
                      )}
                    </MDBox>
                    <Button onClick={closeForm}>Close</Button>
                  </MDBox>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <MDBox sx={{ mt: 2, mb: 1 }}>
                    {getStepContent(activeStep)}
                  </MDBox>
                  <MDBox
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    {!isFirstStep && (
                      <Button
                        // color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{
                          color: colors.white.main,
                          backgroundColor: colors.escharaThemePrimary.main,
                          ":hover": {
                            color: colors.white.main,
                            backgroundColor: colors.escharaThemePrimary.main,
                          },
                          ":focus:not(:hover)": {
                            color: colors.white.main,
                            backgroundColor: colors.escharaThemePrimary.main,
                          },
                        }}
                      >
                        Back
                      </Button>
                    )}
                    <MDBox sx={{ flex: "1 1 auto", textAlign: "center" }}>
                      {isError && (
                        <Typography
                          sx={{ fontSize: 13, color: colors.error.main }}
                        >
                          {isError}
                        </Typography>
                      )}
                    </MDBox>

                    <Button
                      onClick={handleNext}
                      sx={{
                        color: colors.white.main,
                        backgroundColor: colors.escharaThemeSecondary.main,
                        ":hover": {
                          color: colors.white.main,
                          backgroundColor: colors.escharaThemeSecondary.main,
                        },
                        ":focus:not(:hover)": {
                          color: colors.white.main,
                          backgroundColor: colors.escharaThemeSecondary.main,
                        },
                      }}
                    >
                      {activeStep === steps.length ? "Accept" : "Next"}
                    </Button>
                  </MDBox>
                </React.Fragment>
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
