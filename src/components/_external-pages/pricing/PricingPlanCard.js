import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Button, Typography, Box, Stack } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  borderRadius: 0,
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3),
  [theme.breakpoints.up(414)]: {
    padding: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

PricingPlanCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object
};

export default function PricingPlanCard({ card, index }) {
  const { subscription, price, lists, labelAction } = card;
  const flag = index === 1 ? true : false;

  return (
    <RootStyle style={{ backgroundColor: flag && '#00db1a', marginTop: flag && -15 }}>
      <Typography variant="h3" color={flag ? "#fff" : 'text.secondary'}>
        {subscription}
      </Typography>
      <Typography variant="h6" color={flag ? "#fff" : 'text.secondary'}>
        STARTS AT
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        <Typography variant="subtitle1" color={flag && "#fff"}>
          $
        </Typography>
        <Typography variant="h2" color={flag && "#fff"} sx={{ mx: 1 }}>
          {price === 0 ? 'Free' : price}
        </Typography>
      </Box>

      <Stack component="ul" spacing={1} sx={{ my: 5, width: 1 }}>
        {lists.map((item) => (
          <Stack
            key={item.text}
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ typography: 'body2', color: flag ? "#000" : 'text.secondary' }}
          >
            <CheckCircleIcon sx={{ width: 20, height: 20, color: flag ? "#000" : 'text.secondary' }} />
            <Typography variant="body2">{item.text}</Typography>
          </Stack>
        ))}
      </Stack>
      {flag && <div style={{ height: 30 }}></div>}
      <Button
        to={PATH_DASHBOARD.user.profile}
        sx={{ backgroundColor: flag && "#000" }}
        fullWidth
        size="large"
        variant="contained"
        component={RouterLink}
      >
        {labelAction}
      </Button>
    </RootStyle>
  );
}
