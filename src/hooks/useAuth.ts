import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem('token');
    queryClient.clear();
    navigate('/signin');
  };

  return { logout };
};