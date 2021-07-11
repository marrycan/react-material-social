import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// hooks
import useAuth from '../hooks/useAuth';
// pages
import LandingPage from '../pages/LandingPage';

// ----------------------------------------------------------------------

PaymentGuard.propTypes = {
    children: PropTypes.node
};

export default function PaymentGuard({ children }) {
    const { isAuthenticated, isSubscription } = useAuth();
    const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState(null);

    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <Navigate to={"/"} />;
    }

    if (isSubscription) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <Navigate to={"/dashboard"} />;
    }

    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return <>{children}</>;
}
