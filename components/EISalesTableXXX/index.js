import { useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// NextJS Material Dashboard 2 PRO components
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";

// NextJS Material Dashboard 2 PRO examples
import EISalesTableCell from "./EISalesTableCell";
import { TableCell } from "@mui/material";

function EISalesTable({ title = "", rows = [{}], shadow = true }) {
  const renderTableCells = rows.map((row, key) => {
    const tableRows = [];
    const rowKey = `row-${key}`;

    Object.entries(row).map(([cellTitle, cellContent]) =>
      tableRows.push(
        <EISalesTableCell
          key={cellContent}
          title={cellTitle}
          content={cellContent}
          noBorder={key === rows.length - 1}
        />
      )
    );

    return <TableRow key={rowKey}>{tableRows}</TableRow>;
  });

  return (
    <TableContainer sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <Table>
        <TableHead>
          {title ? (
            <MDBox component="tr" width="max-content" display="block" mb={1.5}>
              <MDTypography variant="h6" component="td">
                {title}
              </MDTypography>
            </MDBox>
          ) : null}
          <TableRow>
            <EISalesTableCell key="ID" title="ID" content="ID" />
            <EISalesTableCell key="Name" title="Name" content="Name" />
            <EISalesTableCell key="Surface" title="Surface" content="Surface" />
            <EISalesTableCell key="Status" title="Status" content="Status" />
          </TableRow>
        </TableHead>
        <TableBody>
          {useMemo(() => renderTableCells, [renderTableCells])}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Typechecking props for the SalesTable
EISalesTable.propTypes = {
  title: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.object),
  shadow: PropTypes.bool,
};

export default EISalesTable;
