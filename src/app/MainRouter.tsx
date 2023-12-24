import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '../shared/ui/errorBoundary';

const CallsListPageLazy = lazy(() => import('../pages/CallsListPage'));

export const MainRouter = () => (
    <BrowserRouter>
        <ErrorBoundary>
            <Suspense fallback="loading...">
                <Routes>
                    <Route path='/skilla-test/' element={<CallsListPageLazy />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    </BrowserRouter>
);