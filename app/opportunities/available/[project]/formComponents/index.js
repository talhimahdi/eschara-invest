"use client";

import { useState } from "react";

import colors from "/assets/theme/base/colors";

// formik components
import { Formik, Form } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";

// NewUser page components
import UserInfo from "./UserInfo";
import Address from "./Address";
import Socials from "./Socials";

// NewUser layout schemas for form and form feilds
import validations from "./schemas/validations";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import CloseIcon from "@mui/icons-material/Close";

function getSteps() {
  return ["Informations", "Terms and conditions", "Signature"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <UserInfo formData={formData} />;
    case 1:
      return <Address formData={formData} />;
    case 2:
      return <Socials formData={formData} />;
    default:
      return null;
  }
}

function NewUser({ isOpen, setIsOpen }) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const closeForm = () => {
    setIsOpen(false);
  };

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = async (values, actions) => {
    await sleep(1000);

    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, null, 2));

    actions.setSubmitting(false);
    actions.resetForm();

    setActiveStep(0);
  };

  const handleSubmit = (values, actions) => {
    // if (isLastStep) {
    //   submitForm(values, actions);
    // } else {
    //   setActiveStep(activeStep + 1);
    //   actions.setTouched({});
    //   actions.setSubmitting(false);
    // }
  };

  return (
    <MDBox
      // py={3}
      // mb={20}
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

        backgroundColor: "rgba(255,255,255,0.6)",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" /*mt: 8*/ }}
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
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidation}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, isSubmitting }) => {
              // console.log(values);
              return (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
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
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </MDBox>
                    <MDBox p={3}>
                      <MDBox>
                        {getStepContent(activeStep, {
                          values,
                          touched,
                          formField,
                          errors,
                        })}
                        <MDBox
                          mt={2}
                          width="100%"
                          display="flex"
                          justifyContent="space-between"
                        >
                          {activeStep === 0 ? (
                            <MDBox />
                          ) : (
                            <MDButton
                              variant="gradient"
                              // color="light"
                              onClick={handleBack}
                              sx={{
                                px: 3,
                                boxShadow: 2,
                                color: colors.white.main,
                                backgroundColor: "#7180AC",
                                borderRadius: 1,

                                "&:hover": {
                                  backgroundColor: "#7180AC",
                                },
                                "&:focus:not(:hover)": {
                                  backgroundColor: "#7180AC",
                                },
                              }}
                            >
                              back
                            </MDButton>
                          )}

                          <MDButton
                            disabled={isSubmitting}
                            type="submit"
                            // variant="contained"
                            sx={{
                              px: 3,
                              boxShadow: 2,
                              color: colors.white.main,
                              backgroundColor:
                                colors.escharaThemeSecondary.main,
                              borderRadius: 1,

                              "&:hover": {
                                backgroundColor:
                                  colors.escharaThemeSecondary.main,
                              },
                              "&:focus:not(:hover)": {
                                backgroundColor:
                                  colors.escharaThemeSecondary.main,
                              },
                            }}
                          >
                            {isLastStep ? "accept" : "next"}
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Card>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewUser;
