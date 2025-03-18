import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../components/layouts/AuthLayout';
import { AuthPage } from '../pages/auth/authPage';
import HomeLayout from '@/components/layouts/HomeLayout';
import NoteCanvas from '@/pages/noteCanvas/noteCanvas';
import { ProtectedRoute } from '@/services/authGuard/ProtectedRoute';
import { RedirectAuthenticated } from '@/services/authGuard/RedirectAuthenticated';

const router = createBrowserRouter([ 
  {
    path: '/',
    element: (
      <RedirectAuthenticated>
        <AuthLayout />
      </RedirectAuthenticated>
    ),
    children: [{ path: '', element: <AuthPage /> }],
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    children: [{ path: '', element: <NoteCanvas /> }],
  },
]);

export default router;
