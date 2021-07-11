import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD, PATH_ONLY } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, isSubscription } = useAuth();

  if (isAuthenticated && isSubscription) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  if (isAuthenticated && !isSubscription) {
    return <Navigate to={PATH_ONLY.payment} />
  }

  return <>{children}</>;
}
