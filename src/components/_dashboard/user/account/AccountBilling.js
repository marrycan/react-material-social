import React, { useEffect, useState } from 'react';
import { useSnackbar } from "notistack";
// material
import { Box, Grid, Card, Button, Typography, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// redux
import { useSelector, useDispatch } from '../../../../redux/store';
import { getSubscription, getTransactionOfCustomer } from '../../../../redux/slices/user';

import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';

import AccountPlansDialog from './AccountPlans';

import { stripe_CancelSubscription } from '../../../../utils/stripeRequest';
import { fb_DeleteSubscription } from "../../../../utils/firebaseRequest";

//hooks
import useAuth from "../../../../hooks/useAuth";

// ----------------------------------------------------------------------

export default function AccountBilling() {
  const dispatch = useDispatch();
  const { updateSubscriptionKey } = useAuth();
  let { plans, subscription, card, customer, myProfile } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [openPlans, setOpenPlans] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (customer.id)
      dispatch(getTransactionOfCustomer(customer.id));
  }, [customer])

  const flag = Object.entries(subscription).length === 0;

  let mo_basic, mo_starter, mo_premium, year_basic, year_starter, year_premium;

  //config plans:
  if (Object.entries(plans).length) {
    [year_basic] = plans.filter(function (el) {
      return el.nickname === "basic" && el.interval == "year";
    });

    [year_starter] = plans.filter(function (el) {
      return el.nickname === "starter" && el.interval == "year";
    });

    [year_premium] = plans.filter(function (el) {
      return el.nickname === "premium" && el.interval == "year";
    });

    [mo_basic] = plans.filter(function (el) {
      return el.nickname === "basic" && el.interval == "month";
    });

    [mo_starter] = plans.filter(function (el) {
      return el.nickname === "starter" && el.interval == "month";
    });

    [mo_premium] = plans.filter(function (el) {
      return el.nickname === "premium" && el.interval == "month";
    });
  }

  let month_plans = [
    {
      id: mo_basic ? mo_basic.id : "basic",
      subscription: 'basic',
      price: mo_basic ? mo_basic.amount / 100 : 10,
      lists: [
        { text: '3 prototypes' },
        { text: '3 boards' },
        { text: 'Up to 5 team members' },
        { text: 'Advanced security' },
        { text: 'Permissions & workflows' }
      ],
      labelAction: 'choose basic'
    },
    {
      id: mo_starter ? mo_starter.id : "starter",
      subscription: 'starter',
      price: mo_starter ? mo_starter.amount / 100 : 20,
      lists: [
        { text: '3 prototypes' },
        { text: '3 boards' },
        { text: 'Up to 5 team members' },
        { text: 'Advanced security' },
        { text: 'Permissions & workflows' }
      ],
      labelAction: 'choose starter'
    },
    {
      id: mo_premium ? mo_premium.id : "starter",
      subscription: 'premium',
      price: mo_premium ? mo_premium.amount / 100 : 30,
      lists: [
        { text: '3 prototypes' },
        { text: '3 boards' },
        { text: 'Up to 5 team members' },
        { text: 'Advanced security' },
        { text: 'Permissions & workflows' }
      ],
      labelAction: 'choose premium'
    }
  ];

  let year_plans = [
    {
      id: year_basic ? year_basic.id : "basic",
      subscription: 'basic',
      price: year_basic ? year_basic.amount / 100 : 10,
      lists: [
        { text: '3 prototypes' },
        { text: '3 boards' },
        { text: 'Up to 5 team members' },
        { text: 'Advanced security' },
        { text: 'Permissions & workflows' }
      ],
      labelAction: 'choose basic'
    },
    {
      id: year_starter ? year_starter.id : "starter",
      subscription: 'starter',
      price: year_starter ? year_starter.amount / 100 : 20,
      lists: [
        { text: '3 prototypes' },
        { text: '3 boards' },
        { text: 'Up to 5 team members' },
        { text: 'Advanced security' },
        { text: 'Permissions & workflows' }
      ],
      labelAction: 'choose starter'
    },
    {
      id: year_premium ? year_premium.id : "starter",
      subscription: 'premium',
      price: year_premium ? year_premium.amount / 100 : 30,
      lists: [
        { text: '3 prototypes' },
        { text: '3 boards' },
        { text: 'Up to 5 team members' },
        { text: 'Advanced security' },
        { text: 'Permissions & workflows' }
      ],
      labelAction: 'choose premium'
    }
  ];

  const handleOpenAddCard = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handlPlanOpen = () => {
    setOpenPlans(true);
  }

  const handlPlanClose = () => {
    setOpenPlans(false);
  };

  const handlePlanCancel = async () => {
    setLoading(true);
    try {
      await stripe_CancelSubscription({ id: subscription.id });
      await fb_DeleteSubscription(myProfile.uid);
      dispatch(getSubscription(myProfile.uid));
      updateSubscriptionKey(false)
      enqueueSnackbar("Canceld Subscription", { variant: "success" });
    }
    catch {
      enqueueSnackbar("Failed in cancelation subscription", { variant: "error" });
    }
    setLoading(false);
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {Object.entries(card).length > 0 &&
            <Card sx={{ p: 3 }}>
              <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
                Your Plan
              </Typography>
              <Typography variant="h4" color={flag && 'red'}>{flag ? `No subscription` : subscription.plan.nickname}</Typography>
              <Box
                sx={{
                  mt: { xs: 2, sm: 0 },
                  position: { sm: 'absolute' },
                  top: { sm: 24 },
                  right: { sm: 24 }
                }}
              >
                {flag ? <Button size="small" onClick={handlPlanOpen} variant="outlined">
                  Join now
                </Button> : <><LoadingButton size="small" onClick={handlePlanCancel} loading={loading} color="inherit" variant="outlined" sx={{ mr: 1 }}>
                  Cancel plan
                </LoadingButton>
                  <Button size="small" onClick={handlPlanOpen} variant="outlined">
                    Upgrade plan
                  </Button></>}

              </Box>
            </Card>
          }
          <AccountBillingPaymentMethod
            isOpen={open}
            onCancel={handleCancel}
            onOpen={handleOpenAddCard}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory />
      </Grid>
      <AccountPlansDialog
        open={openPlans}
        onClose={handlPlanClose}
        month_plans={month_plans}
        year_plans={year_plans}
        subName={flag ? "" : subscription.plan.nickname}
      />
    </Grid>
  );
}
