/* eslint-disable no-unused-vars */
import { useRoutes } from 'react-router-dom';
import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// project import

const ProductsList = Loadable(lazy(() => import('./Product/ProductsList')));
const ProductsAdd = Loadable(lazy(() => import('./Product/ProductsAdd')));
const CategoryList = Loadable(lazy(() => import('./Category/CategoryList')));
const CategoryAdd = Loadable(lazy(() => import('./Category/CategoryAdd')));

export default function Products() {
    return useRoutes([
        { path: '/', element: <Navigate to="list" replace={true} /> },
        { path: '*', element: <Navigate to="list" replace={true} /> },
        { path: 'list', element: <ProductsList /> },
        { path: 'add', element: <ProductsAdd /> },
        { path: 'category/list', element: <CategoryList /> },
        { path: 'category/add', element: <CategoryAdd /> }
    ]);
}
