"use client";

import { useMemo, useEffect, useState, useTransition } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
} from "react-table";

// regenerator-runtime
import "regenerator-runtime/runtime.js";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDPagination from "/components/MDPagination";

// NextJS Material Dashboard 2 PRO examples
import DataTableHeadCell from "./DataTableHeadCell";
import DataTableBodyCell from "./DataTableBodyCell";
import { Fab, Stack, Switch, Typography } from "@mui/material";
import colors from "../../../../assets/theme/base/colors";
import { useRouter } from "next/navigation";
import EILoader from "../../../../components/EILoader";

function DataTable({
  entriesPerPage = { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch = false,
  showTotalEntries = true,
  pagination = { variant: "gradient", color: "dark" },
  isSorted = true,
  noEndBorder = false,
  table,

  onChangeStatus = null,
  OnDeleteUser = null,
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const defaultValue = entriesPerPage.defaultValue
    ? entriesPerPage.defaultValue
    : 10;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["5", "10", "15", "20", "25"];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue, setPageSize]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0
      ? gotoPage(0)
      : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) =>
    gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart =
    pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  const handleChangeStatus = async (column) => {
    const userId = column.row.values.id;
    const currentStatus = parseInt(column.value);

    await onChangeStatus(userId, !currentStatus);
  };

  return (
    <>
      <EILoader open={isPending} />
      <TableContainer sx={{ boxShadow: "none" }}>
        {entriesPerPage || canSearch ? (
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={3}
          >
            {entriesPerPage && (
              <MDBox display="flex" alignItems="center">
                <Autocomplete
                  disableClearable
                  value={pageSize.toString()}
                  options={entries}
                  onChange={(event, newValue) => {
                    setEntriesPerPage(parseInt(newValue, 10));
                  }}
                  size="small"
                  sx={{ width: "5rem" }}
                  renderInput={(params) => <MDInput {...params} />}
                />
                <MDTypography variant="caption" color="secondary">
                  &nbsp;&nbsp;entries per page
                </MDTypography>
              </MDBox>
            )}
            {canSearch && (
              <MDBox width="12rem" ml="auto">
                <MDInput
                  placeholder="Search..."
                  value={search}
                  size="small"
                  fullWidth
                  onChange={({ currentTarget }) => {
                    setSearch(search);
                    onSearchChange(currentTarget.value);
                  }}
                />
              </MDBox>
            )}
          </MDBox>
        ) : null}
        <Table {...getTableProps()}>
          <MDBox component="thead">
            {headerGroups.map((headerGroup, key) => {
              const cellProps = headerGroup.getHeaderGroupProps();

              const cellKey = cellProps.key;

              delete cellProps.key;
              return (
                <TableRow key={cellKey} {...cellProps}>
                  {headerGroup.headers.map((column, key) => {
                    const cellProps = column.getHeaderProps(
                      isSorted && column.getSortByToggleProps()
                    );

                    const cellKey = cellProps.key;

                    delete cellProps.key;

                    return (
                      <DataTableHeadCell
                        key={cellKey}
                        {...cellProps}
                        width={column.width ? column.width : "auto"}
                        align={column.align ? column.align : "left"}
                        sorted={setSortedValue(column)}
                      >
                        {column.render("Header")}
                      </DataTableHeadCell>
                    );
                  })}
                  <DataTableHeadCell key={"actions-key"} sorted={false}>
                    {"Actions"}
                  </DataTableHeadCell>
                </TableRow>
              );
            })}
          </MDBox>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, key) => {
              prepareRow(row);

              const cellProps = row.getRowProps();

              const cellKey = cellProps.key;

              delete cellProps.key;

              return (
                <TableRow key={cellKey} {...cellProps}>
                  {row.cells.map((cell) => {
                    const cellProps = cell.getCellProps();

                    const cellKey = cellProps.key;

                    delete cellProps.key;
                    return (
                      <DataTableBodyCell
                        key={cellKey}
                        noBorder={noEndBorder && rows.length - 1 === key}
                        align={cell.column.align ? cell.column.align : "left"}
                        {...cellProps}
                      >
                        {cell.column.Header.toLowerCase() === "status" ? (
                          <MDBox
                            display="flex"
                            direction="row"
                            alignItems="center"
                          >
                            <MDTypography
                              sx={{
                                fontSize: 10,
                              }}
                            >
                              Inactive
                            </MDTypography>
                            <Switch
                              checked={parseInt(cell.value)}
                              onChange={() => handleChangeStatus(cell)}
                              color="primary"
                              value="dynamic-class-name"
                            />
                            <MDTypography
                              sx={{
                                fontSize: 10,
                              }}
                            >
                              Active
                            </MDTypography>
                          </MDBox>
                        ) : (
                          cell.render("Cell")
                        )}
                      </DataTableBodyCell>
                    );
                  })}
                  <DataTableBodyCell key={"actionsCell-key"}>
                    {row.original.actions && (
                      <MDBox sx={{ display: "flex", gap: 1 }}>
                        <Fab
                          size="small"
                          // color="escharaThemePrimary"
                          aria-label="edit"
                          // href={row.original.actions.edit}
                          sx={{
                            backgroundColor: colors.escharaThemePrimary.main,
                            "&:hover": {
                              backgroundColor: colors.escharaThemePrimary.main,
                            },
                          }}
                          onClick={() =>
                            startTransition(() => {
                              router.push(row.original.actions.edit);
                            })
                          }
                        >
                          <Icon sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                            edit
                          </Icon>
                        </Fab>
                        <Fab
                          size="small"
                          aria-label="delete"
                          // href={row.original.actions.delete}
                          sx={{
                            backgroundColor: colors.error.main,
                            "&:hover": {
                              backgroundColor: colors.error.main,
                            },
                          }}
                          onClick={() => OnDeleteUser(row.original.id)}
                        >
                          <Icon sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                            delete
                          </Icon>
                        </Fab>
                      </MDBox>
                    )}
                  </DataTableBodyCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <MDBox
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
        >
          {showTotalEntries && (
            <MDBox mb={{ xs: 3, sm: 0 }}>
              <MDTypography
                variant="button"
                color="secondary"
                fontWeight="regular"
              >
                Showing {entriesStart} to {entriesEnd} of {rows.length} entries
              </MDTypography>
            </MDBox>
          )}
          {pageOptions.length > 1 && (
            <MDPagination
              variant={pagination.variant ? pagination.variant : "gradient"}
              color={pagination.color ? pagination.color : "dark"}
            >
              {canPreviousPage && (
                <MDPagination item onClick={() => previousPage()}>
                  <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
                </MDPagination>
              )}
              {renderPagination.length > 6 ? (
                <MDBox width="5rem" mx={1}>
                  <MDInput
                    inputProps={{
                      type: "number",
                      min: 1,
                      max: customizedPageOptions.length,
                    }}
                    value={customizedPageOptions[pageIndex]}
                    onChange={
                      (handleInputPagination, handleInputPaginationValue)
                    }
                  />
                </MDBox>
              ) : (
                renderPagination
              )}
              {canNextPage && (
                <MDPagination item onClick={() => nextPage()}>
                  <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
                </MDPagination>
              )}
            </MDPagination>
          )}
        </MDBox>
      </TableContainer>
    </>
  );
}

// Setting default values for the props of DataTable
// DataTable.defaultProps = {
//   entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
//   canSearch: false,
//   showTotalEntries: true,
//   pagination: { variant: "gradient", color: "dark" },
//   isSorted: true,
//   noEndBorder: false,
// };

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default DataTable;
