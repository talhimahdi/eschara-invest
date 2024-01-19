"use client";

import {
    Icon,
} from "@mui/material";
import MDBox from "../../components/MDBox";
import Carousel from "react-material-ui-carousel";

export default function EIOpportunitySlider({
    images,
    openModal,
}) {

    return (
        <MDBox>
            <MDBox
                sx={{
                    position: "absolute",
                    zIndex: 2,
                    right: 40,
                    marginTop: "14px",
                    fontSize: 30,
                    width: 30,
                    height: 30,
                    padding: 0,
                    alignItems: "center",
                    justifyItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    cursor: "pointer",
                }}
                onClick={openModal}
            >
                <Icon sx={{ color: "#FFFFFF" }}>zoom_out_map</Icon>
            </MDBox>
            <Carousel
                autoPlay={false}
                cycleNavigation={images?.length > 1}
                navButtonsAlwaysVisible={true}
                indicators={images?.length > 1}
                animation="slide"
                duration={300}
                sx={{
                    "& .MuiIconButton-root": {
                        backgroundColor: "#00000000",
                        //   color: colors.escharaThemePrimary.main,

                        padding: 0,
                        marginLeft: 3,
                        marginRight: 3,
                        // zIndex: 0,
                    },
                    "& .MuiIconButton-root:hover": {
                        backgroundColor: "#00000000",
                        //   color: colors.escharaThemePrimary.main,
                    },
                }}
                indicatorIconButtonProps={{
                    style: {
                        width: 14,
                        height: 14,
                        padding: 0,
                        margin: 3,
                        color: "transparent",
                        border: "2px solid white",
                        zIndex: 2,
                    },
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        padding: 0,
                        color: "white",
                        //   border: "2px solid white",
                    },
                }}
                indicatorContainerProps={{
                    style: {
                        position: "absolute",
                        // zIndex: 1,
                        bottom: 20, // 5
                        textAlign: "center", // 4
                    },
                }}
                IndicatorIcon={
                    <Icon
                    // sx={{ padding: 0, margin: 0, width: 24, height: 24 }}
                    >
                        fiber_manual_record
                    </Icon>
                }
                PrevIcon={<Icon>arrow_back_ios_outlined</Icon>}
                NextIcon={<Icon>arrow_forward_ios</Icon>}
            >
                {images?.map((imageUrl, index) => (
                    <MDBox key={index} height={400}>
                        <MDBox
                            color="white"
                            textAlign="center"
                            sx={{
                                backgroundImage: `url(${imageUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                width: "100%",
                                height: "100%",
                            }}
                        ></MDBox>
                    </MDBox>
                ))}
            </Carousel>
        </MDBox>
    );
}
