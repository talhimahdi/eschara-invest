"use client";

import { useRouter } from "next/navigation";

import colors from "../../assets/theme/base/colors";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// @mui material components
import { Grid, Icon, Card, Divider } from "@mui/material";
import EILoader from "../EILoader";
import { useTransition } from "react";

function EIProjectCardWhite({
  id,
  image,
  title,
  location,
  property_description,
  tags,
  state,
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const renderStatus = (status) => {
    // const statusColor = Object.keys(colors.escharaThemeStatusColors).find(
    //   (color) => color === status?.toLowerCase()
    // );

    return (
      <MDBox
        alignItems={"center"}
        justifyContent={"center"}
        alignContent={"center"}
        color={colors.black.main}
        display="flex"
        borderRadius={"lg"}
        px={0.5}
        py={0.3}
        mt={1}
        ml={1}
        sx={{
          backgroundColor: status?.color ? status?.color : "",
        }}
        m={1}
      >
        <MDTypography
          fontWeight="light"
          style={{ color: colors.white.main }}
          sx={{
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {status?.name ? status?.name : ""}
        </MDTypography>
      </MDBox>
    );
  };

  return (
    <>
      <EILoader open={isPending} />
      <Card
        sx={{
          borderRadius: 1,
          boxShadow: 2,
          backgroundColor: colors.white.main,
          cursor: "pointer",
        }}
        onClick={() =>
          startTransition(async () => {
            router.push(
              "/opportunities/" + state.name.toLowerCase() + "/" + id
            );
          })
        }
      >
        <MDBox position="relative" className="card-header">
          <Grid container position="absolute">
            <Grid item xs={5}>
              <MDBox
                alignItems={"center"}
                justifyContent={"center"}
                alignContent={"center"}
                color={colors.black.main}
                display="flex"
                px={0.5}
                py={0.3}
                mt={1}
                ml={1}
                sx={{
                  backgroundColor: colors.grey[100],
                  borderRadius: 2,
                }}
                m={1}
              >
                <Icon fontSize={"inherit"}>place</Icon>
                <MDTypography
                  fontWeight="light"
                  style={{ color: colors.black.main }}
                  sx={{
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  {location}
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={5}>
              {renderStatus(state)}
            </Grid>
          </Grid>

          <MDBox
            color="white"
            textAlign="center"
            sx={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: 300,
            }}
          ></MDBox>

          {/* <MDBox
            width="100%"
            height={300}
            zIndex={1}
            overflow="hidden"
            sx={{ borderRadius: 1 }}
          >
            <img
              src={image}
              fill="cover"
              alt="no-image"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </MDBox> */}
        </MDBox>
        <MDBox pt={1} px={2}>
          <MDTypography variant="h6" fontWeight="bold" sx={{ fontSize: 15 }}>
            {title}
          </MDTypography>
          <MDBox sx={{ display: "flex", mt: 2, gap: 1, flexWrap: "wrap" }}>
            {tags.map((tag, i) => (
              <MDTypography
                key={i}
                borderRadius={0.5}
                px={1}
                // mr={2}
                sx={{
                  fontSize: 13,
                  fontWeight: "bold",
                  backgroundColor: colors.grey[200],
                  color: colors.grey[700],
                }}
              >
                {tag}
              </MDTypography>
            ))}
          </MDBox>
          <MDBox mt={3} mb={2}>
            {property_description?.map((property, index) => {
              if (index < 3) {
                return (
                  <MDBox key={index}>
                    <MDBox
                      sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "space-between",
                      }}
                    >
                      <MDTypography
                        align="left"
                        sx={{
                          fontSize: 14,
                        }}
                      >
                        {property.key}
                      </MDTypography>

                      <MDTypography
                        sx={{
                          fontSize: 14,
                          textAlign: "right",
                        }}
                      >
                        {property.value}
                      </MDTypography>
                    </MDBox>
                    {index < 2 && (
                      <Divider sx={{ border: "1px dashed #000;" }} />
                    )}
                  </MDBox>
                );
              }
            })}
          </MDBox>
        </MDBox>
      </Card>
    </>
  );
}

export default EIProjectCardWhite;
