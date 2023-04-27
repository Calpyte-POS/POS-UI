/* eslint-disable no-unused-vars */
import { useRoutes } from 'react-router-dom';
import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// project import

const WarehouseList = Loadable(lazy(() => import('./WarehouseList')));
const WarehouseAdd = Loadable(lazy(() => import('./WarehouseAdd')));

export default function CombustionModule() {
    return useRoutes([
        { path: '/', element: <Navigate to="list" replace={true} /> },
        { path: '*', element: <Navigate to="list" replace={true} /> },
        { path: 'list', element: <WarehouseList /> },
        { path: 'add', element: <WarehouseAdd /> }
    ]);
}
