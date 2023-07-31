"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import colors from "/assets/theme/base/colors";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// @mui material components
import { Grid, Icon, Card, Divider } from "@mui/material";

function EIProjectCardWhite({ image, title, location, details, tags, state }) {
  const router = useRouter();

  return (
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: 2,
        backgroundColor: colors.white.main,
      }}
    >
      <MDBox
        position="relative"
        className="card-header"
        onClick={() => {
          router.push("/opportunities/available/azertyu");
        }}
      >
        <Grid container position="absolute">
          <Grid item xs={5}>
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
                backgroundColor: "white.main",
              }}
              m={1}
            >
              <Icon fontSize={"inherit"}>place</Icon>
              <MDTypography
                fontWeight="light"
                style={{ color: colors.black.main }}
                sx={{
                  fontSize: 12,
                }}
              >
                {location}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
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
                backgroundColor: "#7180AC",
              }}
              m={1}
            >
              <MDTypography
                fontWeight="light"
                style={{ color: colors.white.main }}
                sx={{
                  fontSize: 12,
                }}
              >
                {state}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>

        <MDBox width="100%" zIndex={1} overflow="hidden">
          {image.src ? (
            <Image
              src={image}
              alt={title}
              quality={100}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            image
          )}
        </MDBox>
      </MDBox>
      <MDBox pt={1} px={2}>
        <MDTypography variant="h6" fontWeight="bold">
          {title}
        </MDTypography>
        <MDBox display="flex" mt={1}>
          {tags.map((tag, i) => (
            <MDTypography
              key={i}
              borderRadius={0.5}
              px={1}
              mr={2}
              fontWeight="light"
              sx={{
                fontSize: 12,
                backgroundColor: colors.grey[100],
                color: colors.black.main,
              }}
            >
              {tag}
            </MDTypography>
          ))}
        </MDBox>
        <MDBox mt={3} mb={2}>
          <MDBox display="flex" sx={{ justifyContent: "space-between" }}>
            <MDTypography
              align="left"
              sx={{
                fontSize: 14,
              }}
            >
              Income
            </MDTypography>

            <MDTypography
              align="right"
              sx={{
                fontSize: 14,
              }}
            >
              {details.Income}
            </MDTypography>
          </MDBox>
          <Divider sx={{ borderStyle: "dashed" }} />
          <MDBox display="flex" sx={{ justifyContent: "space-between" }}>
            <MDTypography
              align="left"
              sx={{
                fontSize: 14,
              }}
            >
              Coasts
            </MDTypography>

            <MDTypography
              align="right"
              sx={{
                fontSize: 14,
              }}
            >
              {details.Coast}
            </MDTypography>
          </MDBox>
          <Divider sx={{ borderStyle: "dashed" }} />
          <MDBox display="flex" sx={{ justifyContent: "space-between" }}>
            <MDTypography
              align="left"
              sx={{
                fontSize: 14,
              }}
            >
              NOI
            </MDTypography>

            <MDTypography
              align="right"
              sx={{
                fontSize: 14,
              }}
            >
              {details.NOI}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the BookingCard
EIProjectCardWhite.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.node.isRequired,
  state: PropTypes.string.isRequired,
  details: PropTypes.PropTypes.object.isRequired,
  tags: PropTypes.PropTypes.array.isRequired,
};

export default EIProjectCardWhite;
