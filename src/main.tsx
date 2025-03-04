import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './pages/error-page';
import HomePage from './pages/home-page';
import MainLayout from './layouts/main-layout';
import DetailPage from './pages/detail-page';
import ManagePage from './pages/manage-page';
import LoginPage from './pages/login-page';
import ProtectedLayout from './layouts/protected-layout';

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        element: (
            <MainLayout>
                <Outlet />
            </MainLayout>
        ),
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/:id',
                element: <DetailPage />,
            },
        ],
    },
    {
        path: '/admin',
        errorElement: <ErrorPage />,
        element: (
            <ProtectedLayout>
                <Outlet />
            </ProtectedLayout>
        ),
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: '',
                element: <ManagePage />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
