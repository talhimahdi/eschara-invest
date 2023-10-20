"use client";
import { Alert, Button, Card, Chip } from "@mui/material";
import { useState, useEffect, useRef, useTransition } from "react";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import OpportunitiesDataTable from "@/admin/components/OpportunitiesDataTable";
import colors from "../../../../../assets/theme/base/colors";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import deleteOpportunity from "../../serverActions/deleteOpportunity";
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
        Header: "Image",
        accessor: "gallery",
        Cell: ({ value, row }) => {
          return <img width={120} height={80} src={value[0]} />;
        },
      },
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
          );
        },
      },
      { Header: "Manager", accessor: "manager.full_name" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value, row }) => {
          return (
            <MDBox
              bgColor={value.color}
              color="white"
              textAlign="center"
              sx={{ paddingY: 0.5, paddingX: 1, borderRadius: 1 }}
            >
              {value.name}
            </MDBox>
          );
        },
      },
      { Header: "google map", accessor: "google_map" },

      {
        Header: "Tags",
        accessor: "tags",
        width: "10%",
        Cell: ({ value, row }) => {
          return (
            <MDBox width={300}>
              {value &&
                Array.isArray(value) &&
                value.map((tag, index) => {
                  return (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      // onDelete={handleTagDelete}
                      // onDelete={(e) => handleTagDelete(e, tag)}
                      sx={{
                        mr: 0.8,
                        my: 0.5,
                      }}
                    />
                  );
                })}
            </MDBox>
          );
        },
      },
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
        Header: "Specifications",
        accessor: "property_description",
        width: "10%",
        Cell: ({ value, row }) => {
          return (
            <MDBox width={300}>
              {value &&
                Array.isArray(value) &&
                value.map((property, index) => {
                  return (
                    <Chip
                      key={index}
                      label={property.key + " : " + property.value}
                      size="small"
                      // onDelete={handleTagDelete}
                      // onDelete={(e) => handleTagDelete(e, tag)}
                      sx={{
                        mr: 0.8,
                        my: 0.5,
                      }}
                    />
                  );
                })}
            </MDBox>
          );
        },
      },
      {
        Header: "Total value",
        accessor: "total_value",
        Cell: ({ value, row }) => {
          return (
            <MDBox width={300}>
              {value && (
                <Chip
                  label={value}
                  size="small"
                  // onDelete={handleTagDelete}
                  // onDelete={(e) => handleTagDelete(e, tag)}
                  sx={{
                    mr: 0.8,
                    my: 0.5,
                  }}
                />
              )}
            </MDBox>
          );
        },
      },
      { Header: "Expiration date", accessor: "expiration_date" },
    ],
    rows: opportunities,
  };

  const handleDeleteOpportunity = async (OpportunityId) => {
    const confirmResponse = confirm(
      "do you really want to delete this Opportunity ?"
    );

    confirmResponse &&
      startTransition(async () => {
        const response = await deleteOpportunity(OpportunityId);

        if (response.status) {
          setAlert({
            isVisible: true,
            message: response.message,
            severity: "success",
          });
        }

        if (response.error) {
          setAlert({
            isVisible: true,
            message: response.error.message.message,
            severity: "error",
          });
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      });
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
              onClick={() =>
                startTransition(() => {
                  router.push("/admin/opportunities/add-opportunity");
                })
              }
            >
              Add new opportunity
            </Button>
          </MDBox>
        </MDBox>
        <OpportunitiesDataTable
          table={tableData}
          OnDeleteOpportunity={handleDeleteOpportunity}
        />
      </Card>
    </>
  );
}
