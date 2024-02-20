import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppRoutes } from './components/AppRoutes';
import LoginPage from './pages/login';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, theme } from 'antd';

const queryClient = new QueryClient();

import './config/i18next';
function App() {
  const isLogin = useSelector((state: RootState) => state.user.login) || localStorage.getItem('user') ? true : false;
  return (
    // isLogin ? <AppRoutes /> : <LoginPage />
    // <AppRoutes />
    <ConfigProvider>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          {isLogin ? <AppRoutes /> : <LoginPage />}
        </QueryClientProvider>
      </React.StrictMode>
    </ConfigProvider>
  );
}

export default App;
