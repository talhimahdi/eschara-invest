"use client";
import React, { useState, useTransition } from "react";
import { Alert, Autocomplete, Button, Icon, Chip } from "@mui/material";
import { Card, Grid } from "@mui/material";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";

import FormField from "../../../../../components/FormField";
import MDButton from "../../../../../components/MDButton";
import addOpportunity from "../../serverActions/addOpportunity";
import { useRouter } from "next/navigation";
import { Cancel, Send } from "@mui/icons-material";
import colors from "../../../../../assets/theme/base/colors";
import EILoader from "../../../../../components/EILoader";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function FormAdd({ managers }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImages, setPreviewImages] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [managerValue, setManagerValue] = useState(managers[0]);
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
  });

  const [propertyDescription, setPropertyDescription] = useState({
    key: "",
    value: "",
  });

  const [newTag, setNewTag] = useState("");
  const [formValues, setFormValues] = useState({
    title:
      "Cat remarked. 'Don't be impertinent,' said the Dormouse turned out, and, by the Hatter, with an important air, 'are you all ready? This is the capital of Paris, and Paris is the same thing,' said.",
    manager: null,
    status: "Rejected",
    tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"],
    description:
      "Ut voluptates culpa quia ea omnis fugiat quisquam. Sapiente quas accusamus eligendi quam. Eum sint animi ut autem nostrum nesciunt.\n\nQuia modi voluptatem odit dignissimos dignissimos magnam. Suscipit labore et et. Expedita est placeat nostrum vel aliquam vel. Voluptatem accusantium eos vitae accusamus praesentium.\n\nTempore nam eum asperiores sed voluptatum. Ut ipsa minus veritatis voluptatem non qui possimus. Voluptas neque nihil placeat architecto repellendus dolores. Quia sit possimus cum rem consequatur amet aut. Soluta vel sunt sapiente provident eligendi possimus.",
    google_map: "7317 Tremblay Walks\nEast Norene, AR 72800",
    gallery: [],
    documents: [],
    property_description: [
      {
        key: "Key 1",
        value: "Value 1",
      },
      {
        key: "Key 2",
        value: "Value 2",
      },
      {
        key: "Key 3",
        value: "Value 3",
      },
    ],
    expiration_date: "2024-10-29",
    created_at: "2023-09-22T01:12:19+00:00",
    total_value: 61541.72,
  });

  const status = ["Available", "Ongoing", "Closed", "Rejected"];

  const onSubmit = async () => {
    formValues.manager = managerValue.id;

    // console.log(formValues);

    // return;

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

  const handleImageDelete = (e, value) => {
    setPreviewImages([
      ...previewImages.filter(
        (image) => image.name != value.name && image.url != value.url
      ),
    ]);

    setFormValues({
      ...formValues,
      gallery: [
        ...formValues.gallery.filter((image) => image.name != value.name),
      ],
    });
  };

  const handleFileDelete = (e, value) => {
    setPreviewFiles([...previewFiles.filter((file) => file != value)]);

    setFormValues({
      ...formValues,
      documents: [...formValues.documents.filter((file) => file != value)],
    });
  };

  const handlePropertyDescriptionDelete = (e, value) => {
    setFormValues({
      ...formValues,
      property_description: [
        ...formValues.property_description.filter(
          (property) => property != value
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

  const handleImages = async (e) => {
    var files = Array.from(e.target.files);

    var imagesSize = 0;
    files.map((file) => {
      imagesSize = imagesSize + file.size;
    });

    if ((imagesSize / 1024 / 1024).toFixed(4) > 10) {
      setAlert({
        severity: "error",
        message: "Max size is 10 MB",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (parseInt(files.length) > 5) {
      setAlert({
        severity: "error",
        message: "You can upload 5 images maximum.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setPreviewImages([]);
    setAlert({
      severity: "",
      message: "",
    });

    const imagesObj = Promise.all(
      files.map(async (file) => {
        setPreviewImages((state) => [
          ...state,
          { url: URL.createObjectURL(file), name: file.name },
        ]);
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
    e.target.value = null;
  };

  const handleFiles = async (e) => {
    var files = Array.from(e.target.files);

    var filesSize = 0;
    files.map((file) => {
      filesSize = filesSize + file.size;
    });

    if ((filesSize / 1024 / 1024).toFixed(4) > 10) {
      setAlert({
        severity: "error",
        message: "Max size is 10 MB",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (parseInt(files.length) > 5) {
      setAlert({
        severity: "error",
        message: "You can only upload a maximum of 5 files",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setPreviewFiles([]);
    setAlert({
      severity: "",
      message: "",
    });

    const filesObj = Promise.all(
      files.map(async (file) => {
        setPreviewFiles((state) => [
          ...state,
          { name: file.name, size: (file.size / 1024 / 1024).toFixed(2) },
        ]);
        const base64 = await convert2DataUrl(file);
        return {
          name: file.name,
          size: file.size,
          type: file.type,
          data: base64,
        };
      })
    );

    const documents = await filesObj;

    setFormValues({ ...formValues, documents: documents });
    e.target.value = null;
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
              <MDBox>
                <Grid container spacing={3} mb={5}>
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
                        gallery
                        <input
                          hidden
                          accept=".jpg,.png"
                          multiple
                          type="file"
                          name="gallery"
                          onChange={handleImages}
                        />
                      </Button>
                      <MDBox sx={{ display: "flex", flexWrap: "wrap", mt: 3 }}>
                        {previewImages.length > 0 ? (
                          previewImages.map((prv) => (
                            <MDBox
                              key={prv.url + prv.name}
                              color="white"
                              textAlign="center"
                              sx={{
                                pr: 1,
                              }}
                            >
                              <img
                                src={prv.url}
                                width={100}
                                height={80}
                                style={{ borderRadius: 5 }}
                              />
                              <Icon
                                sx={{
                                  fontSize: "small",
                                  color: "#ff0000",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => handleImageDelete(e, prv)}
                              >
                                delete_outline
                              </Icon>
                            </MDBox>
                          ))
                        ) : (
                          <MDTypography sx={{ fontSize: { xs: 12, md: 15 } }}>
                            No image selected!
                          </MDTypography>
                        )}
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
                        Documents
                        <input
                          hidden
                          accept=".pdf"
                          multiple
                          type="file"
                          name="documents"
                          onChange={handleFiles}
                        />
                      </Button>
                      <MDBox
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          mt: 3,
                          gap: 2,
                        }}
                      >
                        {previewFiles.length > 0 ? (
                          previewFiles.map((file) => (
                            <MDBox
                              key={file.name + file.size}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 1,
                                p: 1,
                                backgroundColor: "#eee",
                                borderRadius: 2,
                              }}
                            >
                              <Icon fontSize="small">description</Icon>
                              <MDTypography sx={{ fontSize: { xs: 12 } }}>
                                {file.name}
                              </MDTypography>
                              <MDTypography sx={{ fontSize: { xs: 12 } }}>
                                {file.size} MB
                              </MDTypography>
                              <Icon
                                sx={{
                                  fontSize: "small",
                                  color: "#ff0000",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => handleFileDelete(e, file)}
                              >
                                delete_outline
                              </Icon>
                            </MDBox>
                          ))
                        ) : (
                          <MDTypography sx={{ fontSize: { xs: 12, md: 15 } }}>
                            No file selected!
                          </MDTypography>
                        )}
                      </MDBox>
                    </MDBox>
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
                      value={formValues.total_value}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          total_value: e.target.value,
                        });
                      }}
                      type="total_value"
                      label="Total value"
                      placeholder="0.00"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.id}>
                            {option.full_name}
                          </li>
                        );
                      }}
                      renderTags={(tagValue, getTagProps) => {
                        return tagValue.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={option}
                            label={option}
                          />
                        ));
                      }}
                      value={managerValue}
                      options={managers}
                      getOptionLabel={(option) => option.full_name}
                      onChange={(event, newValue) => {
                        setManagerValue(newValue);
                        // setFormValues({
                        //   ...formValues,
                        //   manager: newValue.id,
                        // });
                      }}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          variant="outlined"
                          label="Manager"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </MDBox>

              <MDBox mt={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
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
                        minRows={8}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>

              <MDBox mt={2}>
                <Grid container spacing={3} alignItems={"center"}>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Expiration date"
                        value={dayjs(formValues.expiration_date)}
                        format="DD/MM/YYYY"
                        onChange={(newValue) =>
                          setFormValues({
                            ...formValues,
                            expiration_date: dayjs(newValue.$d).format(
                              "YYYY-MM-DD"
                            ),
                          })
                        }
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={3}>
                      <MDBox mb={3}>
                        {formValues.property_description.length === 0 ? (
                          <MDTypography
                            mb={5}
                            sx={{
                              fontSize: 12,
                              color: colors.grey[500],
                            }}
                          >
                            No Property selected.
                          </MDTypography>
                        ) : (
                          formValues.property_description.map(
                            (property, index) => {
                              return (
                                <Chip
                                  key={index}
                                  label={property.key + " : " + property.value}
                                  size="small"
                                  onDelete={(e) =>
                                    handlePropertyDescriptionDelete(e, property)
                                  }
                                  sx={{
                                    mr: 0.8,
                                  }}
                                />
                              );
                            }
                          )
                        )}
                      </MDBox>

                      <MDBox sx={{ mt: 3, display: "flex", gap: 1 }}>
                        <FormField
                          value={propertyDescription.key}
                          onChange={(e) =>
                            setPropertyDescription({
                              ...propertyDescription,
                              key: e.target.value,
                            })
                          }
                          type="text"
                          label="Name"
                          variant="outlined"
                        />
                        <FormField
                          value={propertyDescription.value}
                          onChange={(e) =>
                            setPropertyDescription({
                              ...propertyDescription,
                              value: e.target.value,
                            })
                          }
                          type="text"
                          label="Value"
                          variant="outlined"
                        />
                        <MDButton
                          sx={{
                            backgroundColor: colors.escharaThemeSecondary.main,
                            color: colors.white.main,
                            "&:hover": {
                              backgroundColor:
                                colors.escharaThemeSecondary.main,
                              color: colors.white.main,
                            },
                            "&:focus:not(:hover)": {
                              backgroundColor:
                                colors.escharaThemeSecondary.main,
                              color: colors.white.main,
                            },
                          }}
                          onClick={() => {
                            if (
                              !formValues.property_description.find(
                                (propert) =>
                                  propert.key.toLowerCase() ===
                                    propertyDescription.key.toLowerCase() &&
                                  propert.value.toLowerCase() ===
                                    propertyDescription.value.toLowerCase()
                              ) &&
                              propertyDescription.value != ""
                            ) {
                              setFormValues({
                                ...formValues,
                                property_description: [
                                  ...formValues.property_description,
                                  {
                                    key: propertyDescription.key,
                                    value: propertyDescription.value,
                                  },
                                ],
                              });

                              setPropertyDescription({ key: "", value: "" });
                            }
                          }}
                        >
                          Add
                        </MDButton>
                      </MDBox>
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
                      variant="outlined"
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
                      <MDBox sx={{ mt: 3, display: "flex", gap: 1 }}>
                        <FormField
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          type="text"
                          label="Tag"
                          variant="outlined"
                        />
                        <MDButton
                          sx={{
                            backgroundColor: colors.escharaThemeSecondary.main,
                            color: colors.white.main,
                            "&:hover": {
                              backgroundColor:
                                colors.escharaThemeSecondary.main,
                              color: colors.white.main,
                            },
                            "&:focus:not(:hover)": {
                              backgroundColor:
                                colors.escharaThemeSecondary.main,
                              color: colors.white.main,
                            },
                          }}
                          onClick={() => {
                            if (
                              !formValues.tags.find(
                                (tag) =>
                                  tag.toLowerCase() === newTag.toLowerCase()
                              ) &&
                              newTag != ""
                            ) {
                              setFormValues({
                                ...formValues,
                                tags: [...formValues.tags, newTag],
                              });

                              setNewTag("");
                            }
                          }}
                        >
                          Add
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>

            <MDBox m={2} gap={2} display="flex">
              <Button
                onClick={() => router.push("/admin/opportunities")}
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
