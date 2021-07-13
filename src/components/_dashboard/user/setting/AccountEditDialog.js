import React from 'react';
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import {
    Box,
    Stack,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    Button
} from "@material-ui/core";
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@material-ui/lab";

// hooks
import useAuth from "../../../../hooks/useAuth";

//redux
import { useDispatch } from "../../../../redux/store";
import { getAccountsOfUser } from "../../../../redux/slices/user"

//utils
import { fb_UpdateAccountsOfUserByIndex } from "../../../../utils/firebaseRequest";

AccountEditDialog.PropTypes = {
    open: PropTypes.bool,
    onCancel: PropTypes.func,
    data: PropTypes.object,
    onSave: PropTypes.func
}

export default function AccountEditDialog({ open, onCancel, data, index }) {
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const UserAccountSchema = Yup.object().shape({
        number: Yup.number().required("Account Number is required"),
        balance: Yup.number().required("Initial Balance is required"),
        description: Yup.string().required("Description is required"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            number: data.number ? data.number : "",
            balance: data.balance ? data.balance : "",
            description: data.description ? data.description : ""
        },

        validationSchema: UserAccountSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                data = {
                    ...data,
                    number: values.number,
                    balance: values.balance,
                    description: values.description,
                }
                await fb_UpdateAccountsOfUserByIndex(user.id, index, data);
                dispatch(getAccountsOfUser(user.id));
                resetForm();
                setSubmitting(false);
                onCancel()
                enqueueSnackbar("Updated account successfully!", { variant: "success" });
            } catch (error) {
                console.log(error);
                enqueueSnackbar("Failed in updating account", { variant: "error" });
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
        <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
            <DialogContent>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", spacing: 3 }}
                        >
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                            >
                                Update Account
                            </LoadingButton>
                        </Box>
                    </Form>
                </FormikProvider>
            </DialogContent>
        </Dialog>
    );
}