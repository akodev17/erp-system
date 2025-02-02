import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SignUpForm } from './components/SignUpForm';
import { SignInForm } from './components/SignInForm';
import { CompanyList } from './components/CompanyList';
import { CompanyForm } from './components/CompanyForm';

const queryClient = new QueryClient();

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const data = JSON.parse(localStorage.getItem('data') || '{}');
  if (!data) return <Navigate to="/signin" />;
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route 
            path="/companies" 
            element={
              <PrivateRoute>
                <CompanyList />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/companies/add" 
            element={
              <PrivateRoute>
                <CompanyForm />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/companies/edit/:id" 
            element={
              <PrivateRoute>
                <CompanyForm />
              </PrivateRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
