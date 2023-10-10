"use client";
import React, { useEffect, useState, useTransition } from "react";

import { redirect } from "next/navigation";

import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import { Autocomplete, Grid, Icon, TextField } from "@mui/material";

import colors from "/assets/theme/base/colors";

import MDBox from "../../../components/MDBox";

import EIProjectCardWhite from "../../../components/EIProjectCardWhite";
import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";
import getOpportunitiesByStatusForInvestor from "@/admin/opportunities/serverActions/getOpportunitiesByStatusForInvestor";
import EILoader from "../../../components/EILoader";

export default function Available() {
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(false);
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    async function getOpportunitiesData() {
      const opportunitiesData = await getOpportunitiesByStatusForInvestor(
        "Available"
      );

      if (opportunitiesData.status && opportunitiesData.opportunities) {
        setOpportunities(opportunitiesData.opportunities);
      } else {
        router.push("/overview");
      }
    }
    startTransition(async () => {
      getOpportunitiesData();
    });
  }, []);

  // const selectData = {
  //   countries: [
  //     "Morocco",
  //     "United States",
  //     "Canada",
  //     "United Kingdom",
  //     "Germany",
  //     "France",
  //     "Australia",
  //     "Japan",
  //     "Brazil",
  //     "India",
  //     "South Africa",
  //   ],
  //   typologies: [
  //     "Typology 01",
  //     "Typology 02",
  //     "Typology 03",
  //     "Typology 04",
  //     "Typology 05",
  //   ],
  //   surfaces: [
  //     "Surface area 01",
  //     "Surface area 02",
  //     "Surface area 03",
  //     "Surface area 04",
  //     "Surface area 05",
  //   ],
  // };

  return (
    <DashboardLayout>
      <DashboardNavbar pageTitle={"Available opportunities"} />
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
              Available opportunities
            </MDTypography>

            {/* Mobile Filters */}

            {/* <MDBox
              display={{ xs: "flex", md: "none" }}
              alignItems="center"
              gap={1}
              sx={{
                fontSize: 15,
                border: "2px solid #10123F",
                px: 1,
                borderRadius: 1.5,
              }}
              onClick={() => setShow((prev) => !prev)}
            >
              <Icon fontSize="medium" color="black">
                filter_list
              </Icon>
              Filters
            </MDBox> */}
          </MDBox>
        </Grid>
        <Grid item>
          {/* Mobile Filters */}
          {/* {show && (
            <MDBox
              p={3}
              position="absolute"
              zIndex={10}
              display="flex"
              gap={3}
              sx={{ flexDirection: { xs: "column", sm: "row" } }}
              bgColor={colors.escharaThemePrimary.main}
              width={1}
              left={0}
            >
              <MDTypography
                fontWeight="bold"
                textTransform="capitalize"
                variant="h5"
                color={"white"}
                noWrap
              >
                Preferences
              </MDTypography>
              <Autocomplete
                options={selectData.countries}
                sx={{
                  width: { sm: 150 },
                  "& .MuiOutlinedInput-root": {
                    pb: 0,
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: { xs: "1px solid white", sm: "1px solid #10123F" },
                  },
                  "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
                    color: "#FFFFFF",
                    visibility: "visible",
                  },
                  "& .MuiButtonBase-root.MuiAutocomplete-popupIndicator": {
                    color: "#FFFFFF",
                    visibility: "visible",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    sx={{
                      input: { color: "#FFFFFF" },
                    }}
                  />
                )}
              />
              <Autocomplete
                options={selectData.typologies}
                sx={{
                  width: { sm: 150 },
                  "& .MuiOutlinedInput-root": {
                    pb: 0,
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: { xs: "1px solid white", sm: "1px solid #10123F" },
                  },
                  "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
                    color: "#FFFFFF",
                    visibility: "visible",
                  },
                  "& .MuiButtonBase-root.MuiAutocomplete-popupIndicator": {
                    color: "#FFFFFF",
                    visibility: "visible",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Typology"
                    sx={{
                      input: { color: "#FFFFFF" },
                    }}
                  />
                )}
              />
              <Autocomplete
                options={selectData.surfaces}
                sx={{
                  width: { sm: 150 },
                  "& .MuiOutlinedInput-root": {
                    pb: 0,
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: { xs: "1px solid white", sm: "1px solid #10123F" },
                  },
                  "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
                    color: "#FFFFFF",
                    visibility: "visible",
                  },
                  "& .MuiButtonBase-root.MuiAutocomplete-popupIndicator": {
                    color: "#FFFFFF",
                    visibility: "visible",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Surface area"
                    sx={{
                      input: { color: "#FFFFFF" },
                    }}
                  />
                )}
              />

              <MDBox display="flex" justifyContent="space-between" gap={2}>
                <MDButton
                  variant="outlined"
                  sx={{
                    color: colors.white.main,
                    borderColor: colors.escharaThemeSecondary.main,
                    backgroundColor: colors.escharaThemePrimary.main,
                    borderRadius: 1.5,
                    width: "50%",
                    "&:hover": {
                      borderColor: colors.escharaThemeSecondary.main,
                      backgroundColor: colors.escharaThemePrimary.main,
                    },
                    "&:focus:not(:hover)": {
                      borderColor: colors.escharaThemeSecondary.main,
                      backgroundColor: colors.escharaThemePrimary.main,
                    },
                  }}
                >
                  DELETE
                </MDButton>
                <MDButton
                  variant="contained"
                  sx={{
                    color: colors.white.main,
                    backgroundColor: colors.escharaThemeSecondary.main,
                    borderRadius: 1.5,
                    width: "50%",
                    "&:hover": {
                      backgroundColor: colors.escharaThemeSecondary.main,
                    },
                    "&:focus:not(:hover)": {
                      backgroundColor: colors.escharaThemeSecondary.main,
                    },
                  }}
                >
                  VIEW
                </MDButton>
              </MDBox>
            </MDBox>
          )} */}

          {/* Desktop Filters */}
          {/* <MDBox gap={2} display={{ xs: "none", md: "flex" }}>
            <Autocomplete
              options={selectData.countries}
              sx={{
                width: 150,
                "& .MuiOutlinedInput-root": {
                  pb: 0,
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #10123F",
                },
              }}
              renderInput={(params) => (
                <TextField {...params} label="Country" />
              )}
            />
            <Autocomplete
              options={selectData.typologies}
              sx={{
                width: 150,
                "& .MuiOutlinedInput-root": {
                  pb: 0,
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #10123F",
                },
              }}
              renderInput={(params) => (
                <TextField {...params} label="Typology" />
              )}
            />
            <Autocomplete
              options={selectData.surfaces}
              sx={{
                width: 150,
                "& .MuiOutlinedInput-root": {
                  pb: 0,
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #10123F",
                },
              }}
              renderInput={(params) => (
                <TextField {...params} label="Surface area" />
              )}
            />
          </MDBox> */}
        </Grid>
      </Grid>

      {opportunities.length > 0 && (
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
          <MDBox mt={5} textAlign="center">
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
          </MDBox>
        </MDBox>
      )}
    </DashboardLayout>
  );
}
