"use client";

// import "./styles.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import { Icon, Table, TableBody, TableCell, TableRow } from "@mui/material";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import colors from "../../assets/theme/base/colors";

export default function EIDragableTable({ properties, setProperties }) {
  const handleDragEnd = (e) => {
    const { draggableId, source, destination } = e;
    if (!destination) return;

    let tempData = Array.from(properties);
    let [source_data] = tempData.splice(source.index, 1);
    tempData.splice(destination.index, 0, source_data);
    setProperties(tempData);
  };

  const handleDeleteProperty = (property) => {
    setProperties([...properties.filter((e) => e != property)]);

    // setProperties((state) => ({ ...state, property_description: tempData }));
  };

  return (
    <MDBox>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Table>
          {/* <MDBox component="thead">
            <TableRow>
              <TableCell sx={{ fontSize: 12 }}></TableCell>
              <TableCell sx={{ fontSize: 12 }}>Name</TableCell>
              <TableCell sx={{ fontSize: 12 }}>Value</TableCell>
            </TableRow>
          </MDBox> */}
          <Droppable droppableId="droppable-1">
            {(provider) => (
              <TableBody
                className="text-capitalize"
                ref={provider.innerRef}
                {...provider.droppableProps}
              >
                {properties.length > 0 ? (
                  properties?.map((property, index) => (
                    <Draggable
                      key={property.key}
                      draggableId={property.key}
                      index={index}
                    >
                      {(provider) => (
                        <TableRow
                          {...provider.draggableProps}
                          ref={provider.innerRef}
                          sx={{ fontSize: 100 }}
                        >
                          <TableCell {...provider.dragHandleProps}>
                            <Icon>drag_indicator</Icon>
                          </TableCell>
                          <TableCell sx={{ fontSize: 13, fontWeight: "bold" }}>
                            {property.key}
                          </TableCell>
                          <TableCell sx={{ fontSize: 13, fontWeight: "bold" }}>
                            {property.value}
                          </TableCell>
                          <TableCell sx={{ fontSize: 13, fontWeight: "bold" }}>
                            <Icon
                              sx={{
                                fontSize: "small",
                                color: "#ff0000",
                                cursor: "pointer",
                              }}
                              onClick={() => handleDeleteProperty(property)}
                            >
                              delete_outline
                            </Icon>
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <MDTypography
                    mb={5}
                    sx={{
                      fontSize: 12,
                      color: colors.grey[500],
                    }}
                  >
                    No Property selected.
                  </MDTypography>
                )}
                {provider.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </MDBox>
  );
}
