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
import writtenNumber from "written-number";

const steps = ["Informations", "Terms and conditions", "Signature"];

export default function PopupForm({ isOpen, setIsOpen, opportunity, userId, onSubmit }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isError, setIsError] = useState("");
  const isLastStep = activeStep === steps.length;
  const isFirstStep = activeStep <= 1;

  const [termsCheck, setTermsCheck] = useState(false);
  const [signatureImage, setSignatureImage] = useState("");
  const [signatureUploadImage, setSignatureUploadImage] = useState({
      url: "",
      name: "",
      size: "",
      type: "",
      data: "",
    });

  const checkRef = useRef(null);
  const textRef = useRef(null);

  let sigCanvas = useRef({});
  

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 1:
        return (
          <MDBox>
            <Grid item container direction={"column"} gap={3}
            sx={{textAlign:"center"}}>
              <MDBox>
                <MDTypography
                  fontWeight="bold"
                  textTransform="capitalize"
                  variant="h5"
                  color={"dark"}
                  // textAlign="center"
                  // mx={{ xs: 3, sm: 10 }}
                >
                  {opportunity.title ? opportunity.title : ""}
                </MDTypography>
                <MDTypography
                  variant="h5"
                  fontWeight="regular"
                  color="secondary"
                  // textAlign="center"
                  mt={3}
                >
                  {opportunity.id ? "#" + opportunity.id : ""}
                </MDTypography>
              </MDBox>

              <MDBox
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:"center",
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
                  justifyContent:"center",
                    gap: 1,
                    fontSize: { xs: 12, md: 16 },
                    // color: "#ffffff",
                  }}
                >
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    euro
                  </Icon>
                  Soft commitment : {opportunity.equity_commitment}
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
                // mx: { xs: 1, sm: 10 },
                p: 2,
                borderRadius: 3,
              }}
            >
              <MDBox ref={textRef} sx={{display: "flex",flexDirection: "column",}}>
                <Typography variant="p" sx={{ fontSize: 16, fontWeight: "bold", textAlign: "center", mb: 2, }}>
                  COMMITMENT CONFIRMATION FOR EACH INDIVIDUAL INVESTMENT
                </Typography>
                <Typography variant="p" sx={{ fontSize: 13 }}>
                  Confirmo mi compromiso vinculante de invertir {opportunity.equity_commitment}€ ({writtenNumber(parseInt(opportunity.equity_commitment.replace(",", "")), {lang: 'es'})} euros) en a la Oportunidad de Inversión marcada con el número ({opportunity.id}) y denominada ({opportunity.title}) (la “Oportunidad de Inversión”) . <br /><br />
                  [Desde este momento manifiesto mi compromiso vinculante de invertir un monto adicional de {opportunity.equity_commitment}€ ({writtenNumber(parseInt(opportunity.equity_commitment.replace(",", "")), {lang: 'es'})} euros) en la Oportunidad de Inversión, en caso de que exista disponibilidad después de recibir los compromisos de los demás posibles inversionistas de la Plataforma.] <br /><br />
                  
                  <Typography variant="p" sx={{ fontSize: 13, fontWeight: "bold" }}>
                    Al acceder a esta página web, declaro bajo protesta de decir verdad que:
                  </Typography>

                  <br /><br />
                    (a)	soy un inversionista calificado, según dicho término se define en el Artículo 2 fracción XVI de la Ley del Mercado de Valores y en las Disposiciones de Carácter General aplicables a las Emisoras de Valores y a otros Participantes del Mercado de Valores; 
                    <br /><br />
                    (b)	tengo el conocimiento y experiencia necesarios para entender y evaluar los méritos y riesgos relacionados con oportunidades de inversión que se presenten a través de esta página web, y he consultado y tengo acceso a consultar en el futuro a aquellos asesores y expertos que he considerado o llegue a considerar necesarios o convenientes para tomar mis propias decisiones de inversión. Reconozco que ni el propietario de esta página web ni cualquier inversionista o potencial inversionista que acceda a esta página web, ni ninguna de sus respectivas partes relacionadas, me han proporcionado asesoría ni garantizado ganancia, rendimiento o resultado alguno en relación con cualquier posible inversión presentada a través de esta página web;
                    <br /><br />
                    (c)	me obligo a no revelar a terceros ninguna información en relación con la cualquier otra oportunidad de inversión presentada a través de esta página web, excepto por aquella información que (i) sea o se haya convertido del dominio público; (ii) sea conocida o desarrollada independientemente por mi sin referencia alguna a la información recibida; o (iii) tenga que ser divulgada por mandamiento legal o de autoridad competente. 
                    <br /><br />

                  <Typography variant="p" sx={{ fontSize: 13, fontWeight: "bold" }}>
                    Liberación de Responsabilidad
                  </Typography>
                  <br /><br />

                  1. Incluir sólo si se tiene la intención de invertir en la Oportunidad de Inversión respectiva.
                  <br /><br />

                  Incluir sólo si se tiene la intención de invertir más de su parte proporcional en la Oportunidad de Inversión respectiva.
                  <br /><br />


                  La información y opiniones expresadas en esta página web son responsabilidad exclusiva de los autores del contenido de las mismas, y no representan ni reflejan la opinión o posición del propietario de esta página web, quien (1) no garantiza en forma alguna ni es responsable de la veracidad, suficiencia o uso que se le dé a la información contenida en esta página web, y (2) no será responsable de los daños y perjuicios que, directa o indirectamente, deriven del uso de la información contenida en esta página web. Al acceder a nuestra página web, usted acepta en su totalidad la presente liberación de responsabilidad.
                  <br /><br />


                  <Typography variant="p" sx={{ fontSize: 13, fontWeight: "bold" }}>
                    Derechos de autor
                  </Typography>
                  <br /><br />


                  TODO EL MATERIAL, IMÁGENES Y TEXTOS INCLUIDOS EN ESTA PÁGINA WEB SON PROPIEDAD DE ABBEY CAPITAL, S.L., Y SE ENCUENTRAN PROTEGIDOS POR LA LEGISLACIÓN INTERNACIONAL, ESPAÑOLA Y MEXICANA EN MATERIA DE DERECHOS DE AUTOR. NINGUNA PARTE DE ESTA PÁGINA WEB PODRÁ SER CITADA, COPIADA NI REPRODUCIDA, EN FORMA O MEDIO ALGUNO, SIN EL PREVIO CONSENTIMIENTO POR ESCRITO DE ABBEY CAPITAL, S.L.
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
                sigCanvas={sigCanvas}
                signatureUploadImage={signatureUploadImage}
                setSignatureUploadImage={setSignatureUploadImage}
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

    if (activeStep === 3){
      if ((sigCanvas?.current === null || sigCanvas?.current?.isEmpty()) && signatureUploadImage?.data == "") { 
        setIsError("Please save your Signature in order to send your request.");
        return;
      }
    }

    if (isLastStep) {
      const imageData = sigCanvas?.current === null ? signatureUploadImage?.data : sigCanvas?.current?.getTrimmedCanvas().toDataURL("image/png");
      const data = {
        opportunityId : opportunity?.id,
        userId: userId,
        signature: imageData,
        equity_commitment_words: writtenNumber(parseInt(opportunity.equity_commitment.replace(",", "")), {lang: 'es'})
      };

      onSubmit(data);
      setIsError("");
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
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

      onKeyDown={(e) => {
        // console.log(e.keyCode);
        if (e.keyCode == 27) {
          closeForm();
        }
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid item  gap={2} sx={{width: "800px"}}>
          {/* <MDBox
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
          </MDBox> */}
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
            <MDBox sx={{ p: 4,textAlign: "center" }}>
              {activeStep === steps.length + 1 ? (
                <React.Fragment>
                  <Icon sx={{ fontSize: 'xxx-large !important', mb: 2, color: colors.escharaThemePrimary.main }}>
                    task_alt
                  </Icon>
                  <Typography
                    sx={{ mt: 2, textAlign: "center", fontSize: 16 }}
                  >
                    Your commitment has been fully acknowledged.
                    </Typography>
                    <Typography
                    sx={{ mb: 1, textAlign: "center", fontSize: 16 }}>
                    The asset manager has been informed and a confirmation email has been sent to you.
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
                    {!isFirstStep ? (
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
                    ):(<Button
                        // color="inherit"
                        disabled={activeStep === 0}
                        onClick={closeForm}
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
                        Cancel
                      </Button>)}
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
