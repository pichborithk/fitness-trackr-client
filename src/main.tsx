import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import Root from './Root';
import {
  Activities,
  ErrorPage,
  Home,
  Login,
  NewActivity,
  NewRoutine,
  Pricing,
  Profile,
  Register,
  Routines,
} from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: 'activities', element: <Activities /> },
      { path: 'login', element: <Login /> },
      { path: 'new-activity', element: <NewActivity /> },
      { path: 'new-routine', element: <NewRoutine /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'profile', element: <Profile /> },
      { path: 'register', element: <Register /> },
      { path: 'routines', element: <Routines /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
