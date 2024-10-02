/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { StrapiAdmin } from './strapi/providers/StrapiAdmin';
import Login from './views/Auth/Login';
import Signup from './views/Auth/Signup';
import Dashboard from './layout/Dashboard';
import { nav } from './config/nav';
import { Toaster } from "react-hot-toast";
import StudentPreview from './views/app/StudentPreview';
import ProtectedRoute from './strapi/components/auth/ProtectedRoute';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider>
    <Toaster position="top-center" reverseOrder={false} />
    {/* https://api.bemployed.in/api */}
    <Router>
      <StrapiAdmin baseURL='https://api.bemployed.in/api' allowUser={["public"]} >
        <Routes>
          <Route element={<ProtectedRoute><Dashboard /></ProtectedRoute>} >
            {
              nav.map((config: any, index: number) => (
                <Route key={index} path={config.route} element={<config.component />} />
              ))
            }
          </Route>
          <Route path="/student/preview/:id" element={<StudentPreview />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </StrapiAdmin>
    </Router>
  </ChakraProvider>
);

reportWebVitals();
