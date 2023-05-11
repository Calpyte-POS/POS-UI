// /* eslint-disable no-unused-vars */
// import { useRoutes } from 'react-router-dom';
// import Loadable from '../../components/Loadable';
// import { lazy } from 'react';
// import { Navigate } from 'react-router-dom';
// // project import

// const Products = Loadable(lazy(() => import('../Products/index')));
// const ProductsCategory = Loadable(lazy(() => import('./Products Category/index.js')));

// export default function ProductsModule() {
//     return useRoutes([
//         { path: '/', element: <Navigate to="products" replace={true} /> },
//         { path: '*', element: <Navigate to="products" replace={true} /> },
//         { path: '/products', element: <Products /> },
//         { path: '/category', element: <ProductsCategory /> }
//     ]);
// }
