import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import { motion } from "framer-motion";
import Dialog from '@material-ui/core/Dialog';
import PricingPlanCard from './AccountBillingCard';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Box, Grid, Switch, Container, Typography } from '@material-ui/core';
import { varFadeIn } from '../../../animate'
import PricingFeaturesTable from "../../../PricingFeaturesTable";

//redux
import { useSelector, useDispatch } from '../../../../redux/store';
import { getSubscription } from "../../../../redux/slices/user";

//APIs
import { stripe_CreateSubscription, stripe_UpdateSubscription } from '../../../../utils/stripeRequest'
import { fb_AddSubscription } from '../../../../utils/firebaseRequest'

//hooks
import useAuth from "../../../../hooks/useAuth";

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

AccountPlansDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    plans: PropTypes.array.isRequired,
    subName: PropTypes.string
};

export default function AccountPlansDialog(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { onClose, open, month_plans, year_plans, subName, ...other } = props;
    const { user, updateSubscriptionKey } = useAuth();
    let { customer, subscription } = useSelector((state) => state.user);
    const [paymentFlag, setPaymentFlag] = useState(false);

    const handleCancel = () => {
        onClose();
    };

    const handleSubscription = async (plan_id) => {
        let data;
        if (Object.entries(subscription).length > 0)
            data = await stripe_UpdateSubscription({ id: subscription.id, priceId: plan_id })
        else {
            data = await stripe_CreateSubscription({ cust_id: customer.id, planId: plan_id })
            data = data.data;
        }
        await fb_AddSubscription(user.id, data);
        updateSubscriptionKey(true);
        return dispatch(getSubscription(user.id))

    }

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
                            <motion.div variants={varFadeIn}>
                                <Grid container sx={{ justifyContent: 'center', marginTop: 5 }}>
                                    {year_plans.map((plan, index) =>
                                        <Grid item xs={12} md={3}>
                                            <PricingPlanCard card={plan} index={index} onClose={handleCancel} planName={subName} subHandle={handleSubscription} />
                                        </Grid>
                                    )}
                                </Grid>
                            </motion.div> :
                            <motion.div variants={varFadeIn}>
                                <Grid container sx={{ justifyContent: 'center', marginTop: 5 }}>
                                    {month_plans.map((plan, index) =>
                                        <Grid item xs={12} md={3}>
                                            <PricingPlanCard card={plan} index={index} onClose={handleCancel} planName={subName} subHandle={handleSubscription} />
                                        </Grid>
                                    )}
                                </Grid>
                            </motion.div>
                    }
                    <PricingFeaturesTable />
                </Container>
            </DialogContent>
        </Dialog>
    );
}