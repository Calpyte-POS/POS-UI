import { useRoutes } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Loadable from '../components/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import PrivateRoute from 'components/PrivateRoute';

// project import

const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
const Login = Loadable(lazy(() => import('../pages/Authentication/login'))); // ../pages/Authentication/login
const ClientRegister = Loadable(lazy(() => import('../pages/Authentication/register')));
const WarehouseModule = Loadable(lazy(() => import('../pages/WarehouseModule')));
const Roles = Loadable(lazy(() => import('../pages/Roles/Permissions')));
const UserModule = Loadable(lazy(() => import('../pages/UserModule')));
const Products = Loadable(lazy(() => import('../pages/Products')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const logindata = useSelector((state) => state.logindata);

    // useEffect(() => {}, [logindata]);

    // const PrivateRoute = ({ element, isAuthenticated }) => {
    //     return isAuthenticated ? element : <Navigate to="/auth" replace />;
    // };

    return useRoutes([
        {
            path: '/login',
            element: (
                <PrivateRoute>
                    <Login />
                </PrivateRoute>
            )
        },
        {
            path: '/register',
            element: (
                <PrivateRoute>
                    <ClientRegister />
                </PrivateRoute>
            )
        },
        {
            path: '/',
            element: (
                <PrivateRoute>
                    <MainLayout />
                </PrivateRoute>
            ),
            children: [
                {
                    path: 'home',
                    element: <Dashboard />
                },
                {
                    path: 'dashborad',
                    element: <Dashboard />
                },
                {
                    path: 'warehouse/*',
                    element: <WarehouseModule />
                },
                {
                    path: 'roles/*',
                    element: <Roles />
                },
                {
                    path: 'user/*',
                    element: <UserModule />
                },
                {
                    path: 'products/*',
                    element: <Products />
                }
            ]
        },
        {
            path: '*',
            element: <Navigate to="/"></Navigate>
        }
    ]);
}
