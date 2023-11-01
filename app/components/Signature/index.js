"use client";
import React, { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";

import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";
import colors from "../../../assets/theme/base/colors";
import { Tab, Tabs, Typography } from "@mui/material";

export default function Signature({ onSave }) {
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url
  const [activeSignatureTabIndex, setActiveSignatureTabIndex] = useState(0);

  const sigCanvas = useRef({});

  const clear = () => {
    sigCanvas.current.clear();
    setImageURL(null);
    onSave("");
  };
  const save = () => {
    if (sigCanvas.current.isEmpty()) {
    } else {
      setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
      onSave(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    }
  };

  const handleChangeActiveSignatureTabIndex = (event, newValue) => {
    setActiveSignatureTabIndex(newValue);
  };

  const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <MDBox
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <MDBox
            sx={
              {
                /*p: 3*/
              }
            }
          >
            {children}
          </MDBox>
        )}
      </MDBox>
    );
  };

  return (
    <MDBox
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <MDBox>
        <Tabs
          value={activeSignatureTabIndex}
          onChange={handleChangeActiveSignatureTabIndex}
          sx={{
            backgroundColor: "#F8F9FA",
            borderRadius: 1,
            width: 400,
          }}
        >
          <Tab
            label="Draw"
            // sx={{
            //   px: 6,
            // }}
          />
          <Tab
            label="Image"
            // sx={{
            //   px: 6,
            // }}
          />
        </Tabs>
      </MDBox>
      <MDBox>
        <CustomTabPanel value={activeSignatureTabIndex} index={0}>
          <MDBox
            sx={{
              width: 400,
            }}
          >
            <MDBox
              sx={{
                width: 400,
                height: 200,
                margin: 0,
                backgroundColor: "#F8F9FA",
                borderRadius: 1,
                my: 2,
              }}
            >
              <SignaturePad
                ref={sigCanvas}
                canvasProps={{
                  // className: "signatureCanvas",
                  // width: 300,
                  // height: 300,
                  style: {
                    // backgroundColor: "red",

                    width: "100%",
                    height: "100%",
                    maxWidth: 500,
                  },
                }}
              />
            </MDBox>

            <MDBox sx={{ width: "100%" }}>
              <Typography sx={{ fontSize: 8, textAlign: "left" }}>
                By signing this document with an electronic signature, I agree
                that such signature will be as valid as handwritten signatures.
              </Typography>
            </MDBox>

            <MDBox
              sx={{ display: "flex", gap: 2, my: 3, alignItems: "center" }}
            >
              <MDButton
                sx={{
                  backgroundColor: colors.escharaThemeSecondary.main,
                  color: colors.white.main,
                  "&:hover": {
                    backgroundColor: colors.escharaThemeSecondary.main,
                    color: colors.white.main,
                  },
                  "&:focus:not(:hover)": {
                    backgroundColor: colors.escharaThemeSecondary.main,
                    color: colors.white.main,
                  },
                }}
                onClick={() => save()}
              >
                Save
              </MDButton>

              <MDButton
                sx={{
                  backgroundColor: colors.grey[400],
                  color: colors.grey[800],
                  "&:hover": {
                    backgroundColor: colors.grey[400],
                    color: colors.grey[800],
                  },
                  "&:focus:not(:hover)": {
                    backgroundColor: colors.grey[400],
                    color: colors.grey[800],
                  },
                }}
                onClick={() => clear()}
              >
                Clear
              </MDButton>

              {imageURL && (
                <Typography sx={{ fontSize: 10, color: "green" }}>
                  Signature saved.
                </Typography>
              )}
            </MDBox>
          </MDBox>
        </CustomTabPanel>
        <CustomTabPanel value={activeSignatureTabIndex} index={1}>
          Item Two
        </CustomTabPanel>
      </MDBox>
    </MDBox>
  );
}
