import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useFormik } from 'formik';
import { useSnackbar } from "notistack";
import { Form, FormikProvider } from 'formik';
import plusFill from '@iconify/icons-eva/plus-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import CreditCardInput from 'react-credit-card-input';

// material
import { Box, Paper, Stack, Card, Button, Collapse, TextField, IconButton, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// utils
import { stripe_CreateCardTokenAndCustomer } from '../../../../utils/stripeRequest';
import { fb_AddPayment, fb_AddCustomer } from '../../../../utils/firebaseRequest';

//redux
import { useSelector, useDispatch } from '../../../../redux/store';
import { getCards, getCustomers } from "../../../../redux/slices/user";

//hooks
import useAuth from "../../../../hooks/useAuth";
// ----------------------------------------------------------------------

AccountBillingPaymentMethod.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onCancel: PropTypes.func
};

export default function AccountBillingPaymentMethod({ isOpen, onOpen, onCancel }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { card } = useSelector((state) => state.user);
  const { id, displayName, email } = user;
  const [state, setState] = React.useState({
    cvc: '',
    expiry: '',
    number: '',
    error: true
  });

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values, { setSubmitting, resetForm }) => {

      let data = {
        email,
        name: displayName,
        number: state.number,
        exp_month: parseInt(state.expiry.split("/")[0]),
        exp_year: parseInt(state.expiry.split("/")[1]),
        cvc: state.cvc
      }

      const response = await stripe_CreateCardTokenAndCustomer(data);
      if (response.error) {
        setSubmitting(false);
        enqueueSnackbar(response.error, { variant: 'error' });
      } else {
        await fb_AddPayment(id, response.card);
        await fb_AddCustomer(id, response.customer);
        dispatch(getCards(id));
        dispatch(getCustomers(id));
        onCancel();
        setSubmitting(false);
        enqueueSnackbar('Add card success', { variant: 'success' });
      }
    }
  });

  const handleCardNumberChange = (e) => {
    setState({ ...state, number: e.target.value, error: false })
  }

  const handleCardExpiryChange = (e) => {
    setState({ ...state, expiry: e.target.value, error: false })
  }

  const handleCardCVCChange = (e) => {
    setState({ ...state, cvc: e.target.value, error: false })
  }

  const { isSubmitting, handleSubmit } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="overline" sx={{ mb: 3, display: 'block', color: Object.entries(card).length === 0 ? "red" : 'text.secondary' }}>
        {Object.entries(card).length === 0 ? `Please Add Payment Method` : `Added Payment Method`}
      </Typography>

      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
        {
          Object.entries(card).length !== 0 &&
          <Paper
            sx={{
              p: 3,
              width: 1,
              position: 'relative',
              border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
            }}
          >
            <Typography variant="subtitle2">{card.card.brand}</Typography>
            <Typography variant="subtitle2">{"**** **** ****"}{card.card.last4}</Typography>
            <IconButton
              sx={{
                top: 8,
                right: 8,
                position: 'absolute'
              }}
            >
              <Icon icon={moreVerticalFill} width={20} height={20} />
            </IconButton>
          </Paper>
        }
      </Stack>
      <Box sx={{ mt: 3 }}>
        <Button size="small" disabled={Object.entries(card).length === 0 ? false : true} startIcon={<Icon icon={plusFill} />} onClick={onOpen}>
          Add new card
        </Button>
      </Box>

      <Collapse in={isOpen}>
        <Box
          sx={{
            padding: 3,
            marginTop: 3,
            borderRadius: 1,
            bgcolor: 'background.neutral'
          }}
        >
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Typography variant="subtitle1">Add new card</Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <CreditCardInput
                    onError={() => setState({ ...state, error: true })}
                    cardNumberInputProps={{ value: state.number, onChange: handleCardNumberChange }}
                    cardExpiryInputProps={{ value: state.expiry, onChange: handleCardExpiryChange }}
                    cardCVCInputProps={{ value: state.cvc, onChange: handleCardCVCChange }}
                    fieldClassName="input"
                  />
                </Stack>
                <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                  <Button type="button" color="inherit" variant="outlined" onClick={onCancel}>
                    Cancel
                  </Button>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting} disabled={state.error ? true : false}>
                    Save Change
                  </LoadingButton>
                </Stack>
              </Stack>
            </Form>
          </FormikProvider>
        </Box>
      </Collapse>
    </Card >
  );
}
