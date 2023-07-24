import { lazy } from "react";
import { Navigate, useRoutes } from "react-router";
import LandingLayout from "./layouts/LadingLayout";

// -------------------------------------------------------------------------------------------

const Swap = lazy(() => import('./pages/Swap'))
const Limit = lazy(() => import('./pages/Limit'))
const Farm = lazy(() => import('./pages/Farm'))

// -------------------------------------------------------------------------------------------

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <LandingLayout />,
      children: [
        {
          path: 'swap',
          element: <Swap />
        },
        {
          path: 'limit',
          element: <Limit />
        },
        {
          path: 'farm',
          element: <Farm />
        },
        {
          path: '',
          element: <Navigate to="/swap" replace />
        },
        {
          path: '*',
          element: <Navigate to="/swap" replace />
        }
      ]
    }
  ])
}