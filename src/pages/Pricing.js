import React from "react";
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Switch, Container, Typography, Divider } from '@material-ui/core';
// components
import Page from '../components/Page';
import { PricingPlanCard } from '../components/_external-pages/pricing';
import PricingFeaturesTable from "../components/PricingFeaturesTable";

const month_plans = [
  {
    subscription: 'basic',
    price: 10,
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
    subscription: 'starter',
    price: 20,
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
    subscription: 'premium',
    price: 30,
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

const year_plans = [
  {
    subscription: 'basic',
    price: 100,
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
    subscription: 'starter',
    price: 200,
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
    subscription: 'premium',
    price: 300,
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

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  backgroundColor: theme.palette.background.body,
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Pricing() {
  const [paymentFlag, setPaymentFlag] = React.useState(false);

  return (
    <RootStyle title="Pricing | Minimal-UI">
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" paragraph>
          Flexible plans for your
          <br /> community&apos;s size and needs
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
          Choose your plan and make modern online conversation magic
        </Typography>

        <Box sx={{ my: 5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <Typography variant="overline" sx={{ mr: 1.5 }}>
              MONTHLY
            </Typography>
            <Switch value={paymentFlag} onChange={(e) => setPaymentFlag(e.target.checked)} />
            <Typography variant="overline" sx={{ ml: 1.5 }}>
              YEARLY (save 10%)
            </Typography>
          </Box>
          <Typography variant="caption" align="right" sx={{ color: 'text.secondary', display: 'block' }}>
            * Plus applicable taxes
          </Typography>
        </Box>
        {
          paymentFlag ?
            <Grid container sx={{ justifyContent: 'center', marginTop: 5 }}>
              {year_plans.map((plan, index) =>
                <Grid item xs={12} md={3}>
                  <PricingPlanCard card={plan} index={index} />
                </Grid>
              )}
            </Grid>
            :
            <Grid container sx={{ justifyContent: 'center', marginTop: 5 }}>
              {month_plans.map((plan, index) =>
                <Grid item xs={12} md={3}>
                  <PricingPlanCard card={plan} index={index} />
                </Grid>
              )}
            </Grid>
        }
        <PricingFeaturesTable />
      </Container>
    </RootStyle>
  );
}
