"use client";

import { ListManager } from "react-beautiful-dnd-grid";
import { useState } from "react";

import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import colors from "../../assets/theme/base/colors";
import Image from "next/image";

export default function EIDragableImages({ images, setImages, onImageDelete }) {
  const handleDragEnd = (sourceIndex, destinationIndex) => {
    if (!destinationIndex) return;

    let tempData = Array.from(images);
    let [source_data] = tempData.splice(sourceIndex, 1);
    tempData.splice(destinationIndex, 0, source_data);
    setImages(tempData);
  };

  const ListElement = ({ item: { url, name } }) => {
    const image = { url, name };

    return (
      <MDBox
        sx={{
          m: "5px",
          pt: 1,
          pb: 3,
          px: 1,
          backgroundColor: colors.grey[300],
          boxShadow: "0px 1px 2px rgb(0 0 0 / 50%)",
          borderRadius: 1,
          position: "relative",
        }}
      >
        <MDBox
          color="white"
          textAlign="center"
          sx={{
            backgroundImage: `url(${url})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: 120,
            height: 100,
          }}
        ></MDBox>
        <Icon
          sx={{
            fontSize: "small",
            color: "#ff0000",
            cursor: "pointer",
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
          onClick={(e) => onImageDelete(e, image)}
        >
          delete_outline
        </Icon>
      </MDBox>
    );
  };

  return (
    <MDBox>
      <ListManager
        items={images}
        direction={"horizontal"}
        maxItems={3}
        render={(item) => <ListElement item={item} />}
        onDragEnd={handleDragEnd}
      />
      <MDBox sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: 12 }}>
          You can reorder the images by drag and drop
        </Typography>
      </MDBox>
    </MDBox>
  );
}
