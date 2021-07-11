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
} from "@material-ui/core";
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@material-ui/lab";

// hooks
import useAuth from "../../../../hooks/useAuth";

//redux
import { useDispatch, useSelector } from "../../../../redux/store";
import { getAPIsOfUser } from "../../../../redux/slices/user"

//utils
import { fb_UpdateAPIsOfUserById } from "../../../../utils/firebaseRequest";

AccountAPIEditDialog.PropTypes = {
    open: PropTypes.bool,
    onCancel: PropTypes.func,
    data: PropTypes.object,
    onSave: PropTypes.func
}

export default function AccountAPIEditDialog({ open, onCancel, data, index }) {
    const { user } = useAuth();
    const { accounts } = useSelector((state) => state.user);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const UserAccountSchema = Yup.object().shape({
        account: Yup.string().required("Account is required"),
        model: Yup.string().required("Model is required"),
        key: Yup.string().required("API key is required"),
        name: Yup.string().required("API name is required")
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            account: data.account,
            model: data.model,
            key: data.key,
            name: data.name
        },

        validationSchema: UserAccountSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                data = {
                    ...data,
                    account: values.account,
                    model: values.model,
                    key: values.key,
                    name: values.name,
                }
                await fb_UpdateAPIsOfUserById(user.id, data);
                dispatch(getAPIsOfUser(user.id));
                resetForm();
                setSubmitting(false);
                onCancel()
                enqueueSnackbar("Updated API successfully!", { variant: "success" });
            } catch (error) {
                console.log(error)
                enqueueSnackbar("Failed in update API", { variant: "error" });
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
            <DialogTitle id="form-dialog-title">Update API</DialogTitle>
            <DialogContent>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Stack spacing={{ xs: 2, md: 3 }}>
                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Account"
                                    placeholder="Account"
                                    SelectProps={{ native: true }}
                                    {...getFieldProps("account")}
                                    error={Boolean(touched.account && errors.account)}
                                    helperText={touched.account && errors.account}
                                >
                                    <option value="" />
                                    {accounts.map(data =>
                                        <option value={data.number}>{data.description}</option>
                                    )}
                                </TextField>
                                <TextField
                                    select
                                    fullWidth
                                    label="Model"
                                    placeholder="Model"
                                    SelectProps={{ native: true }}
                                    {...getFieldProps("model")}
                                    error={Boolean(touched.model && errors.model)}
                                    helperText={touched.model && errors.model}
                                >
                                    <option value="" />
                                    <option value="Model 1">Model 1</option>
                                    <option value="Model 2">Model 2</option>
                                    <option value="Model 3">Model 3</option>
                                    <option value="Model 4">Model 4</option>
                                </TextField>
                            </Stack>
                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    fullWidth
                                    label="API Key"
                                    placeholder="API Key"
                                    {...getFieldProps("key")}
                                    error={Boolean(touched.key && errors.key)}
                                    helperText={touched.key && errors.key}
                                />
                                <TextField
                                    fullWidth
                                    label="Name"
                                    placeholder="Name"
                                    {...getFieldProps("name")}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
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
                                Update API
                            </LoadingButton>
                        </Box>
                    </Form>
                </FormikProvider>
            </DialogContent>
        </Dialog>
    );
}