import { useRoutes } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Loadable from '../components/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

// project import

const Warehouse = Loadable(lazy(() => import('../pages/CombustionModule/Warehouse/Warehouse')));
const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
const Login = Loadable(lazy(() => import('../pages/Authentication/login'))); // ../pages/Authentication/login
const ClientRegister = Loadable(lazy(() => import('../pages/Authentication/register')));
const WarehouseModule = Loadable(lazy(() => import('../pages/WarehouseModule')));
const Roles = Loadable(lazy(() => import('../pages/Roles/Permissions')));
const UserModule = Loadable(lazy(() => import('../pages/UserModule')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const logindata = useSelector((state) => state.logindata);

    useEffect(() => {}, [logindata]);

    const PrivateRoute = ({ element, isAuthenticated }) => {
        return isAuthenticated ? element : <Navigate to="/auth" replace />;
    };

    PrivateRoute.propTypes = {
        element: PropTypes.object,
        isAuthenticated: PropTypes.bool
    };

    return useRoutes([
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <ClientRegister />
        },
        {
            path: '/',
            element: <MainLayout />,
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
                }
            ]
        },
        {
            path: '*',
            element: <Navigate to="/"></Navigate>
        }
    ]);
}
