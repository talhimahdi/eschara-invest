"use client";
import { Alert, Button, Card } from "@mui/material";
import { useState, useEffect, useRef, useTransition } from "react";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import OpportunitiesDataTable from "@/admin/components/OpportunitiesDataTable";
import colors from "../../../../../assets/theme/base/colors";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import EILoader from "../../../../../components/EILoader";

export default function OpportunitiesList({ opportunities }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [alert, setAlert] = useState({
    isVisible: false,
    message: "",
    severity: "",
  });

  const tableData = {
    columns: [
      { Header: "ID", accessor: "id", width: "10px" },
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ value, row }) => {
          return (
            <MDTypography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                width: 300,

                fontSize: "inherit",
                color: "inherit",
              }}
            >
              {value}
            </MDTypography>

            // <MDTypography
            //   paragraph
            //   variant="paragraph"
            //   sx={{
            //     mt: 0.5,
            //     mb: 1,
            //     ml: 2,
            //     fontSize: "medium",
            //     display: "block",
            //   }}
            //   style={{ wordWrap: "break-word" }}
            // >
            //   {value}
            // </MDTypography>
          );
        },
      },
      { Header: "Manager", accessor: "manager.full_name" },
      { Header: "Status", accessor: "status" },
      { Header: "Commitment", accessor: "commitment" },
      { Header: "soft commitment", accessor: "soft_commitment" },
      { Header: "google map", accessor: "google_map" },
      { Header: "Tags", accessor: "tags" },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ value, row }) => {
          return (
            <MDTypography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                width: 300,

                fontSize: "inherit",
                color: "inherit",
              }}
            >
              {value}
            </MDTypography>
          );
        },
      },
      {
        Header: "terms & conditions",
        accessor: "terms_conditions",
        Cell: ({ value, row }) => {
          return (
            <MDTypography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                width: 300,

                fontSize: "inherit",
                color: "inherit",
              }}
            >
              {value}
            </MDTypography>
          );
        },
      },
      {
        Header: "analysis",
        accessor: "analysis",
        Cell: ({ value, row }) => {
          return (
            <MDTypography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                width: 300,

                fontSize: "inherit",
                color: "inherit",
              }}
            >
              {value}
            </MDTypography>
          );
        },
      },
      {
        Header: "financial parameters",
        accessor: "financial_parameters",
        Cell: ({ value, row }) => {
          return (
            <MDTypography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                width: 300,

                fontSize: "inherit",
                color: "inherit",
              }}
            >
              {value}
            </MDTypography>
          );
        },
      },
    ],
    rows: opportunities,
    // ? opportunities.map((opportunity) => ({
    //     ...opportunity,
    //     title: opportunity.title.substring(0, 60) + "...",
    //   }))
    // : [],
  };

  return (
    <>
      <EILoader open={isPending} />
      <Card sx={{ p: 2 }}>
        {alert.isVisible && alert.message != "" && (
          <Alert
            severity={alert.severity}
            onClose={() => {
              setAlert({ isVisible: false, message: "", severity: "" });
            }}
            sx={{ mb: 2 }}
          >
            {alert.message}
          </Alert>
        )}
        <MDBox
          p={1}
          lineHeight={1}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <MDBox>
            <MDTypography variant="h5" fontWeight="medium">
              Manage your Opportunities
            </MDTypography>
            <MDTypography variant="button" color="text">
              Here you can find the list of all Opportunities.
            </MDTypography>
          </MDBox>
          <MDBox>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ bgcolor: colors.escharaThemePrimary.main, color: "#FFF" }}
              // onClick={() =>
              //   startTransition(() => {
              //     router.push("/admin/users/add-user");
              //   })
              // }
            >
              Add new opportunity
            </Button>
          </MDBox>
        </MDBox>
        <OpportunitiesDataTable table={tableData} />
      </Card>
    </>
  );
}
