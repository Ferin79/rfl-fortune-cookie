import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './Home';
import Cookie from './Cookie';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/motivation',
    element: <Cookie />,
  },
  {
    path: '*',
    element: <Navigate to='/' />,
  },
]);

export default router;
