import * as Yup from "yup";
import { useSnackbar } from "notistack";
import React from "react";
import { Form, FormikProvider, useFormik } from "formik";

// material
import {
  Box,
  Grid,
  Card,
  Stack,
  TextField
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

// hooks
import useAuth from "../../../../hooks/useAuth";

//redux
import { useDispatch } from "../../../../redux/store";
import { getProfile } from "../../../../redux/slices/user"

//utils
import { fb_AddTagsOfUserById } from "../../../../utils/firebaseRequest";

import AccountTagsTable from "./AccountTagsTable";

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const dispatch = useDispatch();

  const UserAccountSchema = Yup.object().shape({
    tag: Yup.string().required("Tag is required")
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tag: ""
    },

    validationSchema: UserAccountSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fb_AddTagsOfUserById(user.id, values);
        dispatch(getProfile(user.id));
        setSubmitting(false);
        resetForm();
        enqueueSnackbar("Added Tag successfully!", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("Failed in addding new Tag", { variant: "error" });
      }
    },
  });

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = formik;

  return (
    <Grid item xs={12}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Tag"
                  placeholder="Tag"
                  {...getFieldProps("tag")}
                  error={Boolean(touched.tag && errors.tag)}
                  helperText={touched.tag && errors.tag}
                />
              </Stack>
            </Stack>
            <Box
              sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
            >
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Add Tag
              </LoadingButton>
            </Box>
          </Card>
        </Form>
      </FormikProvider>
      <br />
      <AccountTagsTable />
    </Grid>
  );
}