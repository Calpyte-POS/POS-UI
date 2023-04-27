/* eslint-disable no-unused-vars */
import { useRoutes } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// project import

const Sample = Loadable(lazy(() => import('../sample')));
const Measure = Loadable(lazy(() => import('./Measure')));
const Help = Loadable(lazy(() => import('./Help')));
const Report = Loadable(lazy(() => import('./Report')));

export default function CombustionModule() {
    return useRoutes([
        { path: '/', element: <Navigate to="measure" replace={true} /> },
        { path: '*', element: <Navigate to="measure" replace={true} /> },
        { path: '/measure', element: <Measure /> },
        { path: '/help', element: <Help /> },
        { path: '/report', element: <Report /> }
    ]);
}
