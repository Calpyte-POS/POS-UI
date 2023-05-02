import { useRoutes } from 'react-router-dom';
import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// project import

const UserList = Loadable(lazy(() => import('./UserList')));
const UserAdd = Loadable(lazy(() => import('./UserAdd')));

export default function CombustionModule() {
    return useRoutes([
        { path: '/', element: <Navigate to="list" replace={true} /> },
        { path: '*', element: <Navigate to="list" replace={true} /> },
        { path: 'list', element: <UserList /> },
        { path: 'add', element: <UserAdd /> }
    ]);
}
