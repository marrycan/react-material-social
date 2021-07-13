import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {
    Box,
    Grid,
    Card,
    Stack,
    TextField,
    Typography,
    Switch,
    Container
} from "@material-ui/core";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@material-ui/lab";

//redux
import { useSelector, useDispatch } from '../../../../redux/store';
import { getProfile } from "../../../../redux/slices/user";

//APIs
import { fb_AddAccountAdjustmentByUserId } from '../../../../utils/firebaseRequest'

//hooks
import useAuth from "../../../../hooks/useAuth";

import AccountAdjustmentTable from "./AccountAdjustmentTable";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        alignItems: 'flex-end'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AccountAdjustmentDialog(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { onClose, open } = props;
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const handleCancel = () => {
        onClose();
    };

    const UserAccountSchema = Yup.object().shape({
        credit_debit: Yup.string().required("Credi/Debit is required"),
        amount: Yup.number().required("Account Number is required"),
        transaction_dt: Yup.string().required("Transaction date is required"),
        description: Yup.string().required("Description is required"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            credit_debit: "",
            amount: "",
            description: "",
            transaction_dt: "2020-01-01"
        },
        validationSchema: UserAccountSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                await fb_AddAccountAdjustmentByUserId(user.id, props.id, values);
                dispatch(getProfile(user.id));
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
        <Dialog fullScreen open={open} onClose={handleCancel} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Button autoFocus color="inherit" onClick={handleCancel}>
                        Close
                    </Button>
                    <IconButton edge="start" color="inherit" onClick={handleCancel} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Container maxWidth="lg">
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Card sx={{ p: 3 }}>
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
                                        Add Adjustment
                                    </LoadingButton>
                                </Box>
                            </Card>
                        </Form>
                    </FormikProvider>
                    <br />
                    <AccountAdjustmentTable id={props.id} />
                </Container>
            </DialogContent>
        </Dialog>
    );
}