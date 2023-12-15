"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MDBox from "../../components/MDBox";
import colors from "../../assets/theme/base/colors";
import { Card, Grid, Typography } from "@mui/material";
import Image from "next/image";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

export default function Contact() {
  return (
    <DashboardLayout>
      <DashboardNavbar pageTitle={"Contact us"} />
      <MDBox
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: "100%",
            backgroundColor: "transparent !important",
            boxShadow: "none",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 5, borderRadius: 1, width: "100%" }}>
                <MDBox>
                  <Typography
                    variant="h4"
                    mb={3}
                    color={colors.escharaThemeSecondary.main}
                  >
                    General contact
                  </Typography>
                  <Typography variant="subtitle2">
                    For any general inquiry contact Carlos Aiza <br />
                    Phone: +52 55 2755 3108 <br />
                    <a
                      href="mailto:carlos.Aiza@creel.mx"
                      target="_blank"
                      style={{
                        color: "inherit",
                        marginRight: 5,
                        textDecoration: "underline !important",
                        fontWeight: "bold",
                      }}
                    >
                      Write an email
                    </a>
                    @ Carlos.Aiza@creel.mx
                  </Typography>
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 5, borderRadius: 1, width: "100%" }}>
                <MDBox>
                  <Typography
                    variant="h4"
                    mb={3}
                    color={colors.escharaThemeSecondary.main}
                  >
                    Technical contact
                  </Typography>
                  <Typography variant="subtitle2">
                    Encountering a technical issue ? Contact Joffrey Louveton{" "}
                    <br />
                    Phone: +33 6 37 34 56 92 <br />
                    <a
                      href="mailto:joffrey@primatic.digital"
                      target="_blank"
                      style={{
                        color: "inherit",
                        marginRight: 5,
                        textDecoration: "underline !important",
                        fontWeight: "bold",
                      }}
                    >
                      Write an email
                    </a>
                    @ joffrey@primatic.digital
                  </Typography>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}
