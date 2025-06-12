import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import MainLayout from './components/Layout/MainLayout';

const Auth = lazy(() => import('./Auth/Auth'));
const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
const Accounts = lazy(() => import('./Accounts/Accounts'));
const Transactions = lazy(() => import('./Transactions/Transactions'));
const Categories = lazy(() => import('./Categories/Categories'));
const Budgets = lazy(() => import('./Budgets/Budgets'));
const Analytics = lazy(() => import('./Analytics/Analytics'));
const Chatbot = lazy(() => import('./Chatbot/Chatbot'));
const DataSync = lazy(() => import('./DataSync/DataSync'));
const Backup = lazy(() => import('./Backup/Backup'));
const Settings = lazy(() => import('./Settings/Settings'));
const Profile = lazy(() => import('./Profile/Profile'));

function App() {
  // Simple auth check (replace with real logic)
  const isAuthenticated = !!sessionStorage.getItem('token');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<div style={{textAlign:'center',marginTop:'20vh'}}><h2>Loading...</h2></div>}>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/*"
              element={
                isAuthenticated ? (
                  <MainLayout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="accounts" element={<Accounts />} />
                      <Route path="transactions" element={<Transactions />} />
                      <Route path="categories" element={<Categories />} />
                      <Route path="budgets" element={<Budgets />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="chatbot" element={<Chatbot />} />
                      <Route path="sync" element={<DataSync />} />
                      <Route path="backup" element={<Backup />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </MainLayout>
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
