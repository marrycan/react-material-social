import { useSnackbar } from "notistack";
import React from "react";
import { Form, FormikProvider, useFormik } from "formik";

// material
import {
    Box,
    Grid,
    Card,
    Stack,
    TextField,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

//utils
import { fb_UpdateCurrencyOfUserById } from "../../../../utils/firebaseRequest";

// hooks
import useAuth from "../../../../hooks/useAuth";

//redux
import { useDispatch } from "../../../../redux/store";
import { getProfile } from "../../../../redux/slices/user"

// ----------------------------------------------------------------------

export default function AccountTimeZoneCard({ data }) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            currency: data,
        },

        onSubmit: async (values) => {
            try {
                await fb_UpdateCurrencyOfUserById(user.id, values.currency);
                dispatch(getProfile(user.id));
                enqueueSnackbar("Update success", { variant: "success" });
            } catch (error) {
                console.log(error);
                enqueueSnackbar("Update failed", { variant: "error" });
            }
        },
    });

    const {
        isSubmitting,
        handleSubmit,
        getFieldProps,
    } = formik;

    return (
        <Card sx={{ p: 3 }}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Stack spacing={{ xs: 2, md: 3 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Currency"
                                    placeholder="Currency"
                                    {...getFieldProps("currency")}
                                    SelectProps={{ native: true }}
                                >
                                    <option value="" />
                                    <option value="USD">USD($)</option>
                                    <option value="Euro">Euro(€)</option>
                                    <option value="GBP">GBP(£)</option>
                                </TextField>
                            </Stack>

                            <Box
                                sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                            >
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting}
                                >
                                    Save Timezone
                                </LoadingButton>
                            </Box>

                        </Grid>
                    </Grid>
                </Form>
            </FormikProvider>
        </Card>
    );
}
