"use client";
import { Alert, Button, Card } from "@mui/material";
import { useState, useEffect, useRef, useTransition } from "react";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import DataTable from "@/admin/components/UsersDataTable";
import MDButton from "../../../../../components/MDButton";
import colors from "../../../../../assets/theme/base/colors";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import changeUserStatus from "../../serverActions/changeUserStatus";
import EILoader from "../../../../../components/EILoader";
import deleteUser from "../../serverActions/deleteUser";

export default function UsersList({ data }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [alert, setAlert] = useState({
    isVisible: false,
    message: "",
    severity: "",
  });

  const changeStatus = async (userId, newStatus) => {
    startTransition(async () => {
      const response = await changeUserStatus(userId, newStatus);

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
    });
  };

  const deleteUserHandlre = async (userId) => {
    const confirmResponse = confirm("do you really want to delete this User ?");

    confirmResponse &&
      startTransition(async () => {
        const response = await deleteUser(userId);

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
              Manage your clients
            </MDTypography>
            <MDTypography variant="button" color="text">
              Here you can find the list of all users.
            </MDTypography>
          </MDBox>
          <MDBox>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ bgcolor: colors.escharaThemePrimary.main, color: "#FFF" }}
              onClick={() =>
                startTransition(() => {
                  router.push("/admin/users/add-user");
                })
              }
            >
              Add new user
            </Button>
          </MDBox>
        </MDBox>
        <DataTable
          table={data}
          onChangeStatus={changeStatus}
          OnDeleteUser={deleteUserHandlre}
        />
      </Card>
    </>
  );
}
