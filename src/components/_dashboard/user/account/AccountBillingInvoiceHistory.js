import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Link, Stack, Button, Typography } from '@material-ui/core';
// utils
import { timeStampToHumanDate } from '../../../../utils/formatTime';

//redux
import { useSelector, useDispatch } from '../../../../redux/store';
// ----------------------------------------------------------------------

export default function AccountBillingInvoiceHistory() {

  let { subscription, transaction } = useSelector((state) => state.user);

  return (
    <Stack spacing={3} alignItems="flex-end">
      {Object.entries(transaction).length > 0 &&
        <>
          <Typography variant="subtitle1" sx={{ width: 1 }}>
            Current Status
          </Typography>
          <Stack direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 160 }}>
              Current Plan
            </Typography>
            <Typography variant="body2" color="text.secondary">{`${subscription.plan.nickname}`}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 160 }}>
              Amount
            </Typography>
            <Typography variant="body2" color="text.secondary">{`${subscription.plan.amount / 100}${subscription.plan.currency}/${subscription.plan.interval}`}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 160 }}>
              Status
            </Typography>
            <Typography variant="body2" color="text.secondary">{`${subscription.status}`}</Typography>
          </Stack>
          {subscription.status == "trialing" &&
            <>
              <Stack direction="row" justifyContent="space-between" sx={{ width: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 160 }}>
                  Trial Start Date
                </Typography>
                <Typography variant="body2" color="text.secondary">{timeStampToHumanDate(subscription.trial_start)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" sx={{ width: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 160 }}>
                  Trial End Date
                </Typography>
                <Typography variant="body2" color="text.secondary">{timeStampToHumanDate(subscription.trial_end)}</Typography>
              </Stack>
            </>
          }
          <Stack direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 160 }}>
              Next Payment Date
            </Typography>
            <Typography variant="body2" color="text.secondary">{timeStampToHumanDate(subscription.current_period_end)}</Typography>
          </Stack>
          <Typography variant="subtitle1" sx={{ width: 1 }}>
            Recent Activity
          </Typography>
        </>
      }
      {Object.entries(transaction).length > 0 && <Stack spacing={2} sx={{ width: 1 }}>
        {transaction.data.map((obj) =>
          <Stack direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 160 }}>
              {timeStampToHumanDate(obj.charges.data[0].created)}
            </Typography>
            <Typography variant="body2">{`${obj.charges.data[0].amount / 100}USD`}</Typography>
            <Typography variant="body2" color="text.secondary">{`Paid`}</Typography>
          </Stack>
        )}
      </Stack>}
    </Stack>
  );
}
