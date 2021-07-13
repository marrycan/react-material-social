import React from 'react';
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import {
    Box,
    Stack,
    TextField,
    Dialog,
    DialogContent,
} from "@material-ui/core";
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@material-ui/lab";

// hooks
import useAuth from "../../../../hooks/useAuth";

//redux
import { useDispatch } from "../../../../redux/store";
import { getProfile } from "../../../../redux/slices/user"

//utils
import { fb_UpdateAccountAdjustmentOfUserByIndex } from "../../../../utils/firebaseRequest";

AccountAdjustmentEditDialog.PropTypes = {
    open: PropTypes.bool,
    onCancel: PropTypes.func,
    data: PropTypes.object,
    onSave: PropTypes.func
}

export default function AccountAdjustmentEditDialog({ open, onCancel, data, index, adjustmentId }) {
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const UserAccountSchema = Yup.object().shape({
        credit_debit: Yup.string().required("Credi/Debit is required"),
        amount: Yup.number().required("Account Number is required"),
        transaction_dt: Yup.string().required("Transaction date is required"),
        description: Yup.string().required("Description is required"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            credit_debit: data.credit_debit ? data.credit_debit : "",
            amount: data.amount ? data.amount : "",
            description: data.description ? data.description : "",
            transaction_dt: data.transaction_dt ? data.transaction_dt : "2020-01-01"
        },
        validationSchema: UserAccountSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                await fb_UpdateAccountAdjustmentOfUserByIndex(user.id, adjustmentId, index, values);
                dispatch(getProfile(user.id));
                setSubmitting(false);
                resetForm();
                enqueueSnackbar("Updated account successfully!", { variant: "success" });
                onCancel();
            } catch (error) {
                console.log(error)
                enqueueSnackbar("Failed in updating new account", { variant: "error" });
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
                                    select
                                    fullWidth
                                    label="Credit/Debit"
                                    placeholder="Credit/Debit"
                                    {...getFieldProps("credit_debit")}
                                    SelectProps={{ native: true }}
                                    error={Boolean(touched.credit_debit && errors.credit_debit)}
                                    helperText={touched.credit_debit && errors.credit_debit}
                                >
                                    <option value="" />
                                    <option value="credit">Credit</option>
                                    <option value="debit">Debit</option>
                                </TextField>
                                <TextField
                                    fullWidth
                                    label="Amount($)"
                                    placeholder="Amount($)"
                                    {...getFieldProps("amount")}
                                    error={Boolean(touched.amount && errors.amount)}
                                    helperText={touched.amount && errors.amount}
                                />
                            </Stack>
                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    placeholder="Description"
                                    {...getFieldProps("description")}
                                    error={Boolean(touched.description && errors.description)}
                                    helperText={touched.description && errors.description}
                                />
                                <TextField
                                    fullWidth
                                    id="date"
                                    label="Transaction Date"
                                    type="date"
                                    {...getFieldProps("transaction_dt")}
                                    error={Boolean(touched.transaction_dt && errors.transaction_dt)}
                                    helperText={touched.transaction_dt && errors.transaction_dt}
                                />
                            </Stack>
                        </Stack>
                        <Box
                            sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: 'center' }}
                        >
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                            >
                                Update Adjustment
                            </LoadingButton>
                        </Box>
                    </Form>
                </FormikProvider>
            </DialogContent>
        </Dialog>
    );
}