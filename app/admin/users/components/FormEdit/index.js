"use client";
import React, { useState, useTransition } from "react";
import { Alert, Autocomplete, Button } from "@mui/material";
import { Card, Grid } from "@mui/material";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";

import FormField from "../../../../../components/FormField";
import MDButton from "../../../../../components/MDButton";
import editUser from "../../serverActions/editUser";
import { redirect, useRouter } from "next/navigation";
import { Cancel, Send } from "@mui/icons-material";
import colors from "../../../../../assets/theme/base/colors";
import EILoader from "../../../../../components/EILoader";

function FormEdit({ roles, user }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
  });
  const [formValues, setFormValues] = useState({
    ...user,
    status: user.status ? "Active" : "Inactive",
  });

  const onSubmit = async () => {
    startTransition(async () => {
      const editUserResponse = await editUser(formValues);

      if (editUserResponse.errors) {
        setAlert({
          severity: "error",
          message: Object.values(editUserResponse.errors)[0],
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setAlert({ severity: "success", message: editUserResponse.message });

        router.push("/admin/users");
      }
    });
  };

  return (
    <>
      <EILoader open={isPending} />
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={10}>
          <MDBox mt={6} mb={8} textAlign="center">
            <MDBox mb={1}>
              <MDTypography variant="h3" fontWeight="bold">
                Edit User informations
              </MDTypography>
            </MDBox>
            <MDTypography variant="h5" fontWeight="regular" color="secondary">
              This information will describe more about the User.
            </MDTypography>
          </MDBox>
          <Card>
            {alert.severity != "" && alert.message != "" && (
              <Alert severity={alert.severity}>{alert.message}</Alert>
            )}
            <MDBox mt={3} mb={3} mx={2} spacing={20}>
              <MDTypography variant="h5" mb={5}>
                User Information
              </MDTypography>
              <MDBox mt={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      value={formValues.first_name}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          first_name: e.target.value,
                        });
                      }}
                      type="text"
                      label="First Name"
                      placeholder="User first name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      value={formValues.last_name}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          last_name: e.target.value,
                        });
                      }}
                      type="text"
                      label="Last Name"
                      placeholder="User last name"
                    />
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox mt={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      value={formValues.email}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          email: e.target.value,
                        });
                      }}
                      type="email"
                      label="Email"
                      placeholder="user@example.com"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      value={formValues.password}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          password: e.target.value,
                        });
                      }}
                      type="password"
                      label="Password"
                      placeholder="password"
                    />
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox mt={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={3}>
                      <Autocomplete
                        value={formValues.role}
                        inputValue={formValues.role}
                        onInputChange={(event, newInputValue) => {
                          setFormValues({
                            ...formValues,
                            role: newInputValue,
                          });
                        }}
                        options={roles.roles.map((role) => role.name)}
                        renderInput={(params) => (
                          <FormField
                            {...params}
                            variant="outlined"
                            label="Role"
                          />
                        )}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={3}>
                      <Autocomplete
                        value={formValues.status}
                        inputValue={formValues.status}
                        onInputChange={(event, newInputValue) => {
                          setFormValues({
                            ...formValues,
                            status: newInputValue,
                          });
                        }}
                        options={["Active", "Inactive"]}
                        renderInput={(params) => (
                          <FormField
                            {...params}
                            variant="outlined"
                            label="Status"
                          />
                        )}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox mt={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={3}>
                      {/* <MDEditor value={editorValue} onChange={setEditorValue} /> */}
                      <FormField
                        value={formValues.address}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            address: e.target.value,
                          });
                        }}
                        label="Address"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={3}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={3}>
                      <FormField
                        value={formValues.address2}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            address2: e.target.value,
                          });
                        }}
                        label="Additional address"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={3}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox mt={5}>
                <Grid container spacing={3}>
                  {/* <Grid item xs={12} sm={4}>
                    <MDBox mb={3}>
                      <FormField
                        value={parseInt(formValues.zip_code)}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            zip_code: e.target.value,
                          });
                        }}
                        type="number"
                        variant="outlined"
                        label="Zip code"
                        placeholder="00000"
                      />
                    </MDBox>
                  </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={3}>
                      <FormField
                        value={formValues.town}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            town: e.target.value,
                          });
                        }}
                        label="Town"
                        variant="outlined"
                        type="text"
                        placeholder="Your town"
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={3}>
                      <FormField
                        value={formValues.country}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            country: e.target.value,
                          });
                        }}
                        label="Country"
                        variant="outlined"
                        type="text"
                        placeholder="Your country"
                      />
                    </MDBox>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={3}>
                      <FormField
                        value={formValues.phone}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            phone: e.target.value,
                          });
                        }}
                        label="Phone"
                        variant="outlined"
                        type="tel"
                        placeholder="Your phone"
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={3}>
                      <FormField
                        value={formValues.zip_code}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            zip_code: e.target.value,
                          });
                        }}
                        type="number"
                        variant="outlined"
                        label="Zip code"
                        placeholder="00000"
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox mt={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={3}>
                      {/* <MDEditor value={editorValue} onChange={setEditorValue} /> */}
                      <FormField
                        value={formValues.comment}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            comment: e.target.value,
                          });
                        }}
                        label="Comment"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={3}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={3}>
                      {/* <MDEditor value={editorValue} onChange={setEditorValue} /> */}
                      <FormField
                        value={formValues.parts}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            parts: e.target.value,
                          });
                        }}
                        type="number"
                        label="Parts"
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>

            <MDBox m={2} gap={2} display="flex">
              <Button
                onClick={() => router.push("/admin/users")}
                variant="contained"
                endIcon={<Cancel />}
                sx={{
                  backgroundColor: colors.grey[300],
                  color: colors.grey[700],
                  "&:hover": {
                    backgroundColor: colors.grey[300],
                    color: colors.grey[700],
                  },
                  "&:focus:not(:hover)": {
                    backgroundColor: colors.grey[300],
                    color: colors.grey[700],
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => startTransition(onSubmit)}
                disabled={isPending}
                variant="contained"
                endIcon={<Send />}
                sx={{
                  backgroundColor: colors.escharaThemeSecondary.main,
                  color: colors.white.main,

                  "&:hover": {
                    backgroundColor: colors.escharaThemeSecondary.main,
                    color: colors.white.main,
                  },
                }}
              >
                Update
              </Button>
            </MDBox>

            {/* <Button onClick={onSubmit} disabled={isPending}

          sx={{ bac }}>
            Create User
          </Button> */}
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default FormEdit;
