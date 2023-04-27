import Loadable from '../../../components/Loadable';
import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

const AddRoles = Loadable(lazy(() => import('./AddRoles')));
const ListRoles = Loadable(lazy(() => import('./ListRoles')));

export default function Roles() {
    return useRoutes([
        { path: '/', element: <Navigate to="roles-list" replace={true} /> },
        { path: '*', element: <Navigate to="roles-list" replace={true} /> },
        { path: 'roles-list', element: <ListRoles /> },
        { path: 'add', element: <AddRoles /> }
    ]);
}
