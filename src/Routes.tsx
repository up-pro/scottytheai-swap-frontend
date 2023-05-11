import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router";
import LandingLayout from "./layouts/LadingLayout";

// -------------------------------------------------------------------------------------------

const Swap = lazy(() => import('./pages/Swap'))
const Limit = lazy(() => import('./pages/Limit'))

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
          path: '*',
          element: <Navigate to="/swap" replace />
        }
      ]
    }
  ])
}