import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function RedirectAuthenticated({ children }: { children: JSX.Element }) {
  const { userInfo } = useSelector((state: RootState) => state.Auth);

  if (userInfo) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
