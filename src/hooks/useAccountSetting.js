import { useContext } from 'react';
import { ProfileContext } from '../contexts/UserProfileContext';

const useAuth = () => useContext(ProfileContext);

export default useAuth;
