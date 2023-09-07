"use client";
import React, { useMemo, useState, useTransition } from "react";
import {
  Alert,
  Autocomplete,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Card, Grid } from "@mui/material";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";

import FormField from "../../../../../components/FormField";
import addOpportunity from "../../serverActions/addOpportunity";
import { useRouter } from "next/navigation";
import { Cancel, Send } from "@mui/icons-material";
import colors from "../../../../../assets/theme/base/colors";
import EILoader from "../../../../../components/EILoader";
import MDDropzone from "../../../../../components/MDDropzone";

function FormAdd() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImages, setPreviewImages] = useState([]);
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
  });
  const [formValues, setFormValues] = useState({
    title: "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    manager_id: 1,
    status: "Available",
    analysis: "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    terms_conditions:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    description: "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    commitment: 12.12,
    soft_commitment: 11.11,
    financial_parameters:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    google_map: "11.22,211.33",
    tags: ["Expired", "Out of Stock", "In Stock", "Sale"],
    gallery: [],
  });

  const status = ["Available", "Ongoing", "Closed", "Rejected"];

  const onSubmit = async () => {
    const addOpportunityResponse = await addOpportunity(formValues);

    if (addOpportunityResponse.errors) {
      setAlert({
        severity: "error",
        message: Object.values(addOpportunityResponse.errors)[0],
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setAlert({
        severity: "success",
        message: addOpportunityResponse.message,
      });

      router.push("/admin/opportunities");
    }
  };

  const handleTagDelete = (e, value) => {
    setFormValues({
      ...formValues,
      tags: [
        ...formValues.tags.filter(
          (tag) => tag.toLowerCase() != value.toLowerCase()
        ),
      ],
    });
  };

  async function convert2DataUrl(blobOrFile) {
    let reader = new FileReader();
    reader.readAsDataURL(blobOrFile);
    await new Promise((resolve) => (reader.onload = () => resolve()));
    return reader.result;
  }

  const handleFiles = async (e) => {
    var files = Array.from(e.target.files);

    const imagesObj = Promise.all(
      files.map(async (file) => {
        setPreviewImages((state) => [...state, URL.createObjectURL(file)]);
        const base64 = await convert2DataUrl(file);
        return {
          name: file.name,
          size: file.size,
          type: file.type,
          data: base64,
        };
      })
    );

    const images = await imagesObj;

    setFormValues({ ...formValues, gallery: images });
  };

  return (
    <>
      <EILoader open={isPending} />
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={10}>
          <MDBox mt={6} mb={8} textAlign="center">
            <MDBox mb={1}>
              <MDTypography variant="h3" fontWeight="bold">
                Add New Opportunity
              </MDTypography>
            </MDBox>
            <MDTypography variant="h5" fontWeight="regular" color="secondary">
              This information will describe more about the Opportunity.
            </MDTypography>
          </MDBox>
          <Card>
            {alert.severity != "" && alert.message != "" && (
              <Alert severity={alert.severity}>{alert.message}</Alert>
            )}
            <MDBox mt={3} mb={3} mx={2} spacing={20}>
              <MDTypography variant="h5" mb={5}>
                Opportunity Information
              </MDTypography>
              <MDBox mt={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <MDBox my={3}>
                      <Button
                        variant="contained"
                        component="label"
                        sx={{
                          backgroundColor: colors.escharaThemeSecondary.main,
                          color: colors.white.main,
                          "&:hover": {
                            backgroundColor: colors.escharaThemeSecondary.main,
                            color: colors.white.main,
                          },
                        }}
                      >
                        Add images
                        <input
                          hidden
                          accept=".jpg,.png"
                          multiple
                          type="file"
                          name="gallery"
                          onChange={handleFiles}
                        />
                      </Button>
                      <MDBox sx={{ display: "flex", mt: 3 }}>
                        {previewImages.map((prv) => (
                          <MDBox
                            key={prv}
                            color="white"
                            textAlign="center"
                            sx={{
                              pr: 1,
                            }}
                          >
                            <img
                              src={prv}
                              width={100}
                              height={80}
                              style={{ borderRadius: 5 }}
                            />
                          </MDBox>
                        ))}
                      </MDBox>
                    </MDBox>
                    {/* <MDBox my={3}>
                      <MDBox
                        mb={1}
                        ml={0.5}
                        lineHeight={0}
                        display="inline-block"
                      >
                        <MDTypography
                          component="label"
                          variant="button"
                          fontWeight="regular"
                          color="text"
                        >
                          Images gallery
                        </MDTypography>
                      </MDBox>
                      {useMemo(
                        () => (
                          <MDDropzone
                            options={{ addRemoveLinks: true }}
                            onDrop={(acceptedFiles) =>
                              console.log(acceptedFiles)
                            }
                          />
                        ),
                        []
                      )}
                    </MDBox> */}
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      value={formValues.title}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          title: e.target.value,
                        });
                      }}
                      type="text"
                      label="Title"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      value={formValues.status}
                      inputValue={formValues.status}
                      onInputChange={(event, newInputValue) => {
                        setFormValues({
                          ...formValues,
                          status: newInputValue,
                        });
                      }}
                      options={status}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          variant="outlined"
                          label="Status"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox mt={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      value={formValues.commitment}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          commitment: e.target.value,
                        });
                      }}
                      type="number"
                      label="Commitment"
                      placeholder="0.00"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      value={formValues.soft_commitment}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          soft_commitment: e.target.value,
                        });
                      }}
                      type="soft_commitment"
                      label="Soft Commitment"
                      placeholder="0.00"
                    />
                  </Grid>
                </Grid>
              </MDBox>

              <MDBox mt={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={3}>
                      {/* <MDEditor value={editorValue} onChange={setEditorValue} /> */}
                      <FormField
                        value={formValues.description}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            description: e.target.value,
                          });
                        }}
                        label="Description"
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
                        value={formValues.analysis}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            analysis: e.target.value,
                          });
                        }}
                        label="Analysis"
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
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={3}>
                      <FormField
                        value={formValues.financial_parameters}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            financial_parameters: e.target.value,
                          });
                        }}
                        label="Financial parameters"
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
                        value={formValues.terms_conditions}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            terms_conditions: e.target.value,
                          });
                        }}
                        label="Terms & conditions"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={3}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>

              <MDBox mt={2}>
                <Grid container spacing={3} alignItems={"center"}>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      value={formValues.google_map}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          google_map: e.target.value,
                        });
                      }}
                      type="text"
                      label="Google map"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={3}>
                      <MDBox mb={3}>
                        {formValues.tags.length === 0 ? (
                          <MDTypography
                            mb={5}
                            sx={{
                              fontSize: 12,
                              color: colors.grey[500],
                            }}
                          >
                            No tags selected.
                          </MDTypography>
                        ) : (
                          formValues.tags.map((tag, index) => {
                            return (
                              <Chip
                                key={index}
                                label={tag}
                                size="small"
                                onDelete={(e) => handleTagDelete(e, tag)}
                                sx={{
                                  mr: 0.8,
                                }}
                              />
                            );
                          })
                        )}
                      </MDBox>
                      <FormField
                        helperText="Tap enter to add new TAG."
                        onKeyDown={(e) => {
                          if (e.keyCode == 13) {
                            if (
                              !formValues.tags.find(
                                (tag) =>
                                  tag.toLowerCase() ===
                                  e.target.value.toLowerCase()
                              ) &&
                              e.target.value != ""
                            ) {
                              setFormValues({
                                ...formValues,
                                tags: [...formValues.tags, e.target.value],
                              });

                              e.target.value = "";
                            }
                          }
                        }}
                        onChange={() => {}}
                        type="text"
                        label="Tags"
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>

            <MDBox m={2} gap={2} display="flex">
              <Button
                onClick={() => router.push("/admin/oppotunities")}
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
                Create
              </Button>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default FormAdd;
