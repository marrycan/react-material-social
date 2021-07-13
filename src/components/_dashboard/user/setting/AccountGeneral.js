import * as Yup from "yup";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { Form, FormikProvider, useFormik } from "formik";

// material
import {
  Box,
  Grid,
  Card,
  Stack,
  TextField,
  Typography
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

import AccountTable from "./AccountTable";

// hooks
import useAuth from "../../../../hooks/useAuth";

//redux
import { useDispatch, useSelector } from "../../../../redux/store";
import { getAccountsOfUser } from "../../../../redux/slices/user"

//utils
import { fb_AddAccountByUserId } from "../../../../utils/firebaseRequest";
// ----------------------------------------------------------------------


export default function AccountGeneral() {
  const { accounts, subscription } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [addFlag, setAddFlag] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (Object.entries(subscription).length > 0) {
      if (subscription.plan.nickname == "premium" && accounts.length < 5) {
        setAddFlag(false);
      } else if (subscription.plan.nickname != "premium" && accounts.length < 1) {
        setAddFlag(false);
      } else {
        setAddFlag(true);
      }
    }
  }, [accounts, subscription])

  const UserAccountSchema = Yup.object().shape({
    number: Yup.number().required("Account Number is required"),
    balance: Yup.number().required("Initial Balance is required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      number: "",
      balance: "",
      description: ""
    },
    validationSchema: UserAccountSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fb_AddAccountByUserId(user.id, values);
        dispatch(getAccountsOfUser(user.id));
        setSubmitting(false);
        resetForm();
        enqueueSnackbar("Added account successfully!", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("Failed in addding new account", { variant: "error" });
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
                  label="Account Number"
                  placeholder="Account Number"
                  {...getFieldProps("number")}
                  error={Boolean(touched.number && errors.number)}
                  helperText={touched.number && errors.number}
                />
                <TextField
                  fullWidth
                  label="Initial Balance($)"
                  placeholder="Initial Balance($)"
                  {...getFieldProps("balance")}
                  error={Boolean(touched.balance && errors.balance)}
                  helperText={touched.balance && errors.balance}
                />
              </Stack>
              <Stack>
                <TextField
                  fullWidth
                  label="Description"
                  placeholder="Description"
                  {...getFieldProps("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Stack>
            </Stack>
            <Box
              sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: 'center' }}
            >
              <div>{addFlag && <Typography color={'red'}>{`Reached out a max number of accounts.`}</Typography>}</div>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={addFlag}
              >
                Add Account
              </LoadingButton>
            </Box>
          </Card>
        </Form>
      </FormikProvider>
      <br />
      <AccountTable />
    </Grid>
  );
}
