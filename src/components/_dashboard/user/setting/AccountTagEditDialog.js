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
import { getProfile } from "../../../../redux/slices/user"

//utils
import { fb_UpdateTagsOfUserById } from "../../../../utils/firebaseRequest";

AccountTagEditDialog.PropTypes = {
    open: PropTypes.bool,
    onCancel: PropTypes.func,
    data: PropTypes.object,
    onSave: PropTypes.func
}

export default function AccountTagEditDialog({ open, onCancel, data, index }) {
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const UserAccountSchema = Yup.object().shape({
        tag: Yup.string().required("Tag is required")
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tag: data.tag
        },

        validationSchema: UserAccountSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                await fb_UpdateTagsOfUserById(user.id, values, index);
                dispatch(getProfile(user.id));
                setSubmitting(false);
                onCancel();
                resetForm();
                enqueueSnackbar("Updated Tag successfully!", { variant: "success" });
            } catch (error) {
                enqueueSnackbar("Failed in updating new Tag", { variant: "error" });
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
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Stack spacing={{ xs: 2, md: 3 }}>
                            <TextField
                                fullWidth
                                label="Tag"
                                placeholder="Tag"
                                {...getFieldProps("tag")}
                                error={Boolean(touched.tag && errors.tag)}
                                helperText={touched.tag && errors.tag}
                            />
                        </Stack>
                        <Box
                            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", spacing: 3 }}
                        >
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                            >
                                Update Tag
                            </LoadingButton>
                        </Box>
                    </Form>
                </FormikProvider>
            </DialogContent>
        </Dialog>
    );
}