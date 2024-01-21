"use client";
import React, { useEffect, useState, useTransition } from "react";

import { redirect, useRouter } from "next/navigation";

import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import { Autocomplete, Grid, Icon, TextField } from "@mui/material";

import colors from "../../../assets/theme/base/colors";

import MDBox from "../../../components/MDBox";

import EIProjectCardWhite from "../../../components/EIProjectCardWhite";
import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";
import getOpportunitiesByStatusForInvestor from "@/admin/opportunities/serverActions/getOpportunitiesByStatusForInvestor";
import EILoader from "../../../components/EILoader";

export default function All() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(false);
  const [opportunities, setOpportunities] = useState([]);

  // useEffect(() => {
  //   async function getOpportunitiesData() {
  //     const opportunitiesData = await getOpportunitiesByStatusForInvestor();

  //     if (opportunitiesData?.status && opportunitiesData?.opportunities) {
  //       setOpportunities(opportunitiesData.opportunities);
  //     } else {
  //       // router.push("/overview");
  //       console.log(opportunitiesData);
  //     }
  //   }
  //   startTransition(async () => {
  //     getOpportunitiesData();
  //   });
  // }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar pageTitle={"All opportunities"} />
      <EILoader open={isPending} />
      <Grid container my={3} gap={2} direction={"column"}>
        <Grid item>
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <MDTypography
              fontWeight="bold"
              textTransform="capitalize"
              variant="h5"
              color={"dark"}
              noWrap
              sx={{
                fontSize: 18,
              }}
            >
              All opportunities
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item></Grid>
      </Grid>

      {opportunities.length > 0 ? (
        <MDBox>
          <Grid container spacing={3}>
            {opportunities?.map((opportunity, key) => (
              <Grid key={key} item xs={12} md={6} lg={4}>
                <MDBox>
                  <EIProjectCardWhite
                    id={opportunity.id}
                    image={opportunity.image}
                    title={opportunity.title}
                    property_description={opportunity.property_description}
                    tags={opportunity.tags}
                    location={opportunity.main_tag}
                    state={opportunity.status}
                  />
                </MDBox>
              </Grid>
            ))}
          </Grid>
          {/* <MDBox mt={5} textAlign="center">
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
            </MDButton>
          </MDBox> */}
        </MDBox>
      ) : (
        <MDTypography
          fontWeight="bold"
          textTransform="capitalize"
          noWrap
          sx={{
            fontSize: 15,
            color: colors.grey[500],
          }}
        >
          No opportunities found
        </MDTypography>
      )}
    </DashboardLayout>
  );
}
