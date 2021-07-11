import { useSnackbar } from "notistack";
import React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import moment from "moment-timezone";

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
import { fb_UpdateTimezoneOfUserById } from "../../../../utils/firebaseRequest";

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
            timezone: data,
        },

        onSubmit: async (values) => {
            try {
                await fb_UpdateTimezoneOfUserById(user.id, values.timezone);
                dispatch(getProfile(user.id));
                enqueueSnackbar("Update success", { variant: "success" });
            } catch (error) {
                console.log(error)
                enqueueSnackbar("Update failed", { variant: "error" });
            }
        },
    });

    var timeZones = moment.tz.names();
    var offsetTmz = [];

    for (var i in timeZones) {
        offsetTmz.push(
            timeZones[i] + " (GMT" + moment.tz(timeZones[i]).format("Z") + ") "
        );
    }

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
                                    label="Timezone"
                                    placeholder="Timezone"
                                    {...getFieldProps("timezone")}
                                    SelectProps={{ native: true }}
                                >
                                    <option value="" />
                                    {offsetTmz.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
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
