import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthenticatedRoutes = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, []);

  return children;
};

export default AuthenticatedRoutes;
