import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './index.scss';
import './fonts.css';
import { MainRouter } from './app/MainRouter.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <MainRouter />
)
