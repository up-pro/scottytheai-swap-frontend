import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router";
import LandingLayout from "./layouts/LadingLayout";
import ComingSoon from "./pages/ComingSoon";

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
        // {
        //   path: 'swap',
        //   element: <Swap />
        // },
        // {
        //   path: 'limit',
        //   element: <Limit />
        // },
        // {
        //   path: 'farm',
        //   element: <Farm />
        // },
        {
          path: '/',
          element: <ComingSoon />
        },
        {
          path: '*',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ])
}