/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { StrapiAdmin } from './strapi/providers/StrapiAdmin';
import Login from './views/Auth/Login';
import Signup from './views/Auth/Signup';
import Dashboard from './layout/Dashboard';
import { nav } from './config/nav';
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider>
    <Toaster position="top-center" reverseOrder={false} />

    <StrapiAdmin baseURL='http://localhost:1337/api' allowUser={["public"]} >
      <Router>
        <Routes>
          <Route element={<Dashboard />} >
            {
              nav.map((config: any, index: number) => (
                <Route key={index} path={config.route} element={<config.component />} />
              ))
            }
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </StrapiAdmin>
  </ChakraProvider>
);

reportWebVitals();
