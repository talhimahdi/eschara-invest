import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MDBox from "../MDBox";

import colors from "../../assets/theme/base/colors";

export default function EIOpportunitiesTable({ rows }) {
  const renderStatus = (status) => {
    const statusColor = Object.keys(colors.escharaThemeStatusColors).find(
      (color) => color === status.toLowerCase()
    );

    return (
      <MDBox
        bgColor={colors.escharaThemeStatusColors[statusColor]}
        color="white"
        textAlign="center"
        sx={{ paddingY: 0.5, paddingX: 1, borderRadius: 1 }}
      >
        {status}
      </MDBox>
    );
  };
  return (
    <TableContainer sx={{ boxShadow: 0 }}>
      <Table sx={{ minWidth: 550 }}>
        <TableBody>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: 13, paddingY: 2 }}>
              ID
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 13, paddingY: 2 }}>
              Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 13, paddingY: 2 }}>
              Surface
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 13, paddingY: 2 }}>
              Typology
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontSize: 13,
                p: 0,

                height: "1px",

                position: "sticky",
                right: 0,
                border: 0,
              }}
            >
              <MDBox
                sx={{
                  boxShadow: 1,
                  width: "100%",
                  height: "100%",
                  fontSize: 12,
                  padding: 1,
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                Status
              </MDBox>
            </TableCell>
          </TableRow>
          {rows.map((row, key) => (
            <TableRow
              key={key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ fontSize: 12, paddingY: 3 }}>{row.id}</TableCell>
              <TableCell sx={{ fontSize: 12, paddingY: 3 }}>
                {row.name}
              </TableCell>
              <TableCell sx={{ fontSize: 12, paddingY: 3 }}>
                {row.surface}
              </TableCell>
              <TableCell sx={{ fontSize: 12, paddingY: 3 }}>
                {row.typology}
              </TableCell>
              <TableCell
                sx={{
                  height: "1px",
                  p: 0,
                  position: "sticky",
                  right: 0,
                  border: 0,
                }}
              >
                <MDBox
                  sx={{
                    boxShadow: 1,
                    height: "100%",
                    fontSize: 12,
                    padding: 1,
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  {renderStatus(row.status)}
                </MDBox>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
