import * as React from 'react';
import ScrollTop from './components/ScrollTop';
import ThemeRoutes from './routes';
import { useEffect } from 'react';

export default function App() {
    useEffect(() => {}, []);

    return (
        <>
            <ScrollTop>
                <ThemeRoutes />
            </ScrollTop>
        </>
    );
}
