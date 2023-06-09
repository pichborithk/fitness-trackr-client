import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import Root from './Root';
import {
  Activities,
  AddRoutineActivity,
  EditActivity,
  EditRoutine,
  ErrorPage,
  Home,
  Login,
  NewActivity,
  NewRoutine,
  Pricing,
  Profile,
  Register,
  RelatedRoutines,
  RoutineActivities,
  Routines,
  ViewActivity,
  ViewRoutine,
} from './routes';
import EditRoutineActivity from './routes/EditRoutineActivity';

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
      {
        path: 'activities',
        children: [
          { index: true, element: <Activities /> },
          { path: 'create', element: <NewActivity /> },
          {
            path: ':activityId',
            element: <ViewActivity />,
            children: [
              { index: true, element: <RelatedRoutines /> },
              { path: 'edit', element: <EditActivity /> },
            ],
          },
        ],
      },
      { path: 'login', element: <Login /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'profile', element: <Profile /> },
      { path: 'register', element: <Register /> },
      {
        path: 'routines',
        children: [
          { index: true, element: <Routines /> },
          {
            path: ':routineId',
            element: <ViewRoutine />,
            children: [
              { index: true, element: <RoutineActivities /> },
              { path: 'edit', element: <EditRoutine /> },
              { path: 'add_activity', element: <AddRoutineActivity /> },
              {
                path: ':routineActivityId',
                element: <EditRoutineActivity />,
              },
            ],
          },
          { path: 'create', element: <NewRoutine /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
